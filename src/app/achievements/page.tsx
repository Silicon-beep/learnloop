import { Achievements } from "@/components/Achievements";
import { getCatalog } from "@/content";

export const metadata = { title: "Achievements · LearnLoop" };

export default function AchievementsPage() {
  return <Achievements catalog={getCatalog()} />;
}
