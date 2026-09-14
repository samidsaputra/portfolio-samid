"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { PillButton } from "@/components/shared/pill-button";

interface ConnectSectionProps {
  email: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
}

export function ConnectSection({
  email,
  linkedinUrl,
  githubUrl,
}: ConnectSectionProps) {
  const currentYear = new Date().getFullYear();

  return (
    <section id="connect" className="pt-32 pb-8">
      <AnimatedSection direction="up">
        <div className="bg-[#1A1A1A] text-white rounded-[40px] p-12 md:p-24 flex flex-col items-center text-center relative overflow-hidden">
          
          {/* Decorative background circle */}
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[80px] pointer-events-none" />

          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-text-primary mt-6 mb-12 leading-tight">
            Let's build <br /> something <span className="text-text-tertiary">great.</span>
          </h2>
          
          <p className="text-xl text-zinc-400 mb-12 max-w-xl relative z-10">
            Available for freelance opportunities. Let's collaborate to create user-first digital experiences.
          </p>

          {email && (
            <div className="relative z-10">
              <PillButton asAnchor href={`mailto:${email}`} className="bg-white text-black hover:bg-white/90">
                Contact Me
              </PillButton>
            </div>
          )}

          <div className="w-full mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <div className="flex items-center gap-6">
              {linkedinUrl && (
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
                  GitHub
                </a>
              )}
            </div>
            
            <p className="text-sm font-medium text-zinc-500">
              © {currentYear} M Dimas Saputra.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
