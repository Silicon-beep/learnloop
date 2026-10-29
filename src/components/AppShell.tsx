"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toggleFocus, useSettings } from "@/lib/settings";

const NAV = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/track/software", label: "Software Eng", icon: "💻" },
  { href: "/track/cs", label: "Computer Science", icon: "🧠" },
  { href: "/track/ai", label: "AI & ML", icon: "🤖" },
  { href: "/track/robotics", label: "Robotics", icon: "🦾" },
  { href: "/playground", label: "Playground", icon: "🧪" },
  { href: "/achievements", label: "Achievements", icon: "🏆" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const settings = useSettings();
  const pathname = usePathname();

  // Keep <html> data attributes in sync with settings changes made after load.
  useEffect(() => {
    const d = document.documentElement;
    d.dataset.theme = settings.theme;
    d.dataset.font = settings.font;
    d.dataset.size = String(settings.size);
    d.dataset.motion = settings.motion;
    if (settings.contrast) d.dataset.contrast = "high";
    else delete d.dataset.contrast;
  }, [settings]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {!settings.focus && (
        <>
          <aside className="hidden w-60 shrink-0 flex-col gap-1 bg-side p-4 text-side-ink md:flex">
            <Link href="/" className="mb-5 px-2 text-2xl font-extrabold">
              Learn<span className="text-highlight">Loop</span>
            </Link>
            <nav aria-label="Main" className="flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-side-on ${
                    isActive(n.href) ? "bg-side-on font-bold" : ""
                  }`}
                >
                  <span aria-hidden>{n.icon}</span>
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="flex-1" />
            <button
              onClick={toggleFocus}
              className="rounded-xl bg-highlight px-3 py-3 font-extrabold text-[#1f2540] hover:brightness-95"
            >
              🎯 Focus Mode
            </button>
          </aside>

          <header className="bg-side text-side-ink md:hidden">
            <div className="flex items-center justify-between px-4 pt-3">
              <Link href="/" className="text-xl font-extrabold">
                Learn<span className="text-highlight">Loop</span>
              </Link>
              <button
                onClick={toggleFocus}
                className="rounded-lg bg-highlight px-3 py-1.5 text-sm font-extrabold text-[#1f2540]"
              >
                🎯 Focus
              </button>
            </div>
            <nav aria-label="Main" className="flex gap-1 overflow-x-auto px-3 py-3">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-sm ${
                    isActive(n.href) ? "bg-side-on font-bold" : ""
                  }`}
                >
                  <span aria-hidden>{n.icon}</span> {n.label}
                </Link>
              ))}
            </nav>
          </header>
        </>
      )}

      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 md:px-8 md:py-8">
        {settings.focus && (
          <div className="mb-4 flex justify-end">
            <button
              onClick={toggleFocus}
              className="rounded-xl bg-highlight px-4 py-2 font-bold text-[#1f2540]"
            >
              Exit Focus Mode
            </button>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
