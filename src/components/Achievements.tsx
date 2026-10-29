"use client";

import { doneCount, getStreak, useProgress, type Progress } from "@/lib/progress";
import type { TrackSummary } from "@/content/types";

type Badge = { id: string; icon: string; title: string; desc: string; earned: (p: Progress, c: TrackSummary[]) => boolean };

const totalDone = (p: Progress) => Object.values(p.done).reduce((n, ids) => n + ids.length, 0);
const lessonsDone = (p: Progress, c: TrackSummary[]) =>
  c.flatMap((t) => t.lessons.filter((l) => doneCount(p, t.slug, l.slug, l.stepIds) === l.stepIds.length).map(() => t.slug));

const BADGES: Badge[] = [
  { id: "first", icon: "🌱", title: "First step", desc: "Finish any step", earned: (p) => totalDone(p) >= 1 },
  { id: "run", icon: "▶️", title: "It runs!", desc: "Run your first code", earned: (p) => p.codeRuns >= 1 },
  { id: "lesson", icon: "🎓", title: "Lesson done", desc: "Complete a whole lesson", earned: (p, c) => lessonsDone(p, c).length >= 1 },
  { id: "xp100", icon: "⭐", title: "100 XP", desc: "Earn 100 XP", earned: (p) => p.xp >= 100 },
  { id: "streak3", icon: "🔥", title: "3-day streak", desc: "Learn 3 days in a row", earned: (p) => getStreak(p.activeDays) >= 3 },
  {
    id: "explorer",
    icon: "🧭",
    title: "Explorer",
    desc: "Complete a lesson in every track",
    earned: (p, c) => new Set(lessonsDone(p, c)).size >= c.length,
  },
];

export function Achievements({ catalog }: { catalog: TrackSummary[] }) {
  const progress = useProgress();
  const earnedCount = BADGES.filter((b) => b.earned(progress, catalog)).length;
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold md:text-3xl">🏆 Achievements</h1>
        <p className="text-muted">
          {earnedCount} of {BADGES.length} earned · ⭐ {progress.xp} XP
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BADGES.map((b) => {
          const on = b.earned(progress, catalog);
          return (
            <li
              key={b.id}
              className={`rounded-2xl border-2 p-5 ${on ? "border-good bg-good-bg" : "border-line bg-surface"}`}
            >
              <div className={`text-4xl ${on ? "" : "opacity-40 grayscale"}`} aria-hidden>
                {b.icon}
              </div>
              <div className="font-extrabold">{b.title}</div>
              <div className="text-sm text-muted">{b.desc}</div>
              <div className="mt-1 text-sm font-bold">{on ? "✅ Earned" : "🔒 Locked"}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
