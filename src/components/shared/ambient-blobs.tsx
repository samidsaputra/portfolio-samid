"use client";

export function AmbientBlobs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#FAFAFA]"
    >
      {/* 1. Subtle moving grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_20%,transparent_100%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #8B5CF6 1px, transparent 1px),
            linear-gradient(to bottom, #8B5CF6 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          animation: "grid-move 20s linear infinite",
        }}
      />

      {/* 2. Large ambient glowing orbs */}
      <div className="absolute inset-0 z-10 opacity-60 mix-blend-multiply">
        {/* Blob 1 — Top Left — Violet */}
        <div
          className="absolute -top-[10%] -left-[10%] h-[50vw] w-[50vw] max-h-[800px] max-w-[800px] rounded-full blur-[100px] sm:blur-[140px] motion-safe:animate-[blob-spin_35s_ease-in-out_infinite]"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0) 70%)",
            transformOrigin: "center center",
          }}
        />

        {/* Blob 2 — Top Right — Blue */}
        <div
          className="absolute -top-[5%] -right-[10%] h-[40vw] w-[40vw] max-h-[600px] max-w-[600px] rounded-full blur-[90px] sm:blur-[120px] motion-safe:animate-[blob-spin_40s_ease-in-out_infinite_reverse]"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)",
            transformOrigin: "40% 60%",
          }}
        />

        {/* Blob 3 — Center — Indigo */}
        <div
          className="absolute top-[30%] left-[20%] h-[60vw] w-[60vw] max-h-[900px] max-w-[900px] rounded-full blur-[120px] sm:blur-[160px] motion-safe:animate-[drift-1_30s_ease-in-out_infinite]"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(99, 102, 241, 0) 70%)",
          }}
        />
        
        {/* Blob 4 - Bottom Right - Cyan/Blue */}
        <div
          className="absolute bottom-[-10%] right-[-5%] h-[45vw] w-[45vw] max-h-[700px] max-w-[700px] rounded-full blur-[100px] sm:blur-[130px] motion-safe:animate-[drift-2_35s_ease-in-out_infinite]"
          style={{
            background: "radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, rgba(147, 197, 253, 0) 70%)",
          }}
        />
      </div>

      {/* 3. Subtle Noise Texture Overlay (grain) */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.25] mix-blend-overlay z-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
