"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { ambientState } from "@/lib/ambient-state";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function AmbientBackground() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

    useGSAP(() => {
    if (!mounted) return;

    const blobs = gsap.utils.toArray('.ambient-blob');

    const initScrollTriggers = () => {
      // Find all elements with data-ambient-color attribute
      const dynamicTriggers = document.querySelectorAll('[data-ambient-color]');
      
      dynamicTriggers.forEach((el) => {
        const color = el.getAttribute('data-ambient-color');
        if (color) {
          ScrollTrigger.create({
            trigger: el,
            start: 'top center',
            onEnter: () => {
              gsap.to(blobs, { backgroundColor: color, duration: 1.5, ease: "power2.out" });
              gsap.to(ambientState.proxy, {
                color: color,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => {
                  ambientState.color.set(ambientState.proxy.color);
                }
              });
            },
            onEnterBack: () => {
              gsap.to(blobs, { backgroundColor: color, duration: 1.5, ease: "power2.out" });
              gsap.to(ambientState.proxy, {
                color: color,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => {
                  ambientState.color.set(ambientState.proxy.color);
                }
              });
            },
          });
        }
      });
    };

    const timer = setTimeout(initScrollTriggers, 500);

    return () => clearTimeout(timer);
  }, { dependencies: [mounted], scope: container });

  if (!mounted || pathname?.startsWith("/admin")) return null;

  return (
    <div ref={container} className="fixed inset-0 overflow-hidden pointer-events-none z-[2]">
      {/* CSS Blobs — fallback for mobile (hidden when .has-canvas is present) */}
      <div className="css-ambient-fallback">
        <div 
          className="ambient-blob absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob"
          style={{ backgroundColor: '#52525B' }}
        />
        <div 
          className="ambient-blob absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob animation-delay-2000"
          style={{ backgroundColor: '#52525B' }}
        />
        <div 
          className="ambient-blob absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob animation-delay-4000"
          style={{ backgroundColor: '#52525B' }}
        />
      </div>
    </div>
  );
}
