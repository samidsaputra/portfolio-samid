"use client";

import { useRef } from "react";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

interface SplitTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SplitText({ children, className, delay = 0 }: SplitTextProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(async () => {
    if (!container.current) return;
    
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(container.current, { autoAlpha: 1 });
      return;
    }

    try {
      // Dynamically import Splitting
      // @ts-ignore
      const SplittingModule = await import("splitting");
      const Splitting = SplittingModule.default || SplittingModule;

      // Initialize splitting
      Splitting({ target: container.current, by: "chars" });

      // The chars are now wrapped in span.char
      const chars = container.current.querySelectorAll('.char');
      
      gsap.fromTo(
        chars,
        { opacity: 0, y: 50, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.02,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: delay,
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Make the container visible now that chars are hidden
      gsap.set(container.current, { autoAlpha: 1 });
    } catch (e) {
      // Fallback if Splitting fails
      gsap.set(container.current, { autoAlpha: 1 });
    }
  }, { scope: container });

  return (
    <div suppressHydrationWarning ref={container} className={cn("opacity-0", className)} style={{ perspective: "1000px" }}>
      {children}
    </div>
  );
}
