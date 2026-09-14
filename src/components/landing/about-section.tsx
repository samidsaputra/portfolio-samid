"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { PillButton } from "@/components/shared/pill-button";
import { Download } from "lucide-react";

interface AboutSectionProps {
  aboutText: string;
  photoUrl: string | null;
  linkedinUrl: string | null;
  cvUrl: string | null;
}

export function AboutSection({ aboutText, cvUrl }: AboutSectionProps) {
  return (
    <section id="about" className="scroll-mt-32 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Large Typography */}
        <AnimatedSection direction="up" delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-snug mb-8">
            A digital designer with a passion for turning ideas into intuitive, <span className="text-text-tertiary">user-first experiences.</span>
          </h2>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            {aboutText}
          </p>
          
          {cvUrl && (
            <PillButton asAnchor href={cvUrl}>
              Download Resume
            </PillButton>
          )}
        </AnimatedSection>

        {/* Right: Rounded Abstract Cards (Mocking the imagery from Nova Persona) */}
        <AnimatedSection direction="up" delay={0.3} className="relative h-[400px] hidden md:block">
           <div className="absolute top-0 right-10 w-64 h-80 nova-card p-2 rotate-6 hover:rotate-0 transition-transform duration-500 z-10">
             <div className="w-full h-full rounded-[24px] bg-secondary/50 flex items-center justify-center text-text-tertiary font-medium">
               Design
             </div>
           </div>
           <div className="absolute top-20 left-10 w-72 h-64 nova-card p-2 -rotate-3 hover:rotate-0 transition-transform duration-500 z-0">
             <div className="w-full h-full rounded-[24px] bg-border-custom/50 flex items-center justify-center text-text-tertiary font-medium">
               Code
             </div>
           </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
