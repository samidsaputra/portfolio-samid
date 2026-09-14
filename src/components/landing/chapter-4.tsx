"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { ArrowRight, Code, Briefcase, Mail } from "lucide-react";
import { SplitText } from "@/components/shared/split-text";

interface Chapter4Props {
  email: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
}

export function Chapter4({ email, linkedinUrl, githubUrl }: Chapter4Props) {
  return (
    <section id="chapter-4" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 py-16 md:py-32 overflow-hidden" data-ambient-color="#7C3AED">
      
      <div suppressHydrationWarning className="max-w-4xl mx-auto text-center z-10 w-full flex flex-col items-center">
        <AnimatedSection direction="up" delay={0.2}>
          <p className="text-violet-400/80 uppercase tracking-[0.2em] text-sm font-medium mb-8">
            Chapter 04 — Connection
          </p>
        </AnimatedSection>

        <SplitText delay={0.3}>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading mb-8 md:mb-12 px-2">
            Let's build the <span className="italic text-text-tertiary font-serif">right</span> system.
          </h2>
        </SplitText>

        <AnimatedSection direction="up" delay={0.4}>
          <p className="text-base sm:text-xl md:text-2xl text-text-secondary font-light max-w-2xl mx-auto leading-relaxed mb-12 md:mb-20 px-4">
            My journey doesn't stop here. I continue to explore the boundaries of modern web architecture, 
            looking for the next challenge that requires a solid foundation and precise execution.
          </p>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection direction="up" delay={0.5} className="flex flex-col items-center w-full">
          <p className="text-sm text-text-tertiary uppercase tracking-widest mb-8">
            Let's Collaborate
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 w-full max-w-md px-4">
            {email && (
              <a 
                href={`mailto:${email}`} 
                className="flex-1 min-w-[140px] flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-full text-sm font-semibold hover:bg-white/90 hover:scale-105 transition-all duration-300"
              >
                <Mail size={18} /> Email
              </a>
            )}
            
            {linkedinUrl && (
              <a 
                href={linkedinUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] flex items-center justify-center gap-3 border border-white/10 bg-white/5 text-text-primary px-6 py-4 rounded-full text-sm font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                <Briefcase size={18} /> LinkedIn
              </a>
            )}

            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] flex items-center justify-center gap-3 border border-white/10 bg-white/5 text-text-primary px-6 py-4 rounded-full text-sm font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                <Code size={18} /> GitHub
              </a>
            )}
          </div>
        </AnimatedSection>
        
      </div>
    </section>
  );
}
