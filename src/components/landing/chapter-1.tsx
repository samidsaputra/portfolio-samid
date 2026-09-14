"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { SplitText } from "@/components/shared/split-text";

export function Chapter1() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial fade in for the chapter content
    gsap.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out", delay: 0.2 }
    );
  }, { scope: containerRef });

  return (
    <section 
      id="chapter-1" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-32 overflow-hidden"
      data-ambient-color="#52525B"
    >
      <div 
        ref={textRef}
        className="max-w-4xl mx-auto text-center z-10 opacity-0"
      >
        <p className="text-accent-monochrome uppercase tracking-[0.2em] text-sm font-medium mb-8">
          Chapter 01 — Vision
        </p>

        <SplitText delay={0.4}>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading mb-8 md:mb-12">
            Crafting digital experiences with precision.
          </h1>
        </SplitText>

        <p className="text-base sm:text-xl md:text-2xl text-text-secondary font-light max-w-2xl mx-auto leading-relaxed px-2">
          Building robust, scalable, and intuitive applications from the ground up, with a focus on clean architecture and performance.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-tertiary">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/60 animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
