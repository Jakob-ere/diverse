import Section from "@/app/components/Section";
import ProjectCard from "@/app/components/ProjectCard";
import { projects } from "@/lib/project";
import Calculator from "@/app/calculator/calculator";

export default function CalculatorPage() {

  return (
    <Section>
      <h1 className="mb-2">Calculator</h1>
      <p className="muted">A selection of things I’ve built.</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <p>Hei</p>
        <Calculator />
      </div>
    </Section>
  );
}