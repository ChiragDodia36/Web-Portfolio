"use client";

import { useEffect, useState } from "react";
import { zoneControl } from "@/lib/zone-control";

const ZONE_NAMES = [
  "SPAWN",
  "LORE",
  "LOADOUT",
  "CONTRACTS",
  "HISTORY",
  "COMMS",
];

const ABILITIES = ["Q", "E", "C", "X"];

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

// Valorant V crosshair logo
function ValorantLogo() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
      <path d="M1 1 L8 13 L15 1" stroke="#FF4654" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 1 L8 7.5" stroke="#FF4654" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <path d="M12 1 L8 7.5" stroke="#FF4654" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function OmenHUD() {
  const [zone, setZone] = useState(0);

  useEffect(() => {
    return zoneControl.onZoneChange((z) => setZone(z));
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        background: "rgba(15, 25, 35, 0.94)",
        borderBottom: "1px solid rgba(255, 70, 84, 0.25)",
        backdropFilter: "blur(20px)",
        zIndex: 100,
        fontFamily: "inherit",
        userSelect: "none",
      }}
    >
      {/* Left — Portfolio branding */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <ValorantLogo />
        <button
          onClick={() => zoneControl.flyTo(0)}
          title="Return to home"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "rgba(236,232,225,0.85)",
            fontFamily: "inherit",
            transition: "color 150ms",
          }}
          onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.color = "#fff")}
          onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.color = "rgba(236,232,225,0.85)")}
        >
          CHIRAG DODIA
        </button>
        <span style={{ fontSize: 11, color: "rgba(255,70,84,0.35)" }}>{"//"}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#FF4654", letterSpacing: "0.1em" }}>
          PORTFOLIO
        </span>
      </div>

      {/* Center — Current zone */}
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,70,84,0.45)" }}>SITE //</span>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#FF4654" }}>
          {ZONE_NAMES[zone]}
        </span>
      </div>

      {/* Right — Keybinds + clock */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {ABILITIES.map((key) => (
          <span
            key={key}
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "rgba(255,70,84,0.6)",
              border: "1px solid rgba(255,70,84,0.25)",
              padding: "1px 5px",
              borderRadius: 2,
            }}
          >
            {key}
          </span>
        ))}
        <span style={{ fontSize: 11, color: "rgba(236,232,225,0.4)", marginLeft: 6 }}>
          <Clock />
        </span>
      </div>

      {/* Red scanline accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,70,84,0.5), transparent)",
        }}
      />
    </div>
  );
}
