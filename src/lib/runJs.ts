export type RunResult = { logs: string[]; error?: string };

const WORKER_SOURCE = `
const logs = [];
const fmt = (v) => {
  if (typeof v === "string") return v;
  if (typeof v === "undefined") return "undefined";
  try { return JSON.stringify(v); } catch { return String(v); }
};
const log = (...a) => { logs.push(a.map(fmt).join(" ")); };
self.console = { log, info: log, warn: log, error: log };
self.onmessage = (e) => {
  let error;
  try { (0, eval)(e.data); } catch (err) { error = String(err); }
  self.postMessage({ logs, error });
};
`;

// Runs learner code in a Web Worker so an infinite loop can be terminated.
export function runJs(code: string, timeoutMs = 3000): Promise<RunResult> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(new Blob([WORKER_SOURCE], { type: "text/javascript" }));
    const worker = new Worker(url);
    const finish = (result: RunResult) => {
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve(result);
    };
    const timer = setTimeout(
      () =>
        finish({
          logs: [],
          error: "Your code ran for over 3 seconds. Is there a loop that never ends?",
        }),
      timeoutMs,
    );
    worker.onmessage = (e: MessageEvent<RunResult>) => finish(e.data);
    worker.onerror = (e) => finish({ logs: [], error: e.message || "Something went wrong." });
    worker.postMessage(code);
  });
}
