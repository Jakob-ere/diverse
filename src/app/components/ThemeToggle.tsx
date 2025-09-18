"use client";

import { useEffect, useState } from "react";

function prefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const next = saved ? saved === "dark" : prefersDark();
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-lg border px-2 py-1.5 text-sm hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
