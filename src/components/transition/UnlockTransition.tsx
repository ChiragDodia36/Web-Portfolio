"use client";

import { useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UnlockTransitionProps {
  children: ReactNode;
}

export function UnlockTransition({ children }: UnlockTransitionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [unlocked, setUnlocked] = useState(false);

  useGSAP(() => {
    if (!heroRef.current) return;

    // As the desktop scrolls up over the lock screen,
    // fade, scale down, and blur the hero for the "unlock" feel
    ScrollTrigger.create({
      trigger: "#desktop-area",
      start: "top bottom",
      end: "top 20%",
      scrub: 0.3,
      onUpdate: (self) => {
        if (!heroRef.current) return;
        const p = self.progress;
        heroRef.current.style.opacity = `${1 - p * 0.7}`;
        heroRef.current.style.transform = `scale(${1 - p * 0.05})`;
        heroRef.current.style.filter = `blur(${p * 8}px)`;
      },
      onLeave: () => setUnlocked(true),
      onEnterBack: () => setUnlocked(false),
    });
  }, []);

  return (
    <>
      {/* Fixed lock screen — stays behind everything */}
      <div
        ref={heroRef}
        className={`fixed inset-0 z-0 ${unlocked ? "invisible" : ""}`}
      >
        {children}
      </div>

      {/* Scroll spacer — hero shows through this transparent area */}
      <div className="h-screen relative z-0" aria-hidden="true" />
    </>
  );
}
