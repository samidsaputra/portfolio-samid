"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { PillButton } from "@/components/shared/pill-button";

interface ProjectTechStack {
  id: string;
  name: string;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  category: string | null;
  is_featured: boolean;
  display_order: number;
  tech_stacks: ProjectTechStack[];
}

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const sorted = [...projects].sort((a, b) => {
    if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1;
    return a.display_order - b.display_order;
  });

  return (
    <section id="projects" className="scroll-mt-32 pt-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <h2 className="text-4xl font-bold tracking-tight">Featured Work</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sorted.map((project, index) => (
          <AnimatedSection key={project.id} direction="up" delay={0.1 * index}>
            <div className="nova-card p-4 group flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              
              {/* Image Container */}
              <div className="aspect-[4/3] w-full rounded-[24px] overflow-hidden bg-secondary mb-6 relative">
                {project.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-100 transition-transform duration-700 group-hover:scale-105">
                     <span className="font-heading text-6xl font-bold text-zinc-300 tracking-tighter">
                       {project.title.substring(0, 2).toUpperCase()}
                     </span>
                  </div>
                )}
                
                {/* Overlay Action */}
                {project.demo_url && (
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <PillButton asAnchor href={project.demo_url} target="_blank">
                      View Live
                    </PillButton>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="px-4 pb-2 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
                  {project.category && (
                     <span className="px-3 py-1 rounded-full border border-border-custom text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                       {project.category}
                     </span>
                  )}
                </div>
                
                {project.description && (
                  <p className="text-text-secondary mb-6 line-clamp-2">
                    {project.description}
                  </p>
                )}

                {/* Tech Stacks */}
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tech_stacks.map(t => (
                    <span key={t.id} className="px-3 py-1 rounded-full bg-secondary text-text-primary text-xs font-medium">
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
