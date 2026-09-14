"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { PillButton } from "@/components/shared/pill-button";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  certificate_url: string | null;
  image_url: string | null;
  display_order: number;
}

interface CertificatesSectionProps {
  certificates: Certificate[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const sorted = [...certificates].sort(
    (a, b) => a.display_order - b.display_order
  );

  return (
    <section id="certificates" className="scroll-mt-32 pt-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <h2 className="text-4xl font-bold tracking-tight">Certifications</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sorted.map((cert, index) => (
          <AnimatedSection key={cert.id} direction="up" delay={index * 0.1}>
            <div className="nova-card p-6 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-[16px] bg-secondary flex items-center justify-center text-text-primary font-bold mb-6">
                {cert.issuer.charAt(0)}
              </div>
              
              <h3 className="text-xl font-bold tracking-tight mb-2 leading-snug">
                {cert.title}
              </h3>
              
              <div className="flex flex-col gap-1 mb-8">
                <span className="text-sm font-medium text-text-secondary">
                  {cert.issuer}
                </span>
                <span className="text-xs font-semibold text-text-tertiary">
                  {formatDate(cert.issue_date)}
                </span>
              </div>

              <div className="mt-auto">
                {cert.certificate_url ? (
                   <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:text-text-tertiary transition-colors inline-flex items-center gap-2 group">
                     View Certificate
                     <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   </a>
                ) : (
                  <span className="text-xs font-semibold text-text-tertiary">
                    Credential Not Public
                  </span>
                )}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
