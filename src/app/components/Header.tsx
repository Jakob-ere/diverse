"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/calculator", label: "Calculator" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]); // why: close when navigating

  return (
    <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur dark:border-neutral-900 dark:bg-neutral-950/70">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-base font-semibold">
          Jakob Elias Relling
        </Link>

        <nav className="hidden gap-1 sm:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn("nav-link", active && "nav-active")}
                aria-current={active ? "page" : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="sm:hidden rounded-lg border px-2 py-1.5 dark:border-neutral-800"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden border-t dark:border-neutral-900">
          <div className="container py-2 flex flex-col">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="py-2">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

