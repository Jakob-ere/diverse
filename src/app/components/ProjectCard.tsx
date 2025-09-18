import Link from "next/link";
import type { Project } from "@/lib/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-xl border p-4 transition hover:shadow-sm dark:border-neutral-800">
      <div className="aspect-video rounded-lg border bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-800" />
      <h3 className="mt-4 text-lg font-semibold">{project.title}</h3>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">{project.description}</p>
      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="flex gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-md border px-2 py-0.5 dark:border-neutral-800">{t}</span>
          ))}
        </div>
        <div className="flex gap-3">
          {project.url && <Link href={project.url} target="_blank" className="underline underline-offset-4 hover:opacity-80">Live</Link>}
          {project.repo && <Link href={project.repo} target="_blank" className="underline underline-offset-4 hover:opacity-80">Code</Link>}
        </div>
      </div>
    </article>
  );
}
