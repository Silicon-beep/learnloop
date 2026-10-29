"use client";

import { createPersistentStore } from "./store";

export type Settings = {
  focus: boolean;
  font: "readable" | "system";
  size: 0 | 1 | 2;
  motion: "full" | "reduce";
  theme: "light" | "dark";
  contrast: boolean;
};

export const SETTINGS_KEY = "learnloop-settings";

export const defaultSettings: Settings = {
  focus: false,
  font: "readable",
  size: 0,
  motion: "full",
  theme: "light",
  contrast: false,
};

const store = createPersistentStore<Settings>(SETTINGS_KEY, defaultSettings);

export const useSettings = store.useStore;

export function updateSettings(patch: Partial<Settings>) {
  store.update((s) => ({ ...s, ...patch }));
}

export function toggleFocus() {
  store.update((s) => ({ ...s, focus: !s.focus }));
}
