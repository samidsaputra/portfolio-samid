"use client";

import dynamic from "next/dynamic";

const InteractiveCanvas = dynamic(
  () => import("@/components/landing/interactive-canvas"),
  { ssr: false }
);

import { usePathname } from "next/navigation";

export function InteractiveCanvasWrapper() {
  const pathname = usePathname();
  
  if (pathname?.startsWith("/admin")) return null;

  return <InteractiveCanvas />;
}
