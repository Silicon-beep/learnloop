# LearnLoop

A website for learning software engineering, computer science, AI and robotics by **seeing and doing**.
It is designed for ADHD, visual and kinesthetic learners: short steps, visuals, hands-on practice and instant feedback.

There are no user accounts. Progress, XP, streaks and display settings are saved in the browser (localStorage).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## How it works

- **Stack:** Next.js (App Router), TypeScript, Tailwind CSS.
- **Lessons** are typed data in `src/content/lessons/`. Each lesson is a list of small steps:
  - `learn`: short points plus a visual diagram
  - `code`: an in-browser JavaScript editor whose output is checked against a goal
  - `robot`: a block-programming robot grid
  - `sort`: a step-through bubble sort visualizer
- To add a lesson, add an object to a track file in `src/content/lessons/`.
- **Code runner:** learner code runs in a Web Worker (`src/lib/runJs.ts`) with a 3-second timeout, so infinite loops can't freeze the page.
- **Accessibility:** Focus Mode, easy-to-read font, text size, dark theme, high contrast and reduced motion (Settings page).
