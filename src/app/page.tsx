import { Dashboard } from "@/components/Dashboard";
import { getCatalog } from "@/content";

export default function Home() {
  return <Dashboard catalog={getCatalog()} />;
}
