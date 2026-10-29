"use client";

import { RichText } from "@/components/RichText";
import type { LearnStep as Learn } from "@/content/types";

export function LearnStep({ step, done, onComplete }: { step: Learn; done: boolean; onComplete: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <ul className="flex flex-col gap-3 text-lg">
        {step.points.map((p) => (
          <li key={p} className="rounded-2xl bg-surface p-4 shadow-sm">
            <RichText text={p} />
          </li>
        ))}
      </ul>

      {step.diagram && (
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-surface p-5 shadow-sm">
          {step.diagram.map((n, i) => (
            <div key={n.label} className="flex items-center gap-2">
              <div className="min-w-28 rounded-2xl border-2 border-line px-4 py-3 text-center">
                <div className="text-4xl" aria-hidden>
                  {n.icon}
                </div>
                <div className="font-extrabold">{n.label}</div>
                {n.note && <div className="text-sm text-muted">{n.note}</div>}
              </div>
              {i < step.diagram!.length - 1 && (
                <span className="text-2xl text-accent" aria-hidden>
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {step.tip && <div className="rounded-xl bg-warn-bg p-3">💡 {step.tip}</div>}

      {!done && (
        <button
          onClick={onComplete}
          className="self-start rounded-xl bg-accent px-6 py-3 font-extrabold text-accent-ink hover:brightness-110"
        >
          Got it ✓
        </button>
      )}
    </div>
  );
}
