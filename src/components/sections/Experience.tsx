"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "0 20px 0" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        style={{ borderBottom: "1px solid var(--card-border)", padding: "40px 0" }}
      >
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
          03 — Experience
        </p>

        {experiences.map((exp, i) => (
          <motion.div
            key={`${exp.company}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.35 }}
            style={{
              paddingBottom: "32px",
              paddingTop: i > 0 ? "32px" : "0",
              borderBottom:
                i < experiences.length - 1
                  ? "1px solid var(--card-border)"
                  : "none",
            }}
          >
            {/* Period in mono */}
            <p
              style={{
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: "10px",
                letterSpacing: "0.1em",
                color: "var(--text-secondary)",
                marginBottom: "8px",
              }}
            >
              {exp.period}
            </p>

            {/* Role in serif */}
            <h3
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.2,
                marginBottom: "4px",
              }}
            >
              {exp.role}
            </h3>

            {/* Company in red mono */}
            <p
              style={{
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: "11px",
                letterSpacing: "0.08em",
                color: "var(--accent-red)",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              {exp.company}
            </p>

            {/* Bullets */}
            <ul style={{ paddingLeft: "0", listStyle: "none" }}>
              {exp.bullets.map((bullet, bi) => (
                <li
                  key={bi}
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    marginBottom: bi < exp.bullets.length - 1 ? "8px" : 0,
                    paddingLeft: "16px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "var(--accent-red)",
                      fontFamily: "var(--font-mono), ui-monospace, monospace",
                    }}
                  >
                    →
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
