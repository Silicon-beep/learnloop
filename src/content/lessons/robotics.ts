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
    slug: "robot-challenges",
    title: "Robot challenges",
    blurb: "Three puzzles that reward spotting patterns and repeating blocks.",
    icon: "🏆",
    minutes: 10,
    steps: [
      {
        id: "patterns",
        type: "learn",
        title: "Spot the pattern",
        points: [
          "Long straight stretches are **one block** with a big repeat number.",
          "Every turn splits the path into a new stretch.",
          "Count stretches and turns first, then build.",
        ],
        diagram: [
          { icon: "🔍", label: "Spot", note: "stretches" },
          { icon: "🔢", label: "Count", note: "squares" },
          { icon: "🧱", label: "Build", note: "blocks" },
        ],
      },
      {
        id: "hallway",
        type: "robot",
        title: "The long hallway",
        instructions: ["The flag is far away, but you only get **1 block**.", "Which setting makes one block go far?"],
        grid: ["S.....G"],
        dir: "E",
        maxBlocks: 1,
        hint: "One Forward block with × set to 6.",
      },
      {
        id: "u-turn",
        type: "robot",
        title: "U-turn",
        instructions: ["Go along, turn around the wall, and come back.", "Limit: **5 blocks**."],
        grid: ["S....", "####.", "G...."],
        dir: "E",
        maxBlocks: 5,
        hint: "F×4, Turn right, F×2, Turn right, F×4.",
      },
      {
        id: "zigzag",
        type: "robot",
        title: "Zigzag",
        instructions: ["Right, down, right, down. Only the zigzag path is open.", "Limit: **7 blocks**."],
        grid: ["S..##", "##.##", "##...", "####.", "####G"],
        dir: "E",
        maxBlocks: 7,
        hint: "F×2, Turn right, F×2, Turn left, F×2, Turn right, F×2.",
      },
      {
        id: "bonus",
        type: "learn",
        title: "Bonus round",
        points: [
          "There's often more than one correct program.",
          "Try solving a level again with **fewer blocks**. That's a real programmer's habit.",
          "Shorter code is usually easier to read and fix.",
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
    slug: "obstacle-avoider",
    title: "Obstacle avoider",
    blurb: "Combine two distance sensors so the robot picks a safe way around.",
    icon: "🚧",
    minutes: 10,
    steps: [
      {
        id: "look-around",
        type: "learn",
        title: "Look around, then choose",
        points: [
          "One sensor isn't enough. Robots use several.",
          "Check the **most important** sensor first (the one in front).",
          "In an `if / else if` chain, the **first true check wins**, so the order matters.",
        ],
        diagram: [
          { icon: "⬆️", label: "Front clear?", note: "go forward" },
          { icon: "⬅️", label: "Left clear?", note: "turn left" },
          { icon: "🔄", label: "Neither", note: "turn around" },
        ],
      },
      {
        id: "react",
        type: "code",
        title: "Pick a direction",
        instructions: [
          "Both sensors give a distance in cm. **More than 20** means clear.",
          'Front clear: **"forward"**. Else left clear: **"turn left"**. Otherwise **"turn around"**.',
        ],
        starter:
          'function react(front, left) {\n  // if front is more than 20, return "forward"\n  // else if left is more than 20, return "turn left"\n  // otherwise return "turn around"\n}\n\nconsole.log(react(50, 5));\nconsole.log(react(10, 30));\nconsole.log(react(10, 10));\nconsole.log(react(20, 30));',
        expected: ["forward", "turn left", "turn around", "turn left"],
        hint: 'if (front > 20) return "forward"; if (left > 20) return "turn left"; return "turn around";',
      },
      {
        id: "order-matters",
        type: "learn",
        title: "Why the order matters",
        points: [
          "Imagine you checked **left** first. A clear front *and* clear left would turn left, even though going forward was fine.",
          "Put the preferred action first and the fallback last.",
          "Notice `react(20, 30)`: 20 is **not** more than 20, so the front counts as blocked.",
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
  {
    slug: "robot-coordinates",
    title: "Where am I? Coordinates",
    blurb: "Track a robot's position with x and y, and count steps to a target.",
    icon: "📍",
    minutes: 10,
    steps: [
      {
        id: "xy",
        type: "learn",
        title: "A position is two numbers",
        points: [
          "**x** says how far across (left to right).",
          "**y** says how far down (top to bottom). Screens count y downward!",
          "So `{ x: 2, y: 1 }` means 2 across, 1 down.",
        ],
        diagram: [
          { icon: "➡️", label: "x", note: "across" },
          { icon: "⬇️", label: "y", note: "down" },
          { icon: "📍", label: "(x, y)", note: "a position" },
        ],
      },
      {
        id: "move-code",
        type: "code",
        title: "Move one step",
        instructions: [
          "Return the **new position** after one step.",
          "North is **up** (y gets smaller), south is down, east is right, west is left.",
        ],
        starter:
          'function move(pos, dir) {\n  // N: y - 1, S: y + 1, E: x + 1, W: x - 1\n  return pos;\n}\n\nconsole.log(move({ x: 2, y: 2 }, "N"));\nconsole.log(move({ x: 2, y: 2 }, "E"));\nconsole.log(move({ x: 0, y: 0 }, "S"));',
        expected: ['{"x":2,"y":1}', '{"x":3,"y":2}', '{"x":0,"y":1}'],
        hint: 'if (dir === "N") return { x: pos.x, y: pos.y - 1 }; … do the same for S, E and W.',
      },
      {
        id: "manhattan",
        type: "learn",
        title: "Counting steps to a target",
        points: [
          "A robot on a grid can't cut corners. It moves along x, then along y.",
          "Steps needed = **how far in x** + **how far in y**.",
          "`Math.abs(a - b)` gives a distance that is never negative.",
        ],
      },
      {
        id: "steps-code",
        type: "code",
        title: "How many steps?",
        instructions: ["Return the number of steps from `a` to `b`."],
        starter:
          "function steps(a, b) {\n  // distance in x plus distance in y\n}\n\nconsole.log(steps({ x: 0, y: 0 }, { x: 3, y: 4 }));\nconsole.log(steps({ x: 5, y: 5 }, { x: 5, y: 2 }));",
        expected: ["7", "3"],
        hint: "return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);",
      },
    ],
  },
];
