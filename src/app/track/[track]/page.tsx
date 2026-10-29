import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TrackView } from "@/components/TrackView";
import { getCatalog, tracks } from "@/content";

export function generateStaticParams() {
  return tracks.map((t) => ({ track: t.slug }));
}

type Params = Promise<{ track: string }>;

export default function TrackPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<p className="text-muted">Loading track…</p>}>
      <Track params={params} />
    </Suspense>
  );
}

async function Track({ params }: { params: Params }) {
  const { track: slug } = await params;
  const track = getCatalog().find((t) => t.slug === slug);
  if (!track) notFound();
  return <TrackView track={track} />;
}
