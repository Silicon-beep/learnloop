"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { CodeStep } from "@/components/steps/CodeStep";
import { LearnStep } from "@/components/steps/LearnStep";
import { RobotStep } from "@/components/steps/RobotStep";
import { SortStep } from "@/components/steps/SortStep";
import { STEP_LABEL, STEP_XP, type Lesson, type Step, type Track } from "@/content/types";
import { completeStep, lessonKey, useProgress } from "@/lib/progress";

export function LessonPlayer({
  track,
  lesson,
  nextLesson,
}: {
  track: Pick<Track, "slug" | "title" | "color">;
  lesson: Lesson;
  nextLesson?: { slug: string; title: string };
}) {
  const progress = useProgress();
  const doneIds = progress.done[lessonKey(track.slug, lesson.slug)] ?? [];
  const total = lesson.steps.length;
  const firstUndone = lesson.steps.findIndex((s) => !doneIds.includes(s.id));
  // Until the learner navigates manually, resume at the first unfinished step.
  const [override, setOverride] = useState<number | null>(null);
  const idx = override ?? (firstUndone === -1 ? total : firstUndone);
  const finished = idx >= total;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href={`/track/${track.slug}`} className="text-sm font-bold text-accent underline">
          ← {track.title}
        </Link>
        <h1 className="mt-1 text-2xl font-extrabold md:text-3xl">
          <span aria-hidden>{lesson.icon}</span> {lesson.title}
        </h1>
      </div>

      <nav aria-label="Lesson steps" className="flex flex-wrap items-center gap-2">
        {lesson.steps.map((s, i) => {
          const done = doneIds.includes(s.id);
          const current = i === idx;
          return (
            <button
              key={s.id}
              onClick={() => setOverride(i)}
              aria-label={`Step ${i + 1}: ${s.title}${done ? " (done)" : ""}`}
              aria-current={current ? "step" : undefined}
              className={`grid h-10 w-10 place-items-center rounded-full font-extrabold ring-offset-2 ${
                done ? "bg-[#2ee59d] text-[#073]" : "bg-surface text-ink border-2 border-line"
              } ${current ? "ring-4 ring-accent" : ""}`}
            >
              {done ? "✓" : i + 1}
            </button>
          );
        })}
        <span className="ml-2 text-sm text-muted">
          {Math.min(doneIds.length, total)}/{total} done
        </span>
      </nav>

      {finished ? (
        <Finished lesson={lesson} track={track} nextLesson={nextLesson} onReview={() => setOverride(0)} />
      ) : (
        <StepView
          key={lesson.steps[idx].id}
          step={lesson.steps[idx]}
          trackSlug={track.slug}
          lessonSlug={lesson.slug}
          done={doneIds.includes(lesson.steps[idx].id)}
          hasNext={idx < total}
          onNext={() => setOverride(idx + 1)}
          onPrev={idx > 0 ? () => setOverride(idx - 1) : undefined}
        />
      )}
    </div>
  );
}

function StepView({
  step,
  trackSlug,
  lessonSlug,
  done,
  hasNext,
  onNext,
  onPrev,
}: {
  step: Step;
  trackSlug: string;
  lessonSlug: string;
  done: boolean;
  hasNext: boolean;
  onNext: () => void;
  onPrev?: () => void;
}) {
  const [justEarned, setJustEarned] = useState(false);
  const xp = STEP_XP[step.type];
  const onComplete = useCallback(() => {
    completeStep(trackSlug, lessonSlug, step.id, xp);
    setJustEarned(true);
  }, [trackSlug, lessonSlug, step.id, xp]);

  return (
    <section aria-labelledby="step-title" className="flex flex-col gap-5 rounded-3xl bg-bg">
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-accent px-3 py-1 text-sm font-extrabold text-accent-ink">
          {STEP_LABEL[step.type]}
        </span>
        <h2 id="step-title" className="text-xl font-extrabold">
          {step.title}
        </h2>
      </div>

      {step.type === "learn" && <LearnStep step={step} done={done} onComplete={onComplete} />}
      {step.type === "code" && <CodeStep step={step} done={done} onComplete={onComplete} />}
      {step.type === "robot" && <RobotStep step={step} done={done} onComplete={onComplete} />}
      {step.type === "sort" && <SortStep step={step} done={done} onComplete={onComplete} />}

      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
        {onPrev && (
          <button onClick={onPrev} className="rounded-xl border-2 border-line px-4 py-2.5 font-bold">
            ← Back
          </button>
        )}
        {justEarned && <span className="pop font-extrabold text-good">+{xp} XP ⭐</span>}
        {done && hasNext && (
          <button
            onClick={onNext}
            className="ml-auto rounded-xl bg-accent px-6 py-3 font-extrabold text-accent-ink hover:brightness-110"
          >
            Next →
          </button>
        )}
      </div>
    </section>
  );
}

function Finished({
  lesson,
  track,
  nextLesson,
  onReview,
}: {
  lesson: Lesson;
  track: Pick<Track, "slug" | "title">;
  nextLesson?: { slug: string; title: string };
  onReview: () => void;
}) {
  return (
    <div className="pop flex flex-col items-center gap-4 rounded-3xl bg-surface p-8 text-center shadow">
      <div className="text-6xl" aria-hidden>
        🎉
      </div>
      <h2 className="text-2xl font-extrabold">Lesson complete!</h2>
      <p className="text-muted">You finished &ldquo;{lesson.title}&rdquo;. Take a stretch, then keep the streak going.</p>
      <div className="flex flex-wrap justify-center gap-3">
        {nextLesson && (
          <Link
            href={`/lesson/${track.slug}/${nextLesson.slug}`}
            className="rounded-xl bg-accent px-6 py-3 font-extrabold text-accent-ink"
          >
            Next: {nextLesson.title} →
          </Link>
        )}
        <Link href={`/track/${track.slug}`} className="rounded-xl border-2 border-line px-5 py-3 font-bold">
          Back to {track.title}
        </Link>
        <button onClick={onReview} className="rounded-xl border-2 border-line px-5 py-3 font-bold">
          Review steps
        </button>
      </div>
    </div>
  );
}
