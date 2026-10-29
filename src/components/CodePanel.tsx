"use client";

import { useState } from "react";
import { recordCodeRun } from "@/lib/progress";
import { runJs, type RunResult } from "@/lib/runJs";

type Props = {
  initialCode: string;
  expected?: string[];
  onPass?: () => void;
  rows?: number;
  hint?: string;
};

export function CodePanel({ initialCode, expected, onPass, rows = 9, hint }: Props) {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const passed =
    !!expected &&
    !!result &&
    !result.error &&
    result.logs.length === expected.length &&
    result.logs.every((l, i) => l.trim() === expected[i]);

  async function run() {
    if (running) return;
    setRunning(true);
    const r = await runJs(code);
    setResult(r);
    setRunning(false);
    recordCodeRun();
    if (
      expected &&
      !r.error &&
      r.logs.length === expected.length &&
      r.logs.every((l, i) => l.trim() === expected[i])
    ) {
      onPass?.();
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
      <div className="overflow-hidden rounded-2xl bg-code text-code-ink shadow">
        <div className="flex items-center justify-between px-4 py-2 text-sm text-[#9aa3d6]">
          <span>Edit me, then press Run</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setCode(initialCode);
                setResult(null);
              }}
              className="rounded-lg px-3 py-1 hover:bg-white/10"
            >
              Reset
            </button>
            <button
              onClick={run}
              disabled={running}
              className="rounded-lg bg-[#2ee59d] px-4 py-1 font-extrabold text-[#073] hover:brightness-95 disabled:opacity-60"
            >
              ▶ Run
            </button>
          </div>
        </div>
        <textarea
          aria-label="Code editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              run();
            }
          }}
          spellCheck={false}
          rows={rows}
          className="code-font block w-full resize-y bg-transparent px-4 pb-4 text-sm leading-7 text-code-ink outline-none"
        />
        <div className="px-4 pb-2 text-xs text-[#9aa3d6]">Tip: Ctrl/⌘ + Enter also runs it</div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4" aria-live="polite">
        <div className="font-bold">Live result</div>
        {expected && (
          <div className="text-sm text-muted">
            <div className="mb-1 font-bold text-ink">Goal output</div>
            <pre className="code-font whitespace-pre-wrap rounded-lg bg-bg p-2">{expected.join("\n")}</pre>
          </div>
        )}
        <div className="text-sm">
          <div className="mb-1 font-bold">Your output</div>
          {!result && <div className="text-muted">Nothing yet. Press Run!</div>}
          {result && (
            <pre className="code-font whitespace-pre-wrap rounded-lg bg-bg p-2">
              {result.logs.join("\n") || "(no output)"}
            </pre>
          )}
        </div>
        {result?.error && (
          <div className="rounded-xl bg-bad-bg p-3 text-sm text-bad" role="alert">
            🐛 {result.error}
            <div className="mt-1 text-ink">Bugs happen to everyone. Read the message, tweak, and run again.</div>
          </div>
        )}
        {result && !result.error && expected && !passed && (
          <div className="rounded-xl bg-warn-bg p-3 text-sm">
            Almost! Your output doesn&apos;t match the goal yet. Compare them side by side.
          </div>
        )}
        {passed && (
          <div className="pop rounded-xl bg-good-bg p-3 text-sm font-bold text-good">
            ✅ Nailed it! Output matches.
          </div>
        )}
        {hint && !passed && (
          <div>
            {showHint ? (
              <div className="rounded-xl bg-warn-bg p-3 text-sm">💡 {hint}</div>
            ) : (
              <button onClick={() => setShowHint(true)} className="text-sm font-bold text-accent underline">
                Stuck? Show a hint
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
