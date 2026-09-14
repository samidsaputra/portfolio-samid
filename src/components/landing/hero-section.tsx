"use client";

import { motion } from "framer-motion";
import { PillButton } from "@/components/shared/pill-button";
import { FloatingGlassIcon } from "@/components/shared/floating-glass-icon";
import { LinkedInIcon, GitHubIcon } from "@/components/shared/icons";

interface HeroSectionProps {
  fullName: string;
  tagline: string;
  photoUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemReveal = {
  hidden: { y: 40, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export function HeroSection({ fullName, tagline, photoUrl, linkedinUrl, githubUrl }: HeroSectionProps) {
  const nameParts = fullName.split(" ");
  const firstName = nameParts.slice(0, -1).join(" ");
  const lastName = nameParts[nameParts.length - 1];

  return (
    <section id="home" className="pt-32 pb-20 min-h-[90vh] flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Typography & CTA */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="lg:col-span-5 flex flex-col items-start gap-6 order-2 lg:order-1"
        >
          <motion.p variants={itemReveal} className="text-xl md:text-2xl text-text-secondary font-medium">
            Hey there, I'm
          </motion.p>
          <motion.h1 variants={itemReveal} className="flex flex-col gap-1">
            <span className="font-black text-text-primary">{firstName}</span>
            <span className="font-semibold text-text-secondary">{lastName}</span>
          </motion.h1>
          <motion.p variants={itemReveal} className="text-lg md:text-xl text-text-secondary leading-relaxed mt-4 max-w-md">
            {tagline}
          </motion.p>
          <motion.div variants={itemReveal} className="mt-6">
            <PillButton asAnchor href="#connect">
              Let's Connect
            </PillButton>
          </motion.div>
        </motion.div>

        {/* Center Column: Photo */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
          className="lg:col-span-4 flex justify-center order-1 lg:order-2 relative z-10"
        >
          <div className="relative w-full max-w-[360px] aspect-[4/5] nova-card p-4 overflow-visible">
            <div className="w-full h-full rounded-[24px] bg-secondary/50 overflow-hidden relative">
              {photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoUrl} alt={fullName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center text-text-tertiary">
                  Profile Photo
                </div>
              )}
            </div>
            
            {/* Floating Social Icons */}
            {linkedinUrl && (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", delay: 0.6 }}
                className="absolute -right-4 top-1/4"
              >
                <FloatingGlassIcon href={linkedinUrl} icon={<LinkedInIcon size={20} />} />
              </motion.div>
            )}
            {githubUrl && (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", delay: 0.7 }}
                className="absolute -right-4 bottom-1/3"
              >
                <FloatingGlassIcon href={githubUrl} icon={<GitHubIcon size={20} />} />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Right Column: Mini Stats/Tags */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="lg:col-span-3 hidden lg:flex flex-col justify-end h-full pb-12 order-3"
        >
          <div className="flex flex-col gap-2">
            <span className="text-text-primary font-bold text-lg">Fullstack Developer</span>
            <span className="text-text-secondary text-sm">Turning ideas into intuitive experiences.</span>
            <div className="flex items-center gap-2 mt-4">
               <span className="status-dot" />
               <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Available for work</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
