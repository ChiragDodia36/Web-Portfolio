"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Trailing glow follows with spring delay
  const glowX = useSpring(cursorX, { mass: 0.2, stiffness: 100, damping: 14 });
  const glowY = useSpring(cursorY, { mass: 0.2, stiffness: 100, damping: 14 });

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);

    function onMove(e: globalThis.MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if hovering a clickable element
      const target = e.target as HTMLElement;
      const clickable =
        target.closest("a, button, [role='button'], input, textarea, select, [data-clickable]");
      setIsPointer(!!clickable);
    }

    function onDown() {
      setIsClicking(true);
    }
    function onUp() {
      setIsClicking(false);
    }

    function onLeave() {
      setIsVisible(false);
    }
    function onEnter() {
      setIsVisible(true);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main dot cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.7 : isPointer ? 1.6 : 1,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="w-2.5 h-2.5 rounded-full"
          style={{
            background: isPointer
              ? "rgba(136, 170, 255, 0.9)"
              : "rgba(255, 255, 255, 0.85)",
            boxShadow: isPointer
              ? "0 0 12px rgba(136, 170, 255, 0.4)"
              : "0 0 6px rgba(255, 255, 255, 0.15)",
          }}
        />
      </motion.div>

      {/* Trailing glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 2.2 : 1,
            opacity: isPointer ? 0.15 : 0.08,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-8 h-8 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(136, 170, 255, 0.3) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </>
  );
}
