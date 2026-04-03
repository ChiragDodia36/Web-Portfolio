"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { zoneControl } from "@/lib/zone-control";

interface TutorialOverlayProps {
  onComplete: () => void;
}

const WASD_KEYS = [
  { key: "W", row: 0, col: 1 },
  { key: "A", row: 1, col: 0 },
  { key: "S", row: 1, col: 1 },
  { key: "D", row: 1, col: 2 },
];

function KeyCap({ label }: { label: string }) {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        background: "rgba(255,70,84,0.12)",
        border: "1px solid rgba(255,70,84,0.4)",
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 700,
        color: "#ece8e1",
        letterSpacing: "0.05em",
      }}
    >
      {label}
    </div>
  );
}

function WASDDiagram() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Row 0: W */}
      <div style={{ display: "flex", gap: 3, justifyContent: "center" }}>
        {WASD_KEYS.filter((k) => k.row === 0).map((k) => (
          <KeyCap key={k.key} label={k.key} />
        ))}
      </div>
      {/* Row 1: A S D */}
      <div style={{ display: "flex", gap: 3 }}>
        {WASD_KEYS.filter((k) => k.row === 1).map((k) => (
          <KeyCap key={k.key} label={k.key} />
        ))}
      </div>
    </div>
  );
}

function TipCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      style={{
        position: "fixed",
        background: "rgba(15,25,35,0.92)",
        border: "1px solid rgba(255,70,84,0.25)",
        borderRadius: 4,
        padding: "16px 20px",
        fontFamily: "'Rajdhani', system-ui, sans-serif",
        maxWidth: 280,
        pointerEvents: "auto",
        ...style,
      }}
    >
      {/* Red top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, #FF4654, rgba(255,70,84,0))",
          borderRadius: "4px 4px 0 0",
        }}
      />
      {children}
    </motion.div>
  );
}

export function TutorialOverlay({ onComplete }: TutorialOverlayProps) {
  const [step, setStep] = useState(1);

  // Step 1 → 2: first WASD/arrow keydown
  useEffect(() => {
    if (step !== 1) return;
    const MOVE_KEYS = new Set([
      "w", "a", "s", "d",
      "arrowup", "arrowdown", "arrowleft", "arrowright",
    ]);
    const handler = (e: KeyboardEvent) => {
      if (MOVE_KEYS.has(e.key.toLowerCase())) setStep(2);
    };
    window.addEventListener("keydown", handler);
    // Auto-advance after 8s
    const t = setTimeout(() => setStep(2), 8000);
    return () => {
      window.removeEventListener("keydown", handler);
      clearTimeout(t);
    };
  }, [step]);

  // Step 2 → 3: any zone change
  useEffect(() => {
    if (step !== 2) return;
    const unsub = zoneControl.onZoneChange(() => setStep(3));
    const t = setTimeout(() => setStep(3), 10000);
    return () => {
      unsub();
      clearTimeout(t);
    };
  }, [step]);

  // Step 3 → complete: visited 2+ non-spawn zones
  useEffect(() => {
    if (step !== 3) return;
    const unsub = zoneControl.onVisitedChange((visited) => {
      const nonSpawn = [...visited].filter((z) => z > 0).length;
      if (nonSpawn >= 1) onComplete();
    });
    const t = setTimeout(onComplete, 10000);
    return () => {
      unsub();
      clearTimeout(t);
    };
  }, [step, onComplete]);

  const label = (text: string) => (
    <div
      style={{
        fontSize: 9,
        letterSpacing: "0.35em",
        color: "#FF4654",
        marginBottom: 8,
      }}
    >
      {text}
    </div>
  );

  const heading = (text: string) => (
    <div
      style={{
        fontSize: 15,
        fontWeight: 700,
        color: "#ece8e1",
        letterSpacing: "0.05em",
        marginBottom: 6,
      }}
    >
      {text}
    </div>
  );

  const sub = (text: string) => (
    <div
      style={{
        fontSize: 11,
        color: "rgba(236,232,225,0.45)",
        letterSpacing: "0.02em",
        lineHeight: 1.5,
      }}
    >
      {text}
    </div>
  );

  return (
    // pointer-events: none on root so world stays interactive
    <div style={{ position: "fixed", inset: 0, zIndex: 100, pointerEvents: "none" }}>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <TipCard
            key="step1"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -30px)", marginTop: 60 }}
          >
            {label("STEP 1 OF 3")}
            {heading("NAVIGATE THE SHADOW REALM")}
            {sub("Use WASD or arrow keys to move through the map")}
            <div style={{ marginTop: 14 }}>
              <WASDDiagram />
            </div>
          </TipCard>
        )}

        {step === 2 && (
          <TipCard
            key="step2"
            style={{ bottom: 140, left: "50%", transform: "translateX(-50%)" }}
          >
            {label("STEP 2 OF 3")}
            {heading("TELEPORT TO ZONES")}
            {sub("Click the ability icons below to instantly fly to any zone")}
            {/* Down arrow pointing to ability bar */}
            <div
              style={{
                textAlign: "center",
                marginTop: 12,
                fontSize: 20,
                color: "#FF4654",
                animation: "tutArrow 1s ease-in-out infinite",
              }}
            >
              ↓
            </div>
            <style>{`
              @keyframes tutArrow {
                0%, 100% { transform: translateY(0); opacity: 1; }
                50% { transform: translateY(4px); opacity: 0.6; }
              }
            `}</style>
          </TipCard>
        )}

        {step === 3 && (
          <TipCard
            key="step3"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          >
            {label("STEP 3 OF 3")}
            {heading("APPROACH GLOWING SITES")}
            {sub(
              "Walk toward the orange beacon pillars to reach a zone and reveal intel"
            )}
            <div
              style={{
                marginTop: 12,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: "#FF6B35",
                  borderRadius: "50%",
                  boxShadow: "0 0 8px #FF6B35",
                  flexShrink: 0,
                  animation: "beaconPulse 1.5s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  fontSize: 10,
                  color: "#FF6B35",
                  letterSpacing: "0.1em",
                }}
              >
                UNVISITED ZONE
              </div>
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: "#1eb2a6",
                  borderRadius: "50%",
                  boxShadow: "0 0 6px #1eb2a6",
                  flexShrink: 0,
                  marginLeft: 8,
                }}
              />
              <div
                style={{
                  fontSize: 10,
                  color: "#1eb2a6",
                  letterSpacing: "0.1em",
                }}
              >
                SECURED
              </div>
            </div>
            <style>{`
              @keyframes beaconPulse {
                0%, 100% { box-shadow: 0 0 8px #FF6B35; }
                50% { box-shadow: 0 0 16px #FF6B35; }
              }
            `}</style>
          </TipCard>
        )}
      </AnimatePresence>
    </div>
  );
}
