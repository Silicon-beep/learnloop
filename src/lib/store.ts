"use client";

import { useSyncExternalStore } from "react";

// Tiny localStorage-backed store. Snapshots are cached so React gets stable references.
export function createPersistentStore<T extends object>(key: string, defaults: T) {
  let cache: T = defaults;
  let lastRaw: string | null | undefined;
  const listeners = new Set<() => void>();

  function read(): T {
    if (typeof window === "undefined") return defaults;
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      return cache;
    }
    if (raw !== lastRaw) {
      lastRaw = raw;
      try {
        cache = raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
      } catch {
        cache = defaults;
      }
    }
    return cache;
  }

  function emit() {
    listeners.forEach((l) => l());
  }

  function update(fn: (s: T) => T) {
    const next = fn(read());
    cache = next;
    try {
      const raw = JSON.stringify(next);
      window.localStorage.setItem(key, raw);
      lastRaw = raw;
    } catch {
      // Storage unavailable (private mode): keep working in memory.
    }
    emit();
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  function useStore(): T {
    return useSyncExternalStore(subscribe, read, () => defaults);
  }

  return { useStore, update, read };
}
