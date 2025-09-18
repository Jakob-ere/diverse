export type Project = {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    url?: string;
    repo?: string;
  };
  
  export const projects: Project[] = [
    {
      slug: "realtimesaas",
      title: "Realtime SaaS Dashboard",
      description: "Multi-tenant analytics with WebSocket streams, role-based access, and Vercel Postgres.",
      tags: ["Next.js", "TS", "Postgres"],
      url: "https://example.com",
      repo: "https://github.com/you/realtimesaas",
    },
    {
      slug: "designsystem",
      title: "Design System",
      description: "Accessible UI kit with tokens, theming, and docs site.",
      tags: ["Storybook", "Tailwind", "A11y"],
      repo: "https://github.com/you/designsystem",
    },
    {
      slug: "imageoptimizer",
      title: "Image Optimizer",
      description: "Edge image pipeline with smart cropping and AVIF/WebP.",
      tags: ["Edge", "Workers", "Perf"],
      url: "https://example.com/optimizer",
    },
    {
      slug: "cli-tool",
      title: "DX CLI",
      description: "Zero-config scaffolder for monorepos with generators.",
      tags: ["Node", "CLI", "DX"],
      repo: "https://github.com/you/dx-cli",
    },
  ];
  