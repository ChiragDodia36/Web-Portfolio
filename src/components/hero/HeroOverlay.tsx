"use client";

import { motion } from "motion/react";
import { zoneControl } from "@/lib/zone-control";

// Omen eye SVG icon
function OmenEye({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 0.7)} viewBox="0 0 48 34" fill="none">
      <ellipse cx="24" cy="17" rx="22" ry="14" stroke="#1CC7D3" strokeWidth="1.8" />
      <ellipse cx="24" cy="17" rx="14" ry="9" stroke="#1CC7D3" strokeWidth="1" opacity="0.5" />
      <circle cx="24" cy="17" r="6" fill="#1CC7D3" opacity="0.9" />
      <circle cx="24" cy="17" r="3" fill="#0f1923" />
      {/* Glow lines */}
      <line x1="2" y1="17" x2="10" y2="17" stroke="#1CC7D3" strokeWidth="1" opacity="0.4" />
      <line x1="38" y1="17" x2="46" y2="17" stroke="#1CC7D3" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

// WASD key hint
function WASDHints() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ display: "flex", gap: 4 }}>
        {["", "W", ""].map((k, i) =>
          k ? (
            <KeyCap key={i} label={k} />
          ) : (
            <div key={i} style={{ width: 24 }} />
          )
        )}
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        <KeyCap label="A" />
        <KeyCap label="S" />
        <KeyCap label="D" />
      </div>
      <span style={{ fontSize: 9, color: "rgba(155,100,221,0.4)", letterSpacing: "0.15em", marginTop: 4 }}>
        NAVIGATE // DRAG TO LOOK
      </span>
    </div>
  );
}

function KeyCap({ label }: { label: string }) {
  return (
    <div
      style={{
        width: 24,
        height: 24,
        border: "1px solid rgba(124,47,190,0.5)",
        background: "rgba(13,5,24,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        fontWeight: 700,
        color: "#9D4EDD",
        letterSpacing: 0,
        borderRadius: 2,
      }}
    >
      {label}
    </div>
  );
}

export function HeroOverlay() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        pointerEvents: "none",
        position: "relative",
      }}
    >
      {/* Central Omen Protocol card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        style={{
          padding: "36px 48px",
          background: "rgba(15, 25, 35, 0.85)",
          border: "1px solid rgba(124, 47, 190, 0.4)",
          borderTop: "2px solid #7B2FBE",
          boxShadow: "0 0 48px rgba(123,47,190,0.25), 0 16px 48px rgba(0,0,0,0.7)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          maxWidth: 400,
          width: "90vw",
          position: "relative",
        }}
      >
        {/* Corner brackets */}
        <div style={{
          position: "absolute", top: -1, left: -1, width: 16, height: 16,
          borderTop: "2px solid #1CC7D3", borderLeft: "2px solid #1CC7D3",
        }} />
        <div style={{
          position: "absolute", top: -1, right: -1, width: 16, height: 16,
          borderTop: "2px solid #1CC7D3", borderRight: "2px solid #1CC7D3",
        }} />
        <div style={{
          position: "absolute", bottom: -1, left: -1, width: 16, height: 16,
          borderBottom: "2px solid #1CC7D3", borderLeft: "2px solid #1CC7D3",
        }} />
        <div style={{
          position: "absolute", bottom: -1, right: -1, width: 16, height: 16,
          borderBottom: "2px solid #1CC7D3", borderRight: "2px solid #1CC7D3",
        }} />

        {/* Protocol label */}
        <span style={{
          fontSize: 9, letterSpacing: "0.3em", color: "rgba(28,199,211,0.6)",
          textTransform: "uppercase",
        }}>
          TACTICAL PROTOCOL — INITIATING
        </span>

        {/* Omen eye */}
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <OmenEye size={52} />
        </motion.div>

        {/* Name */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(220, 200, 255, 0.95)",
            margin: 0,
            lineHeight: 1.1,
          }}>
            Chirag Dodia
          </h1>
          <p style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#9D4EDD",
            marginTop: 6,
          }}>
            Full Stack Developer // Tactical Engineer
          </p>
          <p style={{
            fontSize: 9,
            letterSpacing: "0.15em",
            color: "rgba(155,100,221,0.4)",
            marginTop: 4,
          }}>
            MS CS · Indiana University Bloomington
          </p>
        </div>

        {/* CTA */}
        <motion.button
          onClick={() => zoneControl.flyTo(1)}
          whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(123,47,190,0.5)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            pointerEvents: "auto",
            marginTop: 8,
            padding: "10px 28px",
            background: "rgba(123,47,190,0.25)",
            border: "1px solid rgba(157,78,221,0.5)",
            color: "#C77DFF",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: 0,
            fontFamily: "inherit",
            transition: "background 200ms",
          }}
        >
          Enter the Map
        </motion.button>
      </motion.div>

      {/* WASD hints at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          position: "absolute",
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          pointerEvents: "none",
        }}
      >
        <WASDHints />
      </motion.div>
    </div>
  );
}
