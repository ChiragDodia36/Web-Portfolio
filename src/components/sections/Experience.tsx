"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "0 20px 40px" }}>
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
          Experience
        </p>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "7px",
              top: 0,
              bottom: 0,
              width: "1px",
              backgroundColor: "var(--card-border)",
            }}
          />
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${i}`}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.35 }}
              style={{
                paddingLeft: "28px",
                position: "relative",
                marginBottom: i < experiences.length - 1 ? "28px" : 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "6px",
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-indigo)",
                  border: "2px solid var(--bg)",
                }}
              />
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "4px" }}>
                {exp.period}
              </p>
              <p style={{ fontSize: "16px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "2px" }}>
                {exp.role}
              </p>
              <p style={{ fontSize: "14px", color: "var(--accent-indigo)", marginBottom: "10px" }}>
                {exp.company}
              </p>
              <ul style={{ paddingLeft: "16px" }}>
                {exp.bullets.map((bullet, bi) => (
                  <li
                    key={bi}
                    style={{
                      fontSize: "13px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: bi < exp.bullets.length - 1 ? "4px" : 0,
                    }}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
