"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BootSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);
  const loadingFillRef = useRef<HTMLDivElement>(null);
  const ghostWindows = useRef<(HTMLDivElement | null)[]>([]);
  const dockRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    // Fade in boot text
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3 }
    );

    // Menu bar slides down
    tl.fromTo(
      menuBarRef.current,
      { opacity: 0, y: -26 },
      { opacity: 1, y: 0, duration: 0.3 },
      0.1
    );

    // Loading bar animates
    tl.fromTo(
      loadingBarRef.current,
      { opacity: 0, scaleX: 0.8 },
      { opacity: 1, scaleX: 1, duration: 0.2 },
      0.2
    );
    tl.fromTo(
      loadingFillRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.4, ease: "power2.inOut" },
      0.25
    );

    // Ghost windows fade in and solidify
    ghostWindows.current.forEach((win, i) => {
      if (!win) return;
      tl.fromTo(
        win,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3 },
        0.3 + i * 0.08
      );
    });

    // Dock rises from bottom
    tl.fromTo(
      dockRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.3 },
      0.5
    );

    // Fade out boot text
    tl.to(textRef.current, { opacity: 0, duration: 0.2 }, 0.6);
    tl.to(loadingBarRef.current, { opacity: 0, duration: 0.2 }, 0.6);
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-[60vh] bg-black relative overflow-hidden"
    >
      {/* Menu bar ghost */}
      <div
        ref={menuBarRef}
        className="absolute top-0 left-0 right-0 h-[26px] bg-[rgba(255,255,255,0.03)] border-b border-[rgba(255,255,255,0.05)] flex items-center px-3.5 gap-4 opacity-0"
      >
        <span className="text-sm text-white/50"></span>
        <span className="text-xs font-semibold text-white/40">Desktop</span>
        <span className="ml-auto text-[11px] text-white/20">Loading...</span>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        {/* Boot text */}
        <div ref={textRef} className="text-center opacity-0">
          <p className="text-xs text-white/30 tracking-widest uppercase mb-2">
            Initializing Desktop Environment
          </p>
        </div>

        {/* Loading bar */}
        <div
          ref={loadingBarRef}
          className="w-48 h-1 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden opacity-0"
        >
          <div
            ref={loadingFillRef}
            className="h-full bg-gradient-to-r from-[#88aaff] to-[#bf5af2] rounded-full origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Ghost windows */}
        <div className="flex gap-4 mt-4">
          {["About", "Skills", "Projects"].map((name, i) => (
            <div
              key={name}
              ref={(el) => { ghostWindows.current[i] = el; }}
              className="w-28 h-20 rounded-[8px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] opacity-0"
            >
              <div className="h-5 flex items-center px-2 bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.03)]">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]/50" />
                </div>
                <span className="flex-1 text-center text-[8px] text-white/20">
                  {name}.app
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dock ghost */}
      <div
        ref={dockRef}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.06)] opacity-0"
      >
        {["#88aaff", "#ff9f0a", "#30d158", "#bf5af2", "#ff453a"].map(
          (color) => (
            <div
              key={color}
              className="w-6 h-6 rounded-md"
              style={{ background: `rgba(${hexToRgb(color)}, 0.1)` }}
            />
          )
        )}
      </div>
    </section>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
