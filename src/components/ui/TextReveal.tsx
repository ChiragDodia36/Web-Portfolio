"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  delay?: number;
  stagger?: number;
  scrub?: boolean;
}

export function TextReveal({
  children,
  className = "",
  as: Tag = "span",
  delay = 0,
  stagger = 0.03,
  scrub = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = children.split(" ");
    const container = containerRef.current;
    container.innerHTML = "";

    words.forEach((word, wi) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      word.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.display = "inline-block";
        charSpan.style.opacity = "0";
        charSpan.style.transform = "translateY(20px)";
        charSpan.className = "char-reveal";
        wordSpan.appendChild(charSpan);
      });

      container.appendChild(wordSpan);

      // Add space between words
      if (wi < words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        space.style.display = "inline-block";
        container.appendChild(space);
      }
    });

    const chars = container.querySelectorAll<HTMLSpanElement>(".char-reveal");

    const animation = gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger,
      delay: scrub ? 0 : delay,
      ease: "power3.out",
      scrollTrigger: scrub
        ? {
            trigger: container,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          }
        : {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
    });

    return () => {
      animation.kill();
    };
  }, [children, delay, stagger, scrub]);

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={className}
    >
      {children}
    </Tag>
  );
}
