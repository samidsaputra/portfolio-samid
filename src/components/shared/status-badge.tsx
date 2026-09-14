import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  /** Status text (e.g., "building_things") */
  text: string;
  /** Show the pulsing green dot */
  active?: boolean;
  className?: string;
}

export function StatusBadge({
  text,
  active = true,
  className,
}: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full",
        "bg-white/60 backdrop-blur-md border border-border-custom",
        "font-mono text-xs tracking-wide text-text-secondary",
        className
      )}
    >
      {active && <span className="status-dot" />}
      <span>
        state: <span className="text-text-primary font-medium">{text}</span>
      </span>
    </div>
  );
}
