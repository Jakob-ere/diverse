import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t py-8 text-sm dark:border-neutral-900">
      <div className="container flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p>© {year} Your Name. All rights reserved.</p>
        <div className="flex gap-4">
          <Link className="link" href="https://github.com/yourname" target="_blank" rel="noreferrer">GitHub</Link>
          <Link className="link" href="https://x.com/yourhandle" target="_blank" rel="noreferrer">X</Link>
          <Link className="link" href="https://www.linkedin.com/in/yourname" target="_blank" rel="noreferrer">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
}
