import type { Lesson } from "../types";

export const aiLessons: Lesson[] = [
  {
    slug: "what-is-ml",
    title: "What is machine learning?",
    blurb: "Computers learn patterns from examples instead of rules.",
    icon: "🧠",
    minutes: 6,
    steps: [
      {
        id: "examples",
        type: "learn",
        title: "Computers learn from examples",
        points: [
          "Old way: you write every rule by hand.",
          "ML way: you show **examples** and the computer finds the pattern.",
          "The pattern it learns is called a **model**.",
        ],
        diagram: [
          { icon: "🖼️", label: "Examples", note: "lots of cats" },
          { icon: "🧠", label: "Model", note: "finds the pattern" },
          { icon: "🔮", label: "Prediction", note: "is this a cat?" },
        ],
      },
      {
        id: "more-examples",
        type: "learn",
        title: "More examples, better model",
        points: [
          "To spot cats, a model needs **lots** of cat pictures.",
          "More (and more varied) examples usually means a better model.",
          "When the model sees a brand-new picture, its guess is called a **prediction**.",
        ],
      },
    ],
  },
  {
    slug: "nearest-neighbour",
    title: "Predict with neighbours",
    blurb: "Build a tiny classifier that guesses by asking its closest neighbour.",
    icon: "📍",
    minutes: 12,
    steps: [
      {
        id: "idea",
        type: "learn",
        title: "Guess by asking the neighbours",
        points: [
          "You find a new fruit. Which fruit you already know is it **closest** to?",
          "The closest example's label wins. That's *nearest neighbour*.",
          "Closeness is just the difference between numbers.",
        ],
        diagram: [
          { icon: "🍇", label: "Grape", note: "5 g" },
          { icon: "🍑", label: "Plum", note: "20 g" },
          { icon: "🍎", label: "Apple", note: "160 g" },
        ],
      },
      {
        id: "plum-example",
        type: "learn",
        title: "Try it in your head",
        points: [
          "A new fruit weighs **18 g**.",
          "The closest known fruit is the plum (20 g), only 2 away.",
          "So we predict: **plum**.",
        ],
      },
      {
        id: "predict",
        type: "code",
        title: "Build the classifier",
        instructions: [
          "Finish `predict` so it returns the label of the **closest** known fruit.",
          "Use `Math.abs(a - b)` for distance.",
        ],
        starter: `const known = [
  { size: 5, label: "grape" },
  { size: 160, label: "apple" },
  { size: 20, label: "plum" },
];

function predict(size) {
  let best = known[0];
  for (const item of known) {
    // if item is closer to size than best is, update best
  }
  return best.label;
}

console.log(predict(150));
console.log(predict(7));
console.log(predict(25));`,
        expected: ["apple", "grape", "plum"],
        hint: "if (Math.abs(item.size - size) < Math.abs(best.size - size)) { best = item; }",
      },
    ],
  },
  {
    slug: "train-and-test",
    title: "Train it, then test it",
    blurb: "Why we hide some data from the model, and how to score it.",
    icon: "🧪",
    minutes: 10,
    steps: [
      {
        id: "exam",
        type: "learn",
        title: "Don't grade on the practice questions",
        points: [
          "Imagine studying for an exam with the exact exam questions. You'd ace it but learn nothing.",
          "So we split data in two: **training data** (to learn) and **test data** (to check).",
          "The model never sees the test data while learning.",
        ],
        diagram: [
          { icon: "📚", label: "Training", note: "learn from this" },
          { icon: "📝", label: "Test", note: "hidden until the end" },
          { icon: "📊", label: "Score", note: "how well did it do?" },
        ],
      },
      {
        id: "split",
        type: "code",
        title: "Split the data",
        instructions: [
          "Keep the first 8 items for training (already done).",
          "Put the **last 2** items in `test`, then print both lengths.",
        ],
        starter:
          "const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\nconst train = data.slice(0, 8);\nlet test = []; // fill with the last 2 items\nconsole.log(train.length, test.length);",
        expected: ["8 2"],
        hint: "test = data.slice(8);",
      },
      {
        id: "accuracy-idea",
        type: "learn",
        title: "Scoring: accuracy",
        points: [
          "**Accuracy** = correct predictions ÷ total predictions.",
          "3 right out of 4 is `3 / 4 = 0.75`, or 75%.",
          "If a model gets 100% on training data but 50% on test data, it just **memorised**. That's called overfitting.",
        ],
      },
      {
        id: "accuracy-code",
        type: "code",
        title: "Score the model",
        instructions: ["Count how many predictions match the real answers.", "Print the accuracy (correct ÷ total)."],
        starter:
          'const predicted = ["cat", "dog", "cat", "cat"];\nconst actual = ["cat", "dog", "dog", "cat"];\nlet correct = 0;\n// count the matches\nconsole.log(correct / predicted.length);',
        expected: ["0.75"],
        hint: "for (let i = 0; i < predicted.length; i++) { if (predicted[i] === actual[i]) correct++; }",
      },
    ],
  },
  {
    slug: "tiny-neuron",
    title: "A tiny neuron",
    blurb: "Build the smallest piece of a neural network: weigh inputs, then fire or not.",
    icon: "🧬",
    minutes: 10,
    steps: [
      {
        id: "neuron-idea",
        type: "learn",
        title: "How a neuron decides",
        points: [
          "Each input has a **weight**: how much it matters.",
          "Multiply every input by its weight and **add** them up.",
          "If the total is big enough, the neuron **fires**. Otherwise it stays quiet.",
        ],
        diagram: [
          { icon: "🔢", label: "Inputs", note: "a, b" },
          { icon: "⚖️", label: "Weights", note: "×2 and ×1" },
          { icon: "⚡", label: "Fire?", note: "sum ≥ 5" },
        ],
        tip: "A neural network is just lots of these wired together.",
      },
      {
        id: "neuron-code",
        type: "code",
        title: "Build the neuron",
        instructions: [
          "Input `a` has weight **2**, input `b` has weight **1**.",
          "Set `sum` to `a*2 + b*1`. The neuron fires at 5 or more.",
        ],
        starter:
          'function neuron(a, b) {\n  // multiply a by 2, b by 1, then add them\n  const sum = 0;\n  return sum >= 5 ? "fire" : "quiet";\n}\n\nconsole.log(neuron(1, 1));\nconsole.log(neuron(2, 2));\nconsole.log(neuron(3, 0));',
        expected: ["quiet", "fire", "fire"],
        hint: "const sum = a * 2 + b * 1;",
      },
      {
        id: "learning",
        type: "learn",
        title: "Where does learning happen?",
        points: [
          "Training = automatically **adjusting the weights** until the predictions get better.",
          "Try changing the weights in your neuron and see which inputs start to matter more.",
          "That's the whole idea behind deep learning, just at a huge scale.",
        ],
      },
    ],
  },
];
