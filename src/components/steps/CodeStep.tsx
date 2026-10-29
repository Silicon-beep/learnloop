"use client";

import { CodePanel } from "@/components/CodePanel";
import { RichText } from "@/components/RichText";
import type { CodeStep as Code } from "@/content/types";

export function CodeStep({ step, onComplete }: { step: Code; done: boolean; onComplete: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2 text-lg">
        {step.instructions.map((t) => (
          <li key={t}>
            <RichText text={t} />
          </li>
        ))}
      </ul>
      <CodePanel
        initialCode={step.starter}
        expected={step.expected}
        onPass={onComplete}
        hint={step.hint}
        rows={Math.min(16, step.starter.split("\n").length + 2)}
      />
    </div>
  );
}
