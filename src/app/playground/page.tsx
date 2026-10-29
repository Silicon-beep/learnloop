import { CodePanel } from "@/components/CodePanel";

export const metadata = { title: "Playground · LearnLoop" };

const STARTER = `// Playground: write any JavaScript and press Run.
const robot = { name: "Beep", battery: 100 };

for (let step = 1; step <= 3; step++) {
  robot.battery -= 10;
  console.log(robot.name + " moved " + step + " step(s), battery " + robot.battery + "%");
}`;

export default function PlaygroundPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-extrabold md:text-3xl">🧪 Playground</h1>
        <p className="text-muted">No goals, no grades. Break things and see what happens.</p>
      </div>
      <CodePanel initialCode={STARTER} rows={14} />
    </div>
  );
}
