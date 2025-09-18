import Section from "@/app/components/Section";

export default function AboutPage() {
  return (
    <Section className="prose dark:prose-invert max-w-3xl">
      <h1>About</h1>
      <p>
        I’m a software engineer who enjoys TypeScript, React, Node.js, and clean architecture.
        I’ve shipped production apps across startups and enterprises.
      </p>
      <h2>Skills</h2>
      <ul>
        <li>Frontend: React, Next.js, Tailwind, Zustand, TanStack Query</li>
        <li>Backend: Node.js, Express, tRPC, Prisma, PostgreSQL</li>
        <li>Infra: Docker, CI/CD, Vercel</li>
        <li>Quality: Testing Library, Playwright, Vitest/Jest</li>
      </ul>
      <h2>Experience</h2>
      <p>Company A — Senior Engineer (2023–Now): Lead web platform; performance budget; design system.</p>
      <p>Company B — Engineer (2021–2023): Built real-time analytics dashboard; 99.95% uptime.</p>
    </Section>
  );
}
