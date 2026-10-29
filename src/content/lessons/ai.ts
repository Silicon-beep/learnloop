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
        id: "spot-pattern",
        type: "code",
        title: "Spot the pattern",
        instructions: [
          "Hours studied → test score: **1 → 50**, **2 → 60**, **3 → 70**.",
          "Find the pattern and finish `predict` so it works for any number of hours.",
        ],
        starter:
          "// 1 hour -> 50, 2 hours -> 60, 3 hours -> 70\nfunction predict(hours) {\n  // find the pattern and return the predicted score\n  return 0;\n}\n\nconsole.log(predict(4));\nconsole.log(predict(0));\nconsole.log(predict(6));",
        expected: ["80", "40", "100"],
        hint: "Each extra hour adds 10, and 0 hours gives 40: return 40 + 10 * hours;",
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
  {
    slug: "how-chatbots-work",
    title: "How chatbots work",
    blurb: "Build a tiny next-word predictor and see why chatbots can be confidently wrong.",
    icon: "💬",
    minutes: 12,
    steps: [
      {
        id: "next-word",
        type: "learn",
        title: "Chatbots predict the next word",
        points: [
          "A language model reads your text and guesses the **next word**.",
          "It adds that word, then guesses again, and again.",
          "It learned which words tend to follow which by reading a huge amount of text.",
        ],
        diagram: [
          { icon: "📝", label: "Your text", note: "the cat sat on the…" },
          { icon: "🎯", label: "Guess", note: "mat" },
          { icon: "➕", label: "Add & repeat", note: "one word at a time" },
        ],
      },
      {
        id: "count-follows",
        type: "code",
        title: "Count what follows “the”",
        instructions: [
          "Every time the word **the** appears, look at the word right after it.",
          "Count how often each following word appears in `counts`.",
        ],
        starter:
          'const words = "the cat sat on the mat the cat ran".split(" ");\nconst counts = {};\n// for every "the", count the word that comes right after it\nconsole.log(counts);',
        expected: ['{"cat":2,"mat":1}'],
        hint: 'for (let i = 0; i < words.length - 1; i++) { if (words[i] === "the") { const next = words[i + 1]; counts[next] = (counts[next] || 0) + 1; } }',
      },
      {
        id: "most-likely",
        type: "code",
        title: "Pick the most likely word",
        instructions: ["Find the word with the **biggest count** and print it.", "That's the model's best guess."],
        starter:
          'const counts = { cat: 2, mat: 1, dog: 4 };\nlet best = "";\n// find the word with the biggest count\nconsole.log(best);',
        expected: ["dog"],
        hint: 'for (const word in counts) { if (best === "" || counts[word] > counts[best]) best = word; }',
      },
      {
        id: "confident-wrong",
        type: "learn",
        title: "Confident isn't the same as correct",
        points: [
          "The model picks **likely-sounding** words. It doesn't look facts up by default.",
          "So it can sound sure and still be wrong.",
          "Check anything important, and keep a human in the loop.",
        ],
      },
    ],
  },
  {
    slug: "fair-data",
    title: "Fair data, fair models",
    blurb: "Measure how lopsided a dataset is, and why that matters.",
    icon: "⚖️",
    minutes: 10,
    steps: [
      {
        id: "only-knows",
        type: "learn",
        title: "A model only knows its examples",
        points: [
          "If 90% of your photos are cats, the model gets great at cats and weak at dogs.",
          "Unbalanced data can make a model **less accurate or unfair** for the group that's under-represented.",
          "Always ask: **who is missing** from this data?",
        ],
        diagram: [
          { icon: "🗂️", label: "Data", note: "who's in it?" },
          { icon: "🧠", label: "Model", note: "learns patterns" },
          { icon: "⚖️", label: "Outcome", note: "fair for everyone?" },
        ],
      },
      {
        id: "count-labels",
        type: "code",
        title: "Count each label",
        instructions: ["Count how many of each label are in the data."],
        starter: 'const labels = ["cat", "cat", "cat", "cat", "dog"];\nconst counts = {};\n// count how many of each label\nconsole.log(counts);',
        expected: ['{"cat":4,"dog":1}'],
        hint: "for (const l of labels) { counts[l] = (counts[l] || 0) + 1; }",
      },
      {
        id: "how-lopsided",
        type: "code",
        title: "How lopsided is it?",
        instructions: ["Count the cats, then print what **percent** of the data they are."],
        starter:
          'const labels = ["cat", "cat", "cat", "cat", "dog"];\nlet cats = 0;\n// count the cats\nconsole.log((cats * 100) / labels.length);',
        expected: ["80"],
        hint: 'for (const l of labels) { if (l === "cat") cats++; }',
      },
      {
        id: "fixing",
        type: "learn",
        title: "What can we do?",
        points: [
          "**Collect more** examples of the missing group.",
          "**Balance** the data so each group is represented.",
          "**Test each group separately**, not just the overall score, and ask the people affected.",
        ],
      },
    ],
  },
  {
    slug: "learning-by-nudging",
    title: "Learning by nudging",
    blurb: "Measure how wrong a guess is, then nudge it closer, again and again.",
    icon: "🏔️",
    minutes: 12,
    steps: [
      {
        id: "nudge-idea",
        type: "learn",
        title: "Guess, measure, nudge",
        points: [
          "**Loss** is a number for how wrong the model is. Smaller is better.",
          "Training nudges the model's settings a little to make the loss smaller.",
          "Repeat thousands of times and the model gets good.",
        ],
        diagram: [
          { icon: "🎯", label: "Guess", note: "prediction" },
          { icon: "📏", label: "Loss", note: "how wrong?" },
          { icon: "🔧", label: "Nudge", note: "improve a bit" },
        ],
      },
      {
        id: "loss-code",
        type: "code",
        title: "Measure the loss",
        instructions: ["Return the **squared difference** between the prediction and the actual value.", "Squaring makes every error positive."],
        starter:
          "function loss(prediction, actual) {\n  // return the squared difference\n}\n\nconsole.log(loss(3, 5));\nconsole.log(loss(5, 5));\nconsole.log(loss(8, 5));",
        expected: ["4", "0", "9"],
        hint: "const d = prediction - actual; return d * d;",
      },
      {
        id: "nudge-code",
        type: "code",
        title: "Nudge toward the target",
        instructions: [
          "Each loop, move `guess` toward `target` by `rate` times the gap.",
          "Watch the guess get closer each time.",
        ],
        starter:
          "let guess = 0;\nconst target = 10;\nconst rate = 0.5;\n\nfor (let i = 0; i < 3; i++) {\n  // move guess toward target by rate * (target - guess)\n}\nconsole.log(guess);",
        expected: ["8.75"],
        hint: "guess = guess + rate * (target - guess);",
      },
      {
        id: "learning-rate",
        type: "learn",
        title: "The learning rate",
        points: [
          "The **learning rate** is how big each nudge is.",
          "Too big and it overshoots. Too small and it takes forever.",
          "Try changing `rate` to 0.1 or 1.5 and see what happens to the answer.",
        ],
      },
    ],
  },
];
