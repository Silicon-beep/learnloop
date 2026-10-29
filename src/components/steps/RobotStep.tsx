"use client";

import { useEffect, useMemo, useState } from "react";
import { RichText } from "@/components/RichText";
import type { Direction, RobotStep as Robot } from "@/content/types";

type Cmd = "F" | "L" | "R";
type Block = { id: number; cmd: Cmd; n: number };
type Frame = { x: number; y: number; dir: Direction; crashed: boolean };

const ORDER: Direction[] = ["N", "E", "S", "W"];
const DELTA: Record<Direction, [number, number]> = { N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0] };
const ARROW: Record<Direction, string> = { N: "▲", E: "▶", S: "▼", W: "◀" };
const LABEL: Record<Cmd, string> = { F: "⬆️ Forward", L: "↩️ Turn left", R: "↪️ Turn right" };

function simulate(grid: string[], start: Frame, program: Block[]): Frame[] {
  const frames: Frame[] = [start];
  let cur = start;
  for (const b of program) {
    for (let i = 0; i < b.n; i++) {
      if (b.cmd === "F") {
        const [dx, dy] = DELTA[cur.dir];
        const nx = cur.x + dx;
        const ny = cur.y + dy;
        const cell = grid[ny]?.[nx];
        if (!cell || cell === "#") {
          cur = { ...cur, crashed: true };
          frames.push(cur);
          return frames;
        }
        cur = { ...cur, x: nx, y: ny };
      } else {
        const idx = ORDER.indexOf(cur.dir) + (b.cmd === "R" ? 1 : 3);
        cur = { ...cur, dir: ORDER[idx % 4] };
      }
      frames.push(cur);
    }
  }
  return frames;
}

