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
      }}
    >
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ padding: "32px 24px" }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            marginBottom: "12px",
          }}
        >
          Portfolio
        </p>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: 300,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            minHeight: "44px",
            marginBottom: "8px",
          }}
        >
          {displayed}
          <span
            style={{
              borderRight: "2px solid var(--accent-indigo)",
              marginLeft: "2px",
              animation: "blink 1s step-end infinite",
            }}
          />
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "var(--accent-indigo)",
            fontWeight: 400,
            marginBottom: "16px",
          }}
        >
          Software Developer
        </p>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "28px",
            maxWidth: "320px",
          }}
        >
          Building clean, performant apps — mobile, web, and everything in between.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
        >
          <button
            onClick={() => scrollTo("projects")}
            style={{
              backgroundColor: "var(--accent-indigo)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "12px 24px",
              fontSize: "15px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo("contact")}
            style={{
              backgroundColor: "transparent",
              color: "var(--accent-indigo)",
              border: "1.5px solid var(--accent-indigo)",
              borderRadius: "12px",
              padding: "12px 24px",
              fontSize: "15px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Contact Me
          </button>
        </motion.div>
      </motion.div>
      <style>{`@keyframes blink { 50% { border-color: transparent; } }`}</style>
    </section>
  );
}
