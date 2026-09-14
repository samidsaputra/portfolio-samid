"use client";

import { AnimatedSection } from "@/components/shared/animated-section";

interface TechStack {
  id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "tools";
  display_order: number;
}

interface TechStackSectionProps {
  techStacks: TechStack[];
}

export function TechStackSection({ techStacks }: TechStackSectionProps) {
  return (
    <section id="tech-stack" className="scroll-mt-32 pt-32">
      <AnimatedSection direction="up" className="nova-card py-16 px-8 md:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The tools I use</h2>
        <p className="text-text-secondary text-lg mb-12 max-w-2xl mx-auto">
          A carefully selected stack to build robust and scalable applications.
        </p>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
          {techStacks.map((tech) => (
            <div 
              key={tech.id} 
              className="px-6 py-3 rounded-full border border-border-custom bg-background hover:bg-secondary transition-colors text-sm font-semibold text-text-primary"
            >
              {tech.name}
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
