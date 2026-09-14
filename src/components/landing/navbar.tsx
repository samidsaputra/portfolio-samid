"use client";

import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState, useRef } from "react";
import { PillButton } from "@/components/shared/pill-button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial load animation for header
    gsap.fromTo(
      headerRef.current,
      { y: -100 },
      { y: 0, duration: 1, ease: "power3.out" }
    );
  }, { scope: headerRef });

  useEffect(() => {
    // Mobile menu animation
    if (isMobileOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else if (!isMobileOpen && mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [isMobileOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
            window.history.replaceState(null, "", `#${id}`);
          }
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.slice(1);
      // Lenis will handle the actual smooth scroll if we use lenis.scrollTo
      // but this navbar is currently just using native scrollIntoView or letting chapter navigation handle it.
      // Wait, we updated chapter-navigation to use Lenis, so we should dispatch a custom event or let standard hash link work.
      // For now, native scrollIntoView works fine as Lenis intercepts it if configured to smoothWheel: true and smoothTouch: false.
      // Actually, lenis hooks into native scroll!
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
        setIsMobileOpen(false);
      }
    },
    []
  );

  return (
    <header 
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-colors duration-300",
        isScrolled ? "bg-black/40 backdrop-blur-xl shadow-sm py-4 border-b border-white/5" : "bg-transparent py-6"
      )}
    >
      <nav className="w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center gap-3 shrink-0 group"
        >
          {/* Mock abstract logo icon */}
          <div className="w-8 h-8 bg-accent-monochrome rounded-full rounded-tr-none flex items-center justify-center text-accent-dark font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
            M
          </div>
          <span className="text-xl font-heading font-semibold tracking-tight text-text-primary flex items-center gap-1">
            M Dimas<span className="text-text-tertiary font-medium">Saputra</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/5 px-2 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 block",
                    isActive
                      ? "bg-accent-monochrome text-accent-dark shadow-sm"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <PillButton asAnchor href="#connect">
            Contact Now
          </PillButton>
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-text-primary"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={cn(
          "md:hidden overflow-hidden bg-surface border-border-custom shadow-lg",
          isMobileOpen ? "border-b" : "border-none"
        )}
        style={{ height: 0, opacity: 0 }}
      >
        <ul className="flex flex-col px-6 py-6 gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "block text-lg font-medium transition-colors",
                  activeSection === item.href.slice(1)
                    ? "text-primary"
                    : "text-text-secondary"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-4 border-t border-border-custom">
             <PillButton asAnchor href="#connect" className="w-full justify-center">
               Contact Now
             </PillButton>
          </li>
        </ul>
      </div>
    </header>
  );
}
