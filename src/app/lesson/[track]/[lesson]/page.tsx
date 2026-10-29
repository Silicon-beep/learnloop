import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LessonPlayer } from "@/components/LessonPlayer";
import { getLesson, tracks } from "@/content";

export function generateStaticParams() {
  return tracks.flatMap((t) => t.lessons.map((l) => ({ track: t.slug, lesson: l.slug })));
}

type Params = Promise<{ track: string; lesson: string }>;

export default function LessonPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<p className="text-muted">Loading lesson…</p>}>
      <Lesson params={params} />
    </Suspense>
  );
}

async function Lesson({ params }: { params: Params }) {
  const { track: trackSlug, lesson: lessonSlug } = await params;
  const found = getLesson(trackSlug, lessonSlug);
  if (!found) notFound();
  const { track, lesson } = found;
  const i = track.lessons.findIndex((l) => l.slug === lesson.slug);
  const next = track.lessons[i + 1];
  return (
    <LessonPlayer
      track={{ slug: track.slug, title: track.title, color: track.color }}
      lesson={lesson}
      nextLesson={next ? { slug: next.slug, title: next.title } : undefined}
    />
  );
}
