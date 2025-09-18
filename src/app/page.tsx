import Link from "next/link";
import Section from "@/app/components/Section";
import ProjectCard from "@/app/components/ProjectCard";
import { projects } from "@/lib/project";

export default function HomePage() {
  const featured = projects.slice(0, 3);
  return (
    <>
      <Section className="pt-14">
        <div className="grid items-center gap-10 md:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-5">
            <span className="inline-block rounded-full border px-3 py-1 text-sm dark:border-neutral-800">
              👋 Hi, I’m Your Name
            </span>
            <h1>
              I build <span className="underline decoration-wavy decoration-neutral-300 dark:decoration-neutral-700">fast</span> &{" "}
              <span className="underline decoration-wavy decoration-neutral-300 dark:decoration-neutral-700">clean</span> web products.
            </h1>
            <p className="text-lg muted">
              Full-stack engineer focused on DX, performance, and delightful UX.
            </p>
            <div className="flex gap-3">
              <Link href="/projects" className="btn-primary">View Projects</Link>
              <a href="mailto:you@domain.com" className="btn-secondary">Contact</a>
            </div>
          </div>

          <div className="aspect-[16/10] rounded-2xl border bg-gradient-to-br from-neutral-50 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 dark:border-neutral-800" />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="flex items-end justify-between">
          <h2>Featured Projects</h2>
          <Link className="link text-sm" href="/projects">See all</Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </Section>
    </>
  );
}
