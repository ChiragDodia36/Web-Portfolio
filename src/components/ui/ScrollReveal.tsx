"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "fade";
  stagger?: number;
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = "up",
  stagger = 0,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const fromVars: Record<string, gsap.TweenVars> = {
    up: { opacity: 0, y: 40 },
    left: { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
    fade: { opacity: 0 },
  };

  const toVars: Record<string, gsap.TweenVars> = {
    up: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    fade: { opacity: 1 },
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    if (stagger > 0) {
      // Animate direct children with stagger
      const children = containerRef.current.children;
      gsap.fromTo(children, fromVars[direction], {
        ...toVars[direction],
        duration: 0.6,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    } else {
      gsap.fromTo(containerRef.current, fromVars[direction], {
        ...toVars[direction],
        duration: 0.7,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }
  }, [direction, stagger, delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
