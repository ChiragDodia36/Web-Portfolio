"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 2,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled ? "var(--bg)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--card-border)" : "1px solid transparent",
        transition: "background-color 300ms, border-color 300ms",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontSize: "11px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--text-primary)",
          fontWeight: 500,
        }}
      >
        Chirag Dodia
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontSize: "10px",
          letterSpacing: "0.1em",
          color: "var(--text-secondary)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "var(--accent-lime)",
            display: "inline-block",
          }}
        />
        available
      </span>
    </header>
  );
}
