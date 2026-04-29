"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid var(--card-border)",
        backgroundColor: "var(--card-glass)",
        transition: "padding 300ms, font-size 300ms",
        padding: scrolled ? "10px 20px" : "16px 20px",
      }}
    >
      <span
        style={{
          color: "var(--text-primary)",
          fontWeight: 300,
          fontSize: scrolled ? "16px" : "18px",
          letterSpacing: "0.02em",
          transition: "font-size 300ms",
        }}
      >
        Chirag Dodia
      </span>
    </header>
  );
}
