"use client";

import { useState } from "react";
import { resetProgress } from "@/lib/progress";
import { updateSettings, useSettings, type Settings } from "@/lib/settings";

function Group<T extends string | number | boolean>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; text: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="rounded-2xl bg-surface p-4 shadow-sm">
      <legend className="px-1 font-extrabold">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={String(o.value)}
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-xl border-2 px-4 py-2 font-bold ${
              value === o.value ? "border-accent bg-accent text-accent-ink" : "border-line"
            }`}
          >
            {o.text}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function SettingsPanel() {
  const s = useSettings();
  const [confirming, setConfirming] = useState(false);
  const set = <K extends keyof Settings>(k: K) => (v: Settings[K]) => updateSettings({ [k]: v });

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <div>
        <h1 className="text-2xl font-extrabold md:text-3xl">⚙️ Make it comfortable</h1>
        <p className="text-muted">Everything is saved in this browser. Nothing is sent anywhere.</p>
      </div>
      <Group
        label="Theme"
        value={s.theme}
        onChange={set("theme")}
        options={[
          { value: "light", text: "☀️ Light" },
          { value: "dark", text: "🌙 Dark" },
        ]}
      />
      <Group
        label="Font"
        value={s.font}
        onChange={set("font")}
        options={[
          { value: "readable", text: "Easy-to-read (Atkinson)" },
          { value: "system", text: "System default" },
        ]}
      />
      <Group
        label="Text size"
        value={s.size}
        onChange={set("size")}
        options={[
          { value: 0, text: "Normal" },
          { value: 1, text: "Large" },
          { value: 2, text: "Extra large" },
        ]}
      />
      <Group
        label="Animations"
        value={s.motion}
        onChange={set("motion")}
        options={[
          { value: "full", text: "On" },
          { value: "reduce", text: "Reduced" },
        ]}
      />
      <Group
        label="High contrast"
        value={s.contrast}
        onChange={set("contrast")}
        options={[
          { value: false, text: "Off" },
          { value: true, text: "On" },
        ]}
      />
      <Group
        label="Focus Mode (hides the menu)"
        value={s.focus}
        onChange={set("focus")}
        options={[
          { value: false, text: "Off" },
          { value: true, text: "On" },
        ]}
      />

      <div className="rounded-2xl bg-surface p-4 shadow-sm">
        <div className="mb-2 font-extrabold">Progress</div>
        {confirming ? (
          <div className="flex flex-wrap items-center gap-2">
            <span>Erase all XP, streaks and lesson progress?</span>
            <button
              onClick={() => {
                resetProgress();
                setConfirming(false);
              }}
              className="rounded-xl bg-bad px-4 py-2 font-bold text-white"
            >
              Yes, erase
            </button>
            <button onClick={() => setConfirming(false)} className="rounded-xl border-2 border-line px-4 py-2 font-bold">
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={() => setConfirming(true)} className="rounded-xl border-2 border-line px-4 py-2 font-bold">
            Reset my progress
          </button>
        )}
      </div>
    </div>
  );
}
