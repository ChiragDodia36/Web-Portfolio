"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" style={{ padding: "0 20px 40px" }}>
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
          About
        </p>
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginBottom: "20px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              border: "2px solid var(--card-border)",
            }}
          >
            <Image
              src="/photo.jpg"
              alt="Chirag Dodia"
              width={72}
              height={72}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 400,
                color: "var(--text-primary)",
                marginBottom: "4px",
              }}
            >
              Chirag Dodia
            </h2>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              Software Developer
            </p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <p style={{ color: "var(--text-secondary)", marginBottom: "12px" }}>
            Hey, I'm Chirag — a software developer who loves building things that feel great to use. I work across the full stack, with a soft spot for clean UIs and fast backends.
          </p>
          <p style={{ color: "var(--text-secondary)" }}>
            When I'm not coding, I'm probably playing cricket, watching F1, or debugging something that definitely should have worked the first time.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
