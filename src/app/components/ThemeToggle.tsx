"use client";

import { useEffect, useState } from "react";

function getSystemPrefersDark() {
  if (typeof window === "undefined") return false;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    // why: SSR/CSR mismatch avoidance; read persisted theme once on mount
    const persisted = localStorage.getItem("theme");
    const preferDark = persisted ? persisted === "dark" : getSystemPrefersDark();
    setDark(preferDark);
    document.documentElement.classList.toggle("dark", preferDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
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
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
