"use client";

import { motion } from "motion/react";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

function MobileHero() {
  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "0 24px",
        background: "#0f1923",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(255,70,84,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: 360,
          padding: "32px 24px",
          background: "rgba(15,25,35,0.9)",
          border: "1px solid rgba(255,70,84,0.2)",
          borderTop: "2px solid #FF4654",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* Corner brackets */}
        {[
          { top: -1, left: -1, borderTop: "2px solid #1eb2a6", borderLeft: "2px solid #1eb2a6" },
          { top: -1, right: -1, borderTop: "2px solid #1eb2a6", borderRight: "2px solid #1eb2a6" },
          { bottom: -1, left: -1, borderBottom: "2px solid #1eb2a6", borderLeft: "2px solid #1eb2a6" },
          { bottom: -1, right: -1, borderBottom: "2px solid #1eb2a6", borderRight: "2px solid #1eb2a6" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 12, height: 12, ...s }} />
        ))}

        <div
          style={{
            fontSize: 8,
            letterSpacing: "0.3em",
            color: "rgba(255,70,84,0.5)",
            marginBottom: 16,
          }}
        >
          PORTFOLIO // TACTICAL ENGINEER
        </div>

        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "#ece8e1",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          CHIRAG DODIA
        </h1>

        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "#FF4654",
            marginTop: 8,
            marginBottom: 4,
          }}
        >
          Mobile & Full-Stack Engineer
        </p>

        <p
          style={{
            fontSize: 9,
            letterSpacing: "0.12em",
            color: "rgba(236,232,225,0.3)",
            marginBottom: 24,
          }}
        >
          MS CS · Indiana University Bloomington
        </p>

        <motion.a
          href="#about"
          whileTap={{ scale: 0.96 }}
          style={{
            display: "inline-block",
            padding: "10px 28px",
            background: "rgba(255,70,84,0.1)",
            border: "1px solid rgba(255,70,84,0.4)",
            color: "#FF4654",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textDecoration: "none",
            fontFamily: "inherit",
          }}
        >
          VIEW INTEL ↓
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: 28,
          fontSize: 9,
          color: "rgba(255,70,84,0.3)",
          letterSpacing: "0.2em",
        }}
      >
        SCROLL ↓
      </motion.div>
    </div>
  );
}

export function MobileLayout() {
  return (
    <div
      style={{
        background: "#0f1923",
        minHeight: "100svh",
        overflowY: "auto",
        color: "#ece8e1",
        fontFamily: "'Rajdhani', system-ui, sans-serif",
      }}
    >
      <MobileHero />

      <div id="about" style={{ paddingTop: 8 }}>
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <div style={{ height: 48 }} />
      </div>
    </div>
  );
}
