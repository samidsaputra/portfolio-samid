"use client";

import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  id?: string;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  id,
}: AnimatedSectionProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      gsap.set(container.current, { autoAlpha: 1, x: 0, y: 0 });
      return;
    }

    let x = 0;
    let y = 0;

    switch (direction) {
      case "up":
        y = 80;
        break;
      case "down":
        y = -80;
        break;
      case "left":
        x = 80;
        break;
      case "right":
        x = -80;
        break;
      case "none":
        break;
    }

    gsap.fromTo(
      container.current,
      { 
        autoAlpha: 0, 
        x, 
        y 
      },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: 1.2,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%", // Animation starts when top of element hits 85% of viewport height
          toggleActions: "play none none none", // Play once
        },
      }
    );
  }, { scope: container });

  return (
    <section
      id={id}
      ref={container}
      className={cn("scroll-mt-32 opacity-0", className)} // Initially hidden
    >
      {children}
    </section>
  );
}