export function RobotStep({ step, onComplete }: { step: Robot; done: boolean; onComplete: () => void }) {
  const { start, goal } = useMemo(() => {
    let s = { x: 0, y: 0 };
    let g = { x: 0, y: 0 };
    step.grid.forEach((row, y) =>
      [...row].forEach((c, x) => {
        if (c === "S") s = { x, y };
        if (c === "G") g = { x, y };
      }),
    );
    return { start: { ...s, dir: step.dir, crashed: false } as Frame, goal: g };
  }, [step]);

  const [program, setProgram] = useState<Block[]>([]);
  const [nextId, setNextId] = useState(1);
  const [frames, setFrames] = useState<Frame[]>([start]);
  const [frameIdx, setFrameIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const frame = frames[frameIdx];
  const atGoal = frame.x === goal.x && frame.y === goal.y;
  const full = step.maxBlocks !== undefined && program.length >= step.maxBlocks;

  useEffect(() => {
    if (!playing) return;
    if (frameIdx >= frames.length - 1) return;
    const t = setTimeout(() => {
      const next = frameIdx + 1;
      setFrameIdx(next);
      if (next === frames.length - 1) {
        setPlaying(false);
        const last = frames[next];
        if (last.crashed) setMessage("💥 Bumped into a wall! Change your program and try again.");
        else if (last.x === goal.x && last.y === goal.y) {
          setMessage("🎉 You reached the flag!");
          onComplete();
        } else setMessage("The robot stopped before the flag. Add more blocks or change them.");
      }
    }, 350);
    return () => clearTimeout(t);
  }, [playing, frameIdx, frames, goal, onComplete]);

  function add(cmd: Cmd) {
    if (full || playing) return;
    setProgram((p) => [...p, { id: nextId, cmd, n: 1 }]);
    setNextId((n) => n + 1);
  }

  function run() {
    if (playing || program.length === 0) return;
    const f = simulate(step.grid, start, program);
    setFrames(f);
    setFrameIdx(0);
    setMessage(null);
    setPlaying(true);
    if (f.length === 1) {
      setPlaying(false);
      setMessage("Add a block first!");
    }
  }

  function reset() {
    setPlaying(false);
    setFrames([start]);
    setFrameIdx(0);
    setMessage(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2 text-lg">
        {step.instructions.map((t) => (
          <li key={t}>
            <RichText text={t} />
          </li>
        ))}
      </ul>

      <div className="grid gap-5 md:grid-cols-[auto_1fr]">
        <div
          role="img"
          aria-label={`Robot grid. Robot at column ${frame.x + 1}, row ${frame.y + 1}, facing ${frame.dir}. Flag at column ${goal.x + 1}, row ${goal.y + 1}.`}
          className="grid w-fit gap-1.5 rounded-2xl bg-surface p-3 shadow"
          style={{ gridTemplateColumns: `repeat(${step.grid[0].length}, 3.5rem)` }}
        >
          {step.grid.flatMap((row, y) =>
            [...row].map((c, x) => {
              const isRobot = frame.x === x && frame.y === y;
              return (
                <div
                  key={`${x}-${y}`}
                  className={`relative grid h-14 w-14 place-items-center rounded-xl text-2xl ${
                    c === "#" ? "bg-[#c9b8a6]" : "bg-bg border border-line"
                  }`}
                >
                  {c === "#" && <span aria-hidden>🧱</span>}
                  {c === "G" && !isRobot && <span aria-hidden>🏁</span>}
                  {isRobot && (
                    <span aria-hidden className="pop">
                      {frame.crashed ? "💥" : "🤖"}
                      <span className="absolute right-1 bottom-0 text-xs text-accent">{ARROW[frame.dir]}</span>
                    </span>
                  )}
                </div>
              );
            }),
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <div className="mb-1 font-bold">Blocks</div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(LABEL) as Cmd[]).map((c) => (
                <button
                  key={c}
                  onClick={() => add(c)}
                  disabled={full || playing}
                  className="rounded-xl border-2 border-line bg-surface px-3 py-2 font-bold hover:border-accent disabled:opacity-50"
                >
                  + {LABEL[c]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1 font-bold">
              Your program
              {step.maxBlocks !== undefined && (
                <span className="ml-2 text-sm font-normal text-muted">
                  ({program.length}/{step.maxBlocks} blocks)
                </span>
              )}
            </div>
            <ol className="flex min-h-14 flex-col gap-2 rounded-2xl border-2 border-dashed border-line p-3">
              {program.length === 0 && <li className="text-muted">Click blocks above to add them here.</li>}
              {program.map((b, i) => (
                <li key={b.id} className="flex flex-wrap items-center gap-2 rounded-xl bg-accent/10 px-3 py-2">
                  <span className="w-6 text-sm text-muted">{i + 1}.</span>
                  <span className="font-bold">{LABEL[b.cmd]}</span>
                  <label className="flex items-center gap-1 text-sm">
                    ×
                    <input
                      type="number"
                      min={1}
                      max={9}
                      value={b.n}
                      disabled={playing}
                      aria-label={`Repeat block ${i + 1}`}
                      onChange={(e) => {
                        const n = Math.min(9, Math.max(1, Number(e.target.value) || 1));
                        setProgram((p) => p.map((x) => (x.id === b.id ? { ...x, n } : x)));
                      }}
                      className="w-14 rounded-lg border border-line bg-surface px-2 py-1"
                    />
                  </label>
                  <button
                    onClick={() => setProgram((p) => p.filter((x) => x.id !== b.id))}
                    disabled={playing}
                    aria-label={`Remove block ${i + 1}`}
                    className="ml-auto rounded-lg px-2 py-1 text-bad hover:bg-bad-bg"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={run}
              disabled={playing || program.length === 0}
              className="rounded-xl bg-accent px-5 py-2.5 font-extrabold text-accent-ink disabled:opacity-50"
            >
              ▶ Run
            </button>
            <button onClick={reset} className="rounded-xl border-2 border-line px-4 py-2.5 font-bold">
              ↺ Reset robot
            </button>
          </div>

          <div aria-live="polite" className="flex flex-col gap-2">
            {message && (
              <div
                className={`pop rounded-xl p-3 font-bold ${
                  atGoal && !frame.crashed ? "bg-good-bg text-good" : "bg-warn-bg"
                }`}
              >
                {message}
              </div>
            )}
            {showHint ? (
              <div className="rounded-xl bg-warn-bg p-3 text-sm">💡 {step.hint}</div>
            ) : (
              <button onClick={() => setShowHint(true)} className="self-start text-sm font-bold text-accent underline">
                Stuck? Show a hint
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
