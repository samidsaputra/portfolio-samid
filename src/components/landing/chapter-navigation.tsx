"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";

const chapters = [
  { id: "chapter-1", label: "01 — Vision" },
  { id: "chapter-2", label: "02 — Origin" },
  { id: "chapter-3", label: "03 — Projects" },
  { id: "chapter-4", label: "04 — Connection" },
];

export function ChapterNavigation() {
  const [activeChapter, setActiveChapter] = useState("chapter-1");
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      // Find the current section
      let current = "chapter-1";
      for (const chapter of chapters) {
        const element = document.getElementById(chapter.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the element is above the middle of the screen
          if (rect.top <= window.innerHeight / 2) {
            current = chapter.id;
          }
        }
      }
      setActiveChapter(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initially

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: 0 });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
      {chapters.map((chapter) => {
        const isActive = activeChapter === chapter.id;
        return (
          <button
            key={chapter.id}
            onClick={() => scrollToChapter(chapter.id)}
            className="group relative flex items-center justify-end w-6 h-6"
            aria-label={`Go to ${chapter.label}`}
          >
            {/* Label tooltip */}
            <span 
              className={cn(
                "absolute right-8 text-xs font-medium uppercase tracking-widest transition-all duration-300 pointer-events-none",
                isActive 
                  ? "opacity-100 text-text-primary translate-x-0" 
                  : "opacity-0 text-text-secondary translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              )}
            >
              {chapter.label}
            </span>
            
            {/* Dot */}
            <div 
              className={cn(
                "rounded-full transition-all duration-300 border",
                isActive 
                  ? "w-3 h-3 bg-white border-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                  : "w-2 h-2 bg-transparent border-white/30 group-hover:bg-white/20 group-hover:border-white/50"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
