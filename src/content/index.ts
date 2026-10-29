import { aiLessons } from "./lessons/ai";
import { csLessons } from "./lessons/cs";
import { roboticsLessons } from "./lessons/robotics";
import { softwareLessons } from "./lessons/software";
import type { Lesson, Track, TrackSummary } from "./types";

export const tracks: Track[] = [
  {
    slug: "software",
    title: "Software Engineering",
    icon: "💻",
    blurb: "Web, variables, debugging",
    color: "#2f7de1",
    lessons: softwareLessons,
  },
  {
    slug: "cs",
    title: "Computer Science",
    icon: "🧠",
    blurb: "Loops, arrays, speed",
    color: "#6c5ce7",
    lessons: csLessons,
  },
  {
    slug: "ai",
    title: "AI & ML",
    icon: "🤖",
    blurb: "Models, neurons",
    color: "#d6336c",
    lessons: aiLessons,
  },
  {
    slug: "robotics",
    title: "Robotics",
    icon: "🦾",
    blurb: "Mazes, sensors, motors",
    color: "#0f9d6e",
    lessons: roboticsLessons,
  },
];

export function getTrack(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug);
}

export function getLesson(trackSlug: string, lessonSlug: string): { track: Track; lesson: Lesson } | undefined {
  const track = getTrack(trackSlug);
  const lesson = track?.lessons.find((l) => l.slug === lessonSlug);
  return track && lesson ? { track, lesson } : undefined;
}

export function getCatalog(): TrackSummary[] {
  return tracks.map((t) => ({
    ...t,
    lessons: t.lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      blurb: l.blurb,
      icon: l.icon,
      minutes: l.minutes,
      stepIds: l.steps.map((s) => s.id),
    })),
  }));
}
