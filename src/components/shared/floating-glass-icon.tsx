import { cn } from "@/lib/utils";
import React from "react";

interface FloatingGlassIconProps {
  icon: React.ReactNode;
  className?: string;
  href?: string;
}

export function FloatingGlassIcon({ icon, className, href }: FloatingGlassIconProps) {
  const content = (
    <div
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-full",
        "bg-white/70 backdrop-blur-md border border-border-custom",
        "shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-text-primary hover:bg-white hover:text-accent-monochrome hover:scale-110 transition-all duration-300",
        className
      )}
    >
      {icon}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
