"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { SplitText } from "@/components/shared/split-text";
import { ArrowUpRight, Code } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  ambient_color?: string;
  project_tech_stacks?: { tech_stacks: { id?: number; name: string } }[];
}

interface Chapter3Props {
  projects: Project[];
}

export function Chapter3({ projects }: Chapter3Props) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="chapter-3" className="relative w-full py-16 md:py-32 px-4 sm:px-6 md:px-12 flex flex-col gap-20 md:gap-32">
      
      {projects.map((project, index) => {
        const isEven = index % 2 === 0;
        return (
          <div 
            key={project.id}
            id={`showcase-${index + 1}`} 
            className={`relative w-full max-w-7xl mx-auto flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
            data-ambient-color={project.ambient_color || "#3F3F46"}
          >
            {/* Image Panel */}
            <AnimatedSection direction="up" delay={0.2} className="w-full lg:w-3/5">
              <div className="relative aspect-video w-full rounded-md overflow-hidden bg-secondary/50 border border-white/10 group">
                {project.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={project.thumbnail_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800/40 via-zinc-900/20 to-black flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <span className="text-2xl">🖥️</span>
                      </div>
                      <p className="text-white/40 text-sm font-medium uppercase tracking-widest">{project.title}</p>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Content */}
            <div className="w-full lg:w-2/5 flex flex-col gap-6">
              <AnimatedSection direction="up" delay={0.3}>
                <p className="text-white/40 uppercase tracking-[0.2em] text-sm font-medium">
                  Project {String(index + 1).padStart(2, '0')}
                </p>
              </AnimatedSection>
              
              <SplitText delay={0.4}>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-text-primary">
                  {project.title}
                </h3>
              </SplitText>

              <AnimatedSection direction="up" delay={0.5}>
                <p className="text-base md:text-lg text-text-secondary font-light leading-relaxed">
                  {project.description}
                </p>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.6}>
                <div className="flex flex-wrap gap-2">
                  {project.project_tech_stacks?.map((pts, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium border border-white/10 rounded-full text-white/60 bg-white/5">
                      {pts.tech_stacks?.name}
                    </span>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.7} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
                {project.demo_url && (
                  <a 
                    href={project.demo_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
                  >
                    Live Demo <ArrowUpRight size={16} />
                  </a>
                )}
                {project.github_url && (
                  <a 
                    href={project.github_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white/20 text-text-primary px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/5 transition-all hover:scale-105 active:scale-95"
                  >
                    Source Code <Code size={16} />
                  </a>
                )}
              </AnimatedSection>
            </div>
          </div>
        );
      })}
    </section>
  );
}
