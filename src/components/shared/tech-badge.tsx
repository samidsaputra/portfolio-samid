import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  iconUrl?: string;
  className?: string;
}

export function TechBadge({ name, iconUrl, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full",
        "bg-white/60 backdrop-blur-md",
        "border border-border-custom text-sm text-text-secondary font-medium",
        "hover:border-violet hover:text-violet",
        "transition-all duration-200 ease-out",
        className
      )}
    >
      {iconUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={iconUrl} alt={name} className="w-4 h-4 object-contain" />
      )}
      {name}
    </span>
  );
}
