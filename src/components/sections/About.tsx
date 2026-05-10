"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" style={{ padding: "0 20px 0" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        style={{
          borderBottom: "1px solid var(--card-border)",
          padding: "40px 0",
        }}
      >
        {/* Section label */}
        <p
          style={{
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: "10px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            marginBottom: "28px",
          }}
        >
          00 — About
        </p>

        {/* Photo + name row */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "4px",
              overflow: "hidden",
              flexShrink: 0,
              border: "1px solid var(--card-border)",
            }}
          >
            <Image
              src="/photo.jpg"
              alt="Chirag Dodia"
              width={64}
              height={64}
              style={{ objectFit: "cover", width: "100%", height: "100%", filter: "grayscale(20%)" }}
            />
          </div>
          <div>
            <h2
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.1,
                marginBottom: "4px",
              }}
            >
              Chirag Dodia
            </h2>
            <p
              style={{
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: "10px",
                letterSpacing: "0.08em",
                color: "var(--accent-red)",
                textTransform: "uppercase",
              }}
            >
              Mobile Developer
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <p style={{ color: "var(--text-secondary)", marginBottom: "14px", lineHeight: 1.75, fontSize: "15px" }}>
            Hey, I&apos;m Chirag — a mobile developer doing my MS in Computer Science at Indiana University.
            I build native iOS apps in SwiftUI, Android apps in Jetpack Compose, and cross-platform apps in Flutter and React Native.
          </p>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, fontSize: "15px" }}>
            When I&apos;m not shipping features, I&apos;m probably watching F1, playing cricket, or debugging
            something that definitely should have worked the first time.
          </p>

          {/* Mono tags */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "24px" }}>
            {["Indiana University", "GPA 3.65", "MS CS 2026"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  padding: "4px 10px",
                  border: "1px solid var(--card-border)",
                  borderRadius: "3px",
                  color: "var(--text-secondary)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
