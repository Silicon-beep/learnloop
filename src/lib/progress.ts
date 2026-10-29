"use client";

import { createPersistentStore } from "./store";

export type Progress = {
  // "track/lesson" -> completed step ids
  done: Record<string, string[]>;
  xp: number;
  activeDays: string[];
  codeRuns: number;
  last: { track: string; lesson: string } | null;
};

export const PROGRESS_KEY = "learnloop-progress";

const defaults: Progress = { done: {}, xp: 0, activeDays: [], codeRuns: 0, last: null };

const store = createPersistentStore<Progress>(PROGRESS_KEY, defaults);

export const useProgress = store.useStore;

export const lessonKey = (track: string, lesson: string) => `${track}/${lesson}`;

export function dayString(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function completeStep(track: string, lesson: string, stepId: string, xp: number) {
  store.update((s) => {
    const key = lessonKey(track, lesson);
    const already = s.done[key]?.includes(stepId);
    const today = dayString();
    return {
      ...s,
      done: already ? s.done : { ...s.done, [key]: [...(s.done[key] ?? []), stepId] },
      // XP is only awarded once per step so replaying can't farm points.
      xp: already ? s.xp : s.xp + xp,
      activeDays: s.activeDays.includes(today) ? s.activeDays : [...s.activeDays, today],
      last: { track, lesson },
    };
  });
}

export function recordCodeRun() {
  store.update((s) => ({ ...s, codeRuns: s.codeRuns + 1 }));
}

export function resetProgress() {
  store.update(() => defaults);
}

export function getStreak(activeDays: string[], today?: Date): number {
  // No activity means no streak; this also keeps prerendering free of the current time.
  if (activeDays.length === 0) return 0;
  const set = new Set(activeDays);
  const cursor = new Date(today ?? Date.now());
  // A streak stays alive until a full day is missed, so start from yesterday if today is empty.
  if (!set.has(dayString(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (set.has(dayString(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function doneCount(p: Progress, track: string, lesson: string, stepIds: string[]) {
  const done = p.done[lessonKey(track, lesson)] ?? [];
  return stepIds.filter((id) => done.includes(id)).length;
}
