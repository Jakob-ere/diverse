import type { Project } from "@/lib/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card">
      <div className="aspect-[16/10] rounded-xl border bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800" />
      <h3 className="mt-4 text-lg font-semibold">{project.title}</h3>
      <p className="mt-1 text-sm muted">{project.description}</p>
      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
      </div>
    </article>
  );
}