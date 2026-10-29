import type { Lesson } from "../types";

export const csLessons: Lesson[] = [
  {
    slug: "sorting-by-seeing",
    title: "Sorting by seeing",
    blurb: "Watch bubble sort compare and swap, one step at a time.",
    icon: "📊",
    minutes: 8,
    steps: [
      {
        id: "intro",
        type: "learn",
        title: "Sorting = putting things in order",
        points: [
          "Computers sort things all the time: songs, prices, search results.",
          "**Bubble sort** compares two neighbours and swaps them if they're in the wrong order.",
          "Bigger numbers slowly *bubble* to the right.",
        ],
        diagram: [
          { icon: "🔍", label: "Compare", note: "two neighbours" },
          { icon: "🔄", label: "Swap", note: "if wrong order" },
          { icon: "🔁", label: "Repeat", note: "until sorted" },
        ],
      },
      {
        id: "watch",
        type: "sort",
        title: "Watch it sort",
        instructions: [
          "Press **Step** to move one comparison at a time, or **Play** to watch it run.",
          "Yellow bars are being compared. Pink bars just swapped. Green bars are finished.",
        ],
        values: [5, 3, 8, 1, 4],
      },
      {
        id: "swap-rule",
        type: "learn",
        title: "The one rule of bubble sort",
        points: [
          "Look at two neighbours.",
          "If the **left one is bigger**, swap them. It belongs further right.",
          "If they're in order already, leave them alone.",
        ],
        tip: "You just watched this rule run. Try the visualizer again and predict each swap before pressing Step.",
      },
    ],
  },
  {
    slug: "loops",
    title: "Loops: do it again",
    blurb: "Make the computer repeat work so you don't have to.",
    icon: "🔁",
    minutes: 10,
    steps: [
      {
        id: "dry",
        type: "learn",
        title: "Don't repeat yourself",
        points: [
          "Computers are great at repeating.",
          "A **loop** says: do this again, and again, until a condition stops it.",
          "`for (let i = 1; i <= 5; i++)` means start at 1, stop after 5, add 1 each time.",
        ],
        diagram: [
          { icon: "1️⃣", label: "Start", note: "i = 1" },
          { icon: "🔁", label: "Repeat", note: "while i ≤ 5" },
          { icon: "➕", label: "Step", note: "i++" },
        ],
      },
      {
        id: "count",
        type: "code",
        title: "Count to 5",
        instructions: ["Print each number from 1 to 5, one per line."],
        starter: "for (let i = 1; i <= 5; i++) {\n  // print i\n}",
        expected: ["1", "2", "3", "4", "5"],
        hint: "Inside the loop write: console.log(i);",
      },
      {
        id: "plus-plus",
        type: "learn",
        title: "What is i++?",
        points: [
          "`i++` adds 1 to `i`.",
          "It's shorthand for `i = i + 1`.",
          "Each trip around the loop runs `i++`, so the counter moves forward.",
        ],
      },
      {
        id: "sum",
        type: "code",
        title: "Add them all up",
        instructions: ["Add the numbers **1 through 10** into `total`.", "Then print it."],
        starter: "let total = 0;\n// add 1 through 10 into total\nconsole.log(total);",
        expected: ["55"],
        hint: "for (let i = 1; i <= 10; i++) { total = total + i; }",
      },
    ],
  },
  {
    slug: "arrays",
    title: "Lists of things (arrays)",
    blurb: "Store many values in order, and add or remove them.",
    icon: "🗂️",
    minutes: 10,
    steps: [
      {
        id: "shelf",
        type: "learn",
        title: "A shelf with numbered slots",
        points: [
          "An **array** is an ordered list: `[\"apple\", \"banana\", \"grape\"]`.",
          "Each slot has a number called its **index**.",
          "Heads up: counting starts at **0**, not 1!",
        ],
        diagram: [
          { icon: "🍎", label: "apple", note: "index 0" },
          { icon: "🍌", label: "banana", note: "index 1" },
          { icon: "🍇", label: "grape", note: "index 2" },
        ],
      },
      {
        id: "second",
        type: "code",
        title: "Grab the second one",
        instructions: ["Print the **second** fruit.", "Remember: the first one is index 0."],
        starter: 'const fruits = ["apple", "banana", "grape"];\n// print the second fruit',
        expected: ["banana"],
        hint: "console.log(fruits[1]);",
      },
      {
        id: "total",
        type: "code",
        title: "Add them all",
        instructions: ["Add every number in the list into `total`.", "A `for...of` loop visits each item."],
        starter:
          "const nums = [4, 8, 15, 16];\nlet total = 0;\n// add every number to total\nconsole.log(total);",
        expected: ["43"],
        hint: "for (const n of nums) { total = total + n; }",
      },
      {
        id: "stack-idea",
        type: "learn",
        title: "Stacks: last in, first out",
        points: [
          "Think of a stack of plates. You add and remove from the **top**.",
          "`push(x)` puts something on top.",
          "`pop()` takes the top one off.",
        ],
        diagram: [
          { icon: "⬇️", label: "push", note: "add on top" },
          { icon: "🥞", label: "stack", note: "plates" },
          { icon: "⬆️", label: "pop", note: "remove top" },
        ],
      },
      {
        id: "stack-code",
        type: "code",
        title: "Build a stack",
        instructions: ["Push **1, 2, 3** onto the stack.", "Then **pop** once. Print the stack."],
        starter: "const stack = [];\n// push 1, 2, 3, then pop once\nconsole.log(stack);",
        expected: ["[1,2]"],
        hint: "stack.push(1); stack.push(2); stack.push(3); stack.pop();",
      },
    ],
  },
  {
    slug: "search-speed",
    title: "Searching and speed",
    blurb: "Why some ways of finding things are much faster than others.",
    icon: "⏱️",
    minutes: 10,
    steps: [
      {
        id: "two-ways",
        type: "learn",
        title: "Two ways to find a number",
        points: [
          "**Linear search**: check every item, one by one.",
          "**Binary search**: in a *sorted* list, check the middle and throw away half each time.",
          "Halving is powerful: a million items takes only about **20** checks!",
        ],
        diagram: [
          { icon: "🚶", label: "Linear", note: "one by one" },
          { icon: "✂️", label: "Binary", note: "halve it" },
          { icon: "🚀", label: "Fast", note: "~20 checks for 1,000,000" },
        ],
      },
      {
        id: "count-looks",
        type: "code",
        title: "Count the looks",
        instructions: [
          "Linear search for **20**. Count how many numbers you look at, up to and including 20.",
          "Use `break` to stop once you find it.",
        ],
        starter:
          "const list = [3, 9, 14, 20, 31, 42];\nlet steps = 0;\n// look at each number until you find 20, counting each look in steps\nconsole.log(steps);",
        expected: ["4"],
        hint: "for (const n of list) { steps++; if (n === 20) break; }",
      },
      {
        id: "halving",
        type: "learn",
        title: "Binary search, by hand",
        points: [
          "Looking for 31 in `[3, 9, 14, 20, 31, 42]`.",
          "Middle is 14. 31 is bigger, so throw away the left half.",
          "Now `[20, 31, 42]`: middle is 31. Found it in **2 looks**, not 5.",
        ],
        tip: "This only works if the list is sorted. That's why sorting matters!",
      },
      {
        id: "max",
        type: "code",
        title: "Find the biggest",
        instructions: ["Find the largest number in the list and print it."],
        starter: "const scores = [12, 47, 8, 33, 29];\nlet best = scores[0];\n// update best whenever you find a bigger number\nconsole.log(best);",
        expected: ["47"],
        hint: "for (const s of scores) { if (s > best) best = s; }",
      },
    ],
  },
];
