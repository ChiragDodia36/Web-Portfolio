"use client";

/**
 * MacWindow → OmenPanel
 * Valorant tactical panel aesthetic — sharp corners, purple borders, no traffic lights.
 */

import { motion } from "motion/react";
import { type ReactNode } from "react";

interface MacWindowProps {
  title: string;
  children: ReactNode;
  active?: boolean;
  className?: string;
}

export function MacWindow({
  title,
  children,
  active = true,
  className = "",
}: MacWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ borderColor: "rgba(157,78,221,0.5)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        borderRadius: 0,
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
        background: "rgba(5, 2, 15, 0.92)",
        border: "1px solid rgba(124, 47, 190, 0.25)",
        borderTop: "2px solid #7B2FBE",
        borderLeft: "2px solid rgba(124, 47, 190, 0.4)",
        boxShadow: active
          ? "0 0 24px rgba(123,47,190,0.15), 0 8px 32px rgba(0,0,0,0.6)"
          : "0 8px 32px rgba(0,0,0,0.5)",
        backdropFilter: "blur(24px)",
      }}
      className={className}
    >
      {/* Panel Header */}
      <div
        style={{
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          background: "rgba(13, 5, 24, 0.95)",
          borderBottom: "1px solid rgba(124, 47, 190, 0.3)",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#9D4EDD",
            fontFamily: "inherit",
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: 9,
            letterSpacing: "0.08em",
            color: "rgba(155,100,221,0.4)",
          }}
        >
          [X]
        </span>
      </div>

      {/* Panel Body */}
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
