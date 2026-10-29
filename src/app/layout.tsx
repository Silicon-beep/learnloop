import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import Script from "next/script";
import { AppShell } from "@/components/AppShell";
import { SETTINGS_KEY } from "@/lib/settings";
import "./globals.css";

const readable = Atkinson_Hyperlegible({
  variable: "--font-readable",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "LearnLoop: learn by seeing and doing",
  description:
    "Learn software engineering, computer science, AI and robotics with short, visual, hands-on lessons built for ADHD, visual and kinesthetic learners.",
};

// Applies saved display settings before first paint to avoid a flash of the wrong theme.
const applySettings = `try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(SETTINGS_KEY)})||"{}");var d=document.documentElement;
if(s.theme)d.dataset.theme=s.theme;if(s.font)d.dataset.font=s.font;if(s.size!=null)d.dataset.size=s.size;
if(s.motion)d.dataset.motion=s.motion;if(s.contrast)d.dataset.contrast="high";}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={readable.variable} suppressHydrationWarning>
      <body>
        <Script id="apply-settings" strategy="beforeInteractive">
          {applySettings}
        </Script>
        <a
          href="#main"
          className="absolute -top-20 left-2 z-50 rounded-lg bg-accent px-4 py-2 text-accent-ink focus:top-2"
        >
          Skip to content
        </a>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
