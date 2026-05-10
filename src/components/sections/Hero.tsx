"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FULL_NAME = "Chirag Dodia";

export default function Hero() {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(FULL_NAME.slice(0, i + 1));
      i++;
      if (i >= FULL_NAME.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 20px 100px",
        borderBottom: "1px solid var(--card-border)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Mono label */}
        <p
          style={{
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: "10px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            marginBottom: "20px",
          }}
        >
          Portfolio — 2026
        </p>

        {/* Big serif name */}
        <h1
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "clamp(48px, 14vw, 72px)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: "20px",
            minHeight: "88px",
          }}
        >
          {displayed}
          <span
            style={{
              borderRight: "3px solid var(--accent-violet)",
              marginLeft: "3px",
              animation: "blink 1s step-end infinite",
            }}
          />
        </h1>

        {/* Italic red role */}
        <p
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "22px",
            fontStyle: "italic",
            color: "var(--accent-red)",
            marginBottom: "24px",
            fontWeight: 400,
          }}
        >
          Mobile Developer
        </p>

        {/* Divider */}
        <div
          style={{
            width: "40px",
            height: "2px",
            backgroundColor: "var(--card-border)",
            marginBottom: "24px",
          }}
        />

        {/* Bio */}
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "15px",
            lineHeight: 1.7,
            maxWidth: "340px",
            marginBottom: "32px",
          }}
        >
          iOS · Android · Cross-Platform. MS CS at Indiana University.
          Building fast, polished apps with native performance.
        </p>

        {/* Mono metadata row */}
        <div
          style={{
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: "var(--text-secondary)",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "36px",
          }}
        >
          <span>Swift · Kotlin · Flutter</span>
          <span style={{ color: "var(--card-border)" }}>·</span>
          <span>Bloomington, IN</span>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
        >
          <button
            onClick={() => scrollTo("projects")}
            style={{
              backgroundColor: "var(--text-primary)",
              color: "var(--bg)",
              border: "none",
              borderRadius: "4px",
              padding: "12px 24px",
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            View Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            style={{
              backgroundColor: "transparent",
              color: "var(--text-primary)",
              border: "1px solid var(--card-border-strong)",
              borderRadius: "4px",
              padding: "12px 24px",
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Contact
          </button>
        </motion.div>
      </motion.div>

      <style>{`@keyframes blink { 50% { border-color: transparent; } }`}</style>
    </section>
  );
}
