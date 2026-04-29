"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="skills" style={{ padding: "0 20px 40px" }}>
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        style={{ padding: "28px 24px" }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            marginBottom: "20px",
          }}
        >
          Skills
        </p>
        {skillCategories.map(({ category, skills }, ci) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.08, duration: 0.3 }}
            style={{ marginBottom: ci < skillCategories.length - 1 ? "20px" : 0 }}
          >
            <p
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "var(--text-secondary)",
                marginBottom: "10px",
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
                      padding: "6px 14px",
                      borderRadius: "100px",
                      fontSize: "13px",
                      backgroundColor: isHovered
                        ? "var(--accent-amber)"
                        : "var(--card-border)",
                      color: isHovered ? "#1D1D1F" : "var(--text-primary)",
                      border: "1px solid var(--card-border)",
                      transition: "background-color 200ms, color 200ms",
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
