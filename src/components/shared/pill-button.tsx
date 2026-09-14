import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asAnchor?: boolean;
  href?: string;
  className?: string;
}

export function PillButton({ children, asAnchor, href, className, ...props }: PillButtonProps) {
  const content = (
    <>
      <span className="font-semibold">{children}</span>
      <div className="w-8 h-8 rounded-full bg-black/10 text-accent-dark flex items-center justify-center group-hover:bg-black group-hover:text-accent-monochrome transition-colors">
        <ArrowRight size={16} strokeWidth={2.5} />
      </div>
    </>
  );

  const buttonClasses = cn(
    "group inline-flex items-center gap-4 rounded-full pl-6 pr-2 py-2 transition-all duration-300",
    "bg-accent-monochrome text-accent-dark shadow-md border border-white/10",
    "hover:scale-105 hover:shadow-lg hover:shadow-white/5",
    className
  );

  if (asAnchor && href) {
    return (
      <a href={href} className={buttonClasses}>
        {content}
      </a>
    );
  }

  return (
    <button className={buttonClasses} {...props}>
      {content}
    </button>
  );
}
