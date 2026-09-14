"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { SplitText } from "@/components/shared/split-text";

interface Chapter2Props {
  aboutText: string;
  photoUrl: string | null;
}

export function Chapter2({ aboutText, photoUrl }: Chapter2Props) {
  return (
    <section id="chapter-2" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 py-16 md:py-24 overflow-hidden" data-ambient-color="#6366F1">
      
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Text */}
          <div className="order-2 lg:order-1">
            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-zinc-400 uppercase tracking-[0.2em] text-sm font-medium mb-6">
                Chapter 02 — Origin
              </p>
            </AnimatedSection>
            
            <SplitText delay={0.3}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold mb-6 md:mb-8 text-text-primary">
                Focusing on the systemic.
              </h2>
            </SplitText>

            <AnimatedSection direction="up" delay={0.4}>
              <div className="space-y-5 md:space-y-6">
                {aboutText && (
                  <p className="text-base md:text-lg text-text-secondary leading-[1.85] font-light tracking-wide">
                    {aboutText}
                  </p>
                )}

                {/* Highlight stats row */}
                <div className="flex flex-wrap gap-6 pt-2 border-t border-white/5">
                  <div className="flex flex-col gap-1">
                    <span className="text-2xl font-semibold text-text-primary">4+</span>
                    <span className="text-xs text-text-tertiary uppercase tracking-widest">Projects Built</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-2xl font-semibold text-text-primary">2+</span>
                    <span className="text-xs text-text-tertiary uppercase tracking-widest">Years Experience</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-2xl font-semibold text-text-primary">∞</span>
                    <span className="text-xs text-text-tertiary uppercase tracking-widest">Curiosity</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Photo */}
          <AnimatedSection direction="left" delay={0.5} className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
              
              {/* Ambient glow behind photo */}
              <div className="absolute -inset-4 bg-indigo-500/10 rounded-2xl blur-2xl" />
              <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 via-transparent to-violet-500/10 rounded-2xl blur-xl" />

              {/* Outer decorative border */}
              <div className="absolute -inset-px rounded-2xl border border-white/10" />

              {/* Inner photo container */}
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-secondary/30 grayscale hover:grayscale-0 transition-all duration-700 group">
                {photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photoUrl}
                    alt="Samid Saputra"
                    className="w-full h-full object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-tertiary font-serif italic text-sm">
                    [Portrait]
                  </div>
                )}

                {/* Cinematic gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                {/* Corner accent lines */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/30" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/30" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-white/30" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/30" />
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
