export type DiagramNode = { icon: string; label: string; note?: string };

export type LearnStep = {
  id: string;
  type: "learn";
  title: string;
  points: string[];
  diagram?: DiagramNode[];
  tip?: string;
};

export type CodeStep = {
  id: string;
  type: "code";
  title: string;
  instructions: string[];
  starter: string;
  expected: string[];
  hint: string;
};

export type Direction = "N" | "E" | "S" | "W";

export type RobotStep = {
  id: string;
  type: "robot";
  title: string;
  instructions: string[];
  // '.' floor, '#' wall, 'S' start, 'G' goal
  grid: string[];
  dir: Direction;
  maxBlocks?: number;
  hint: string;
};

export type SortStep = {
  id: string;
  type: "sort";
  title: string;
  instructions: string[];
  values: number[];
};

export type Step = LearnStep | CodeStep | RobotStep | SortStep;

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
  icon: string;
  minutes: number;
  steps: Step[];
};

export type Track = {
  slug: string;
  title: string;
  icon: string;
  blurb: string;
  color: string;
  lessons: Lesson[];
};

export const STEP_XP: Record<Step["type"], number> = {
  learn: 5,
  code: 20,
  robot: 20,
  sort: 15,
};

export const STEP_LABEL: Record<Step["type"], string> = {
  learn: "See it",
  code: "Code it",
  robot: "Build it",
  sort: "Watch it",
};

// Lightweight summaries so client pages don't need the full lesson content.
export type LessonSummary = Pick<Lesson, "slug" | "title" | "blurb" | "icon" | "minutes"> & {
  stepIds: string[];
};
export type TrackSummary = Omit<Track, "lessons"> & { lessons: LessonSummary[] };
