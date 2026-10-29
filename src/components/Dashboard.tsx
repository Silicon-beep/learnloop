"use client";

import Link from "next/link";
import { CodePanel } from "@/components/CodePanel";
import { ProgressBar } from "@/components/ProgressBar";
import type { TrackSummary } from "@/content/types";
import { doneCount, getStreak, useProgress } from "@/lib/progress";

export function Dashboard({ catalog }: { catalog: TrackSummary[] }) {
  const progress = useProgress();
  const streak = getStreak(progress.activeDays);

  // Resume the last lesson if it's unfinished, otherwise the first unfinished lesson.
  const all = catalog.flatMap((t) => t.lessons.map((l) => ({ t, l })));
  const isUnfinished = ({ t, l }: (typeof all)[number]) =>
    doneCount(progress, t.slug, l.slug, l.stepIds) < l.stepIds.length;
  const lastEntry = progress.last
    ? all.find(({ t, l }) => t.slug === progress.last!.track && l.slug === progress.last!.lesson)
    : undefined;
  const next = (lastEntry && isUnfinished(lastEntry) ? lastEntry : all.find(isUnfinished)) ?? all[0];
  const nextDone = doneCount(progress, next.t.slug, next.l.slug, next.l.stepIds);
  const started = nextDone > 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold md:text-3xl">Ready for a 10-minute win? 👋</h1>
          <p className="text-muted">One small step at a time. You&apos;ve got this.</p>
        </div>
        <div className="flex gap-2 font-bold">
          <span className="rounded-full bg-surface px-4 py-2 shadow">🔥 {streak}-day streak</span>
          <span className="rounded-full bg-surface px-4 py-2 shadow">⭐ {progress.xp} XP</span>
        </div>
      </div>

      <section
        aria-label="Continue learning"
        className="flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-gradient-to-r from-[#5b4bdb] to-[#2f7de1] p-6 text-white"
      >
        <div>
          <h2 className="text-xl font-extrabold">
            {started ? "Continue" : "Start"}: {next.l.title}{" "}
            <span className="font-normal opacity-90">({next.t.title})</span>
          </h2>
          <p className="mb-4 opacity-95">
            ⏱ {next.l.minutes} min · hands-on · see it, then do it
          </p>
          <Link
            href={`/lesson/${next.t.slug}/${next.l.slug}`}
            className="inline-block rounded-xl bg-white px-5 py-3 font-extrabold text-[#3d32b8] hover:brightness-95"
          >
            ▶ {started ? "Start next step" : "Start lesson"}
          </Link>
        </div>
        <ol className="flex items-center gap-2" aria-label="Lesson steps">
          {next.l.stepIds.map((id, i) => {
            const done = (progress.done[`${next.t.slug}/${next.l.slug}`] ?? []).includes(id);
            const current = !done && i === nextDone;
            return (
              <li
                key={id}
                aria-label={`Step ${i + 1}${done ? " done" : current ? " current" : ""}`}
                className={`grid h-9 w-9 place-items-center rounded-full font-extrabold ${
                  done ? "bg-[#2ee59d] text-[#073]" : current ? "bg-white text-[#3d32b8]" : "bg-white/25"
                }`}
              >
                {done ? "✓" : i + 1}
              </li>
            );
          })}
        </ol>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-extrabold">Pick a path</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {catalog.map((t) => {
            const total = t.lessons.reduce((n, l) => n + l.stepIds.length, 0);
            const done = t.lessons.reduce((n, l) => n + doneCount(progress, t.slug, l.slug, l.stepIds), 0);
            return (
              <Link
                key={t.slug}
                href={`/track/${t.slug}`}
                style={{ borderTopColor: t.color }}
                className="rounded-2xl border-t-[6px] bg-surface p-4 shadow transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="text-3xl" aria-hidden>
                  {t.icon}
                </div>
                <div className="mt-2 font-extrabold">{t.title}</div>
                <div className="text-sm text-muted">{t.blurb}</div>
                <div className="mt-3">
                  <ProgressBar value={total ? done / total : 0} color={t.color} label={`${t.title} progress`} />
                </div>
                <div className="mt-1 text-xs text-muted">
                  {done}/{total} steps
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 flex flex-wrap items-center gap-2 text-lg font-extrabold">
          Try it right now
          {["See it", "Do it", "Instant feedback"].map((t) => (
            <span key={t} className="rounded-lg bg-warn-bg px-2.5 py-0.5 text-xs font-bold">
              {t}
            </span>
          ))}
        </h2>
        <CodePanel
          initialCode={'for (let i = 1; i <= 4; i++) {\n  console.log("🤖".repeat(i));\n}'}
          rows={5}
        />
      </section>
    </div>
  );
}
