import Section from "@/app/components/Section";
import ProjectCard from "@/app/components/ProjectCard";
import { projects } from "@/lib/project";

export default function ProjectsPage() {
  return (
    <Section>
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">A selection of things I’ve built.</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </Section>
  );
}