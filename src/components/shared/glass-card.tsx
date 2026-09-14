import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Disable the hover lift + glow effect */
  noHover?: boolean;
  /** Additional wrapper classes */
  className?: string;
}

export function GlassCard({
  children,
  noHover = false,
  className,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6",
        noHover && "hover:transform-none hover:shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
