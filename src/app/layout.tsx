import type { Metadata } from "next";
import { Inter, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "M Dimas Saputra — Portfolio",
  description:
    "Membangun sistem yang presisi, bukan sekadar jalan. Portfolio website of M Dimas Saputra — fullstack developer.",
  keywords: ["portfolio", "developer", "fullstack", "M Dimas Saputra"],
  authors: [{ name: "M Dimas Saputra" }],
  openGraph: {
    title: "M Dimas Saputra — Portfolio",
    description:
      "Membangun sistem yang presisi, bukan sekadar jalan.",
    type: "website",
  },
};

import { AmbientBackground } from "@/components/landing/ambient-background";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { InteractiveCanvasWrapper } from "@/components/landing/interactive-canvas-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${playfair.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="relative min-h-full flex flex-col overflow-x-hidden bg-background"
        suppressHydrationWarning
      >
        <InteractiveCanvasWrapper />
        <SmoothScrollProvider>
          <AmbientBackground />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
