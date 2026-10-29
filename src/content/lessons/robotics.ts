import type { Lesson } from "../types";

export const roboticsLessons: Lesson[] = [
  {
    slug: "make-a-robot-move",
    title: "Make a robot move",
    blurb: "Snap blocks together and watch the robot follow your program.",
    icon: "🦾",
    minutes: 8,
    steps: [
      {
        id: "order",
        type: "learn",
        title: "Robots follow steps in order",
        points: [
          "**Forward** moves one square.",
          "**Turn** rotates in place, with no movement.",
          "Order matters. Different order, different path!",
        ],
        diagram: [
          { icon: "⬆️", label: "Forward", note: "1 square" },
          { icon: "↪️", label: "Turn", note: "left or right" },
          { icon: "🏁", label: "Goal", note: "reach it" },
        ],
      },
      {
        id: "straight",
        type: "robot",
        title: "Reach the flag",
        instructions: [
          "Add blocks to build a program, then press **Run**.",
          "Tip: change **×** on a block to repeat it.",
        ],
        grid: ["S...G"],
        dir: "E",
        hint: "One Forward block set to ×4 does it.",
      },
      {
        id: "turn",
        type: "robot",
        title: "Around the wall",
        instructions: [
          "Walls 🧱 block the robot. Find the way around.",
          "You can only use **3 blocks**, so use repeats!",
        ],
        grid: ["S....", ".###.", "....G"],
        dir: "E",
        maxBlocks: 3,
        hint: "Forward ×4, Turn right, Forward ×2.",
      },
      {
        id: "facing",
        type: "learn",
        title: "Which way is it facing?",
        points: [
          "A robot facing **east** that turns **right** now faces **south** (down).",
          "Turns change direction, not position.",
          "So after Forward, Forward, Turn Right, Forward, the last move goes south.",
        ],
        diagram: [
          { icon: "➡️", label: "East", note: "start" },
          { icon: "↪️", label: "Turn right", note: "rotate" },
          { icon: "⬇️", label: "South", note: "now facing" },
        ],
      },
    ],
  },
  {
    slug: "sense-and-decide",
    title: "Sense and decide",
    blurb: "Robots read sensors and choose what to do next.",
    icon: "👀",
    minutes: 8,
    steps: [
      {
        id: "loop",
        type: "learn",
        title: "Sense → Decide → Act",
        points: [
          "**Sense**: read the world (distance, light, touch).",
          "**Decide**: use `if` / `else` to pick an action.",
          "**Act**: spin motors, turn, stop.",
        ],
        diagram: [
          { icon: "👀", label: "Sense", note: "distance = 5 cm" },
          { icon: "🧠", label: "Decide", note: "too close!" },
          { icon: "🛑", label: "Act", note: "stop" },
        ],
      },
      {
        id: "decide-code",
        type: "code",
        title: "Don't crash",
        instructions: [
          "Return **\"stop\"** if the distance is **less than 10** cm.",
          'Otherwise return **"go"**.',
        ],
        starter:
          'function decide(distanceCm) {\n  // if distance is less than 10, return "stop"\n  // otherwise return "go"\n}\n\nconsole.log(decide(50));\nconsole.log(decide(5));\nconsole.log(decide(10));',
        expected: ["go", "stop", "go"],
        hint: 'if (distanceCm < 10) { return "stop"; } return "go";',
      },
      {
        id: "decide-more",
        type: "learn",
        title: "Which part decides?",
        points: [
          "Reading the sensor is **Sense**.",
          "`if distance < 10 then stop` is **Decide**.",
          "Spinning the motor is **Act**.",
        ],
      },
    ],
  },
  {
    slug: "maze-runner",
    title: "Maze runner",
    blurb: "Plan a route through walls with as few blocks as possible.",
    icon: "🧱",
    minutes: 10,
    steps: [
      {
        id: "plan",
        type: "learn",
        title: "Plan before you build",
        points: [
          "Trace the path with your finger first.",
          "Count the squares for each straight stretch. That's your **repeat** number.",
          "A turn between stretches means a new block.",
        ],
      },
      {
        id: "detour",
        type: "robot",
        title: "Detour",
        instructions: ["Get around the wall 🧱 to the flag.", "Limit: **4 blocks**."],
        grid: ["S.#..", "..#..", "....G"],
        dir: "E",
        maxBlocks: 4,
        hint: "Turn right, Forward ×2, Turn left, Forward ×4.",
      },
      {
        id: "snake",
        type: "robot",
        title: "The snake",
        instructions: ["A winding path! Follow it all the way to the flag.", "Limit: **7 blocks**."],
        grid: ["S....", "####.", ".....", ".####", "G...."],
        dir: "E",
        maxBlocks: 7,
        hint: "F×4, R, F×2, R, F×4, L, F×2.",
      },
      {
        id: "debug-robot",
        type: "learn",
        title: "Debugging a robot",
        points: [
          "Run it and **watch** where the robot goes wrong.",
          "Fix only the first mistake, then run again.",
          "Crashing into a wall is not failing. It's information!",
        ],
      },
    ],
  },
  {
    slug: "motors-and-math",
    title: "Motors and maths",
    blurb: "Speed, time and distance: the maths behind every moving robot.",
    icon: "🔧",
    minutes: 8,
    steps: [
      {
        id: "wheels",
        type: "learn",
        title: "How wheels make a robot move",
        points: [
          "A motor spins a wheel. Faster spin = faster robot.",
          "**Distance = speed × time**.",
          "Two wheels at the same speed go straight. Make one faster and the robot **curves**.",
        ],
        diagram: [
          { icon: "⚙️", label: "Motor", note: "spins" },
          { icon: "🛞", label: "Wheel", note: "rolls" },
          { icon: "📏", label: "Distance", note: "speed × time" },
        ],
      },
      {
        id: "distance",
        type: "code",
        title: "How far did it go?",
        instructions: ["Return the distance travelled.", "Speed is in cm per second."],
        starter:
          "function distance(speed, seconds) {\n  // return speed times seconds\n}\n\nconsole.log(distance(2, 5));\nconsole.log(distance(0.5, 10));",
        expected: ["10", "5"],
        hint: "return speed * seconds;",
      },
      {
        id: "time",
        type: "code",
        title: "How long will it take?",
        instructions: ["Flip the formula: **time = distance ÷ speed**."],
        starter:
          "function travelTime(distanceCm, speed) {\n  // return how many seconds the trip takes\n}\n\nconsole.log(travelTime(100, 4));\nconsole.log(travelTime(30, 5));",
        expected: ["25", "6"],
        hint: "return distanceCm / speed;",
      },
    ],
  },
  {
    slug: "line-follower",
    title: "Line follower",
    blurb: "Program the classic robot that follows a track using two sensors.",
    icon: "🛣️",
    minutes: 10,
    steps: [
      {
        id: "two-eyes",
        type: "learn",
        title: "Two eyes on the floor",
        points: [
          "A line follower has a **left** and a **right** light sensor pointing down.",
          "A sensor is `true` when it sees the dark line.",
          "If only the left eye sees the line, the robot drifted right, so **steer left** to get back.",
        ],
        diagram: [
          { icon: "👁️", label: "Left sensor", note: "sees line?" },
          { icon: "🧠", label: "Decide", note: "steer" },
          { icon: "👁️", label: "Right sensor", note: "sees line?" },
        ],
      },
      {
        id: "steer",
        type: "code",
        title: "Write the steering",
        instructions: [
          'Only left sees the line: **"left"**. Only right: **"right"**.',
          'Both see it: **"forward"**. Neither: **"search"**.',
        ],
        starter:
          'function steer(left, right) {\n  // return "left", "right", "forward" or "search"\n}\n\nconsole.log(steer(true, false));\nconsole.log(steer(false, true));\nconsole.log(steer(true, true));\nconsole.log(steer(false, false));',
        expected: ["left", "right", "forward", "search"],
        hint: 'if (left && right) return "forward"; if (left) return "left"; if (right) return "right"; return "search";',
      },
      {
        id: "loop-forever",
        type: "learn",
        title: "Then do it again, fast",
        points: [
          "Real robots run this **sense → decide → act** loop dozens of times per second.",
          "Each tiny correction keeps the robot on the line.",
          "Same loop idea as the loops you wrote in the CS track.",
        ],
      },
    ],
  },
];
