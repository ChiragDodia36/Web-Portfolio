"use client";

/**
 * MobileLayout — simplified 2D layout for screens < 768px.
 * No 3D canvas (performance), standard vertical scroll.
 */

import { HeroOverlay } from "@/components/hero/HeroOverlay";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export function MobileLayout() {
  return (
    <div className="bg-black min-h-screen overflow-y-auto text-white">
      {/* Hero */}
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Gradient background mimicking the 3D scene */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(136,170,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(191,90,242,0.06) 0%, transparent 60%)",
          }}
        />
        <HeroOverlay />
      </div>

      {/* Sections */}
      <div className="pt-8">
        <About />
        <div className="h-8" />
        <Skills />
        <div className="h-8" />
        <Projects />
        <div className="h-8" />
        <Experience />
        <div className="h-8" />
        <Contact />
        <div className="h-20" />
      </div>
    </div>
  );
}
