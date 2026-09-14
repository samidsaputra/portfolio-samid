import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface GradientButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  asChild?: boolean;
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};

export function GradientButton({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: GradientButtonProps) {
  if (variant === "primary") {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold text-white rounded-xl",
          "gradient-primary",
          "shadow-[0_4px_16px_-4px_rgba(139,92,246,0.4)]",
          "hover:shadow-[0_8px_24px_-4px_rgba(139,92,246,0.5)] hover:-translate-y-0.5",
          "active:translate-y-0 active:shadow-[0_2px_8px_-2px_rgba(139,92,246,0.3)]",
          "transition-all duration-300 ease-out",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet",
          "disabled:opacity-50 disabled:pointer-events-none",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-xl",
          "border border-violet bg-white/50 text-violet",
          "backdrop-blur-md",
          "hover:bg-violet-muted hover:border-violet-light",
          "active:bg-violet-muted/80",
          "transition-all duration-300 ease-out",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet",
          "disabled:opacity-50 disabled:pointer-events-none",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }

  // ghost
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded-xl",
        "text-text-secondary bg-transparent",
        "hover:text-violet hover:bg-violet-muted",
        "active:bg-violet-muted/80",
        "transition-all duration-300 ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet",
        "disabled:opacity-50 disabled:pointer-events-none",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
