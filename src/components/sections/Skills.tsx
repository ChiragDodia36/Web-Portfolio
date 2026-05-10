"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="skills" style={{ padding: "0 20px 0" }}>
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
          01 — Skills
        </p>

        {skillCategories.map(({ category, skills }, ci) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.07, duration: 0.3 }}
            style={{
              marginBottom: ci < skillCategories.length - 1 ? "24px" : 0,
              paddingBottom: ci < skillCategories.length - 1 ? "24px" : 0,
              borderBottom:
                ci < skillCategories.length - 1
                  ? "1px solid var(--card-border)"
                  : "none",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: "9px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--accent-red)",
                marginBottom: "12px",
                fontWeight: 500,
              }}
            >
              {category}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {skills.map((skill) => {
                const isHovered = hovered === skill;
                return (
                  <span
                    key={skill}
                    onPointerEnter={() => setHovered(skill)}
                    onPointerLeave={() => setHovered(null)}
                    style={{
                      fontFamily: "var(--font-mono), ui-monospace, monospace",
                      fontSize: "11px",
                      padding: "5px 12px",
                      borderRadius: "3px",
                      border: `1px solid ${
                        isHovered
                          ? "var(--card-border-strong)"
                          : "var(--card-border)"
                      }`,
                      backgroundColor: isHovered
                        ? "var(--text-primary)"
                        : "transparent",
                      color: isHovered ? "var(--bg)" : "var(--text-primary)",
                      transition: "all 200ms",
                      cursor: "default",
                      userSelect: "none",
                    }}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
