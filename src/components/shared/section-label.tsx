import { cn } from "@/lib/utils";

interface SectionLabelProps {
  /** The label text (e.g., "about", "projects") — will be prefixed with // */
  label: string;
  className?: string;
}

export function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <div className={cn("section-label mb-8", className)}>
      {"// "}
      {label}
    </div>
  );
}
