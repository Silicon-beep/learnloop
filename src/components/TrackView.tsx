"use client";

import Link from "next/link";
import { ProgressBar } from "@/components/ProgressBar";
import type { TrackSummary } from "@/content/types";
import { doneCount, useProgress } from "@/lib/progress";

export function TrackView({ track }: { track: TrackSummary }) {
  const progress = useProgress();
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl bg-surface p-6 shadow" style={{ borderLeft: `8px solid ${track.color}` }}>
        <div className="text-4xl" aria-hidden>
          {track.icon}
        </div>
        <h1 className="text-2xl font-extrabold md:text-3xl">{track.title}</h1>
        <p className="text-muted">{track.blurb}</p>
      </div>

      <ol className="flex flex-col gap-4">
        {track.lessons.map((l, i) => {
          const done = doneCount(progress, track.slug, l.slug, l.stepIds);
          const complete = done === l.stepIds.length;
          return (
            <li key={l.slug}>
              <Link
                href={`/lesson/${track.slug}/${l.slug}`}
                className="flex flex-wrap items-center gap-4 rounded-2xl bg-surface p-5 shadow transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="text-4xl" aria-hidden>
                  {l.icon}
                </div>
                <div className="min-w-48 flex-1">
                  <div className="text-sm text-muted">
                    Lesson {i + 1} · ⏱ {l.minutes} min · {l.stepIds.length} steps
                  </div>
                  <div className="text-lg font-extrabold">{l.title}</div>
                  <div className="text-muted">{l.blurb}</div>
                  <div className="mt-2 max-w-sm">
                    <ProgressBar value={done / l.stepIds.length} color={track.color} label={`${l.title} progress`} />
                  </div>
                </div>
                <span className="rounded-xl bg-accent px-4 py-2 font-extrabold text-accent-ink">
                  {complete ? "Review" : done > 0 ? "Continue" : "Start"} →
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
