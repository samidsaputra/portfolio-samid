"use client";

import { AnimatedSection } from "@/components/shared/animated-section";

interface Experience {
  id: string;
  role: string;
  institution: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  display_order: number;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

function getYear(dateStr: string): string {
  return new Date(dateStr).getFullYear().toString();
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const sorted = [...experiences].sort(
    (a, b) => a.display_order - b.display_order
  );

  return (
    <section id="experience" className="scroll-mt-32 pt-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <h2 className="text-4xl font-bold tracking-tight">Experience</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sorted.map((exp, index) => (
          <AnimatedSection
            key={exp.id}
            direction="up"
            delay={index * 0.1}
            className="nova-card flex flex-col gap-6"
          >
            <div className="flex justify-between items-start">
               <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-text-primary font-bold">
                 {exp.institution.charAt(0)}
               </div>
               <span className="px-4 py-1.5 rounded-full border border-border-custom text-xs font-semibold uppercase tracking-wider text-text-secondary">
                 {getYear(exp.start_date)} — {exp.end_date ? getYear(exp.end_date) : "Present"}
               </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
              <p className="text-lg font-medium text-text-secondary mb-4">{exp.institution}</p>
              {exp.description && (
                <p className="text-text-secondary leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
