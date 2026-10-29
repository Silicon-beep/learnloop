"use client";

import { useEffect, useMemo, useState } from "react";
import { RichText } from "@/components/RichText";
import type { SortStep as Sort } from "@/content/types";

type Frame = { arr: number[]; compare: [number, number] | null; swapped: boolean; sortedFrom: number; msg: string };

function bubbleFrames(values: number[]): Frame[] {
  const arr = [...values];
  const frames: Frame[] = [{ arr: [...arr], compare: null, swapped: false, sortedFrom: arr.length, msg: "Here's the unsorted list." }];
  for (let end = arr.length - 1; end > 0; end--) {
    for (let j = 0; j < end; j++) {
      const swap = arr[j] > arr[j + 1];
      const a = arr[j];
      const b = arr[j + 1];
      if (swap) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      frames.push({
        arr: [...arr],
        compare: [j, j + 1],
        swapped: swap,
        sortedFrom: end + 1,
        msg: swap ? `Compare ${a} and ${b}: ${a} is bigger, so swap them!` : `Compare ${a} and ${b}: already in order, no swap.`,
      });
    }
  }
  frames.push({ arr: [...arr], compare: null, swapped: false, sortedFrom: 0, msg: "Sorted! 🎉 Smallest on the left, biggest on the right." });
  return frames;
}

export function SortStep({ step, onComplete }: { step: Sort; done: boolean; onComplete: () => void }) {
  const frames = useMemo(() => bubbleFrames(step.values), [step.values]);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = frames.length - 1;
  const f = frames[i];
  const max = Math.max(...step.values);

  useEffect(() => {
    if (!playing) return;
    if (i >= last) return;
    const t = setTimeout(() => {
      setI(i + 1);
      if (i + 1 === last) {
        setPlaying(false);
        onComplete();
      }
    }, 700);
    return () => clearTimeout(t);
  }, [playing, i, last, onComplete]);

  function stepOnce() {
    if (i >= last) return;
    setI(i + 1);
    if (i + 1 === last) onComplete();
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

      <div
        role="img"
        aria-label={`Bars: ${f.arr.join(", ")}`}
        className="flex h-56 items-end justify-center gap-3 rounded-2xl bg-surface p-4 shadow"
      >
        {f.arr.map((v, idx) => {
          const comparing = f.compare?.includes(idx);
          const sorted = idx >= f.sortedFrom;
          const color = comparing ? (f.swapped ? "#ff7eb6" : "#ffd166") : sorted ? "#2ee59d" : "#7f8cff";
          return (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div className="grid w-12 place-items-start rounded-t-lg pt-1 font-extrabold text-[#1f2540] transition-all" style={{ height: `${(v / max) * 160}px`, background: color }}>
                {v}
              </div>
              <div className="text-xs text-muted" aria-hidden>
                {comparing ? (f.swapped ? "swap" : "compare") : sorted ? "done" : ""}
              </div>
            </div>
          );
        })}
      </div>

      <div aria-live="polite" className="rounded-xl bg-warn-bg p-3 font-bold">
        {f.msg}
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={stepOnce} disabled={i >= last || playing} className="rounded-xl bg-accent px-5 py-2.5 font-extrabold text-accent-ink disabled:opacity-50">
          Step ⏭
        </button>
        <button onClick={() => setPlaying((p) => !p)} disabled={i >= last} className="rounded-xl border-2 border-line px-5 py-2.5 font-bold disabled:opacity-50">
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setI(0);
          }}
          className="rounded-xl border-2 border-line px-4 py-2.5 font-bold"
        >
          ↺ Reset
        </button>
        <span className="self-center text-sm text-muted">
          Step {i} of {last}
        </span>
      </div>
    </div>
  );
}
