"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface MissionBriefingProps {
  onBegin: () => void;
}

const OBJECTIVES = [
  { zone: "A", label: "LORE", desc: "Extract agent background & origin" },
  { zone: "B", label: "LOADOUT", desc: "Assess technical arsenal" },
  { zone: "C", label: "CONTRACTS", desc: "Review active mission logs" },
  { zone: "D", label: "HISTORY", desc: "Analyze field experience" },
  { zone: "E", label: "COMMS", desc: "Establish secure channel" },
];

export function MissionBriefing({ onBegin }: MissionBriefingProps) {
  const [visible] = useState(true);
  const [ready, setReady] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Use @chenglou/pretext to pre-measure objective rows for layout accuracy
  useEffect(() => {
    async function measureRows() {
      const { prepareWithSegments, layoutWithLines } = await import("@chenglou/pretext");
      const cardWidth = cardRef.current?.clientWidth ?? 520;
      const maxWidth = cardWidth - 80; // account for padding + zone badge
      const font = "500 11px Rajdhani, sans-serif";

      OBJECTIVES.forEach(({ desc }) => {
        const prepared = prepareWithSegments(desc, font);
        const { lineCount } = layoutWithLines(prepared, maxWidth, 18);
        void lineCount; // pre-warm cache; lineCount informs row height if needed
      });

      setReady(true);
    }

    measureRows().catch(() => setReady(true));
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="briefing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 150,
            background: "rgba(5,13,20,0.96)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 16px",
            backdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: ready ? 1 : 0, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              width: "100%",
              maxWidth: 560,
              background: "rgba(15,25,35,0.92)",
              border: "1px solid rgba(255,70,84,0.25)",
              borderRadius: 4,
              padding: "32px 36px",
              position: "relative",
              fontFamily: "'Rajdhani', 'SF Pro Display', system-ui, sans-serif",
            }}
          >
            {/* Corner brackets */}
            {[
              { top: -1, left: -1, borderWidth: "2px 0 0 2px" },
              { top: -1, right: -1, borderWidth: "2px 2px 0 0" },
              { bottom: -1, left: -1, borderWidth: "0 0 2px 2px" },
              { bottom: -1, right: -1, borderWidth: "0 2px 2px 0" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 16,
                  height: 16,
                  border: `solid #FF4654`,
                  borderWidth: s.borderWidth,
                  top: s.top,
                  left: (s as { left?: number }).left,
                  right: (s as { right?: number }).right,
                  bottom: s.bottom,
                }}
              />
            ))}

            {/* Red top accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  "linear-gradient(90deg, #FF4654, rgba(255,70,84,0.3))",
                borderRadius: "4px 4px 0 0",
              }}
            />

            {/* Classification badge */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: 9,
                letterSpacing: "0.4em",
                color: "#FF4654",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  background: "#FF4654",
                  borderRadius: "50%",
                }}
              />
              CLASSIFIED // OPERATION: TACTICAL RECON
            </motion.div>

            {/* Mission header */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28 }}
              style={{ marginBottom: 6 }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#ece8e1",
                  letterSpacing: "0.05em",
                  lineHeight: 1.2,
                }}
              >
                MISSION: RECON CHIRAG DODIA
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.34 }}
              style={{
                fontSize: 12,
                color: "rgba(236,232,225,0.45)",
                letterSpacing: "0.1em",
                marginBottom: 28,
              }}
            >
              TARGET: FULL-STACK DEVELOPER // SHADOW ARCHITECT
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.38, duration: 0.4 }}
              style={{
                height: 1,
                background: "rgba(255,70,84,0.15)",
                marginBottom: 20,
                transformOrigin: "left",
              }}
            />

            {/* Objectives label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
              style={{
                fontSize: 9,
                letterSpacing: "0.35em",
                color: "rgba(236,232,225,0.35)",
                marginBottom: 14,
              }}
            >
              RECONNAISSANCE OBJECTIVES
            </motion.div>

            {/* Objective rows */}
            <div style={{ marginBottom: 28 }}>
              {OBJECTIVES.map(({ zone, label, desc }, i) => (
                <motion.div
                  key={zone}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.46 + i * 0.06 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    marginBottom: 10,
                  }}
                >
                  {/* Zone badge */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: 24,
                      height: 24,
                      border: "1px solid rgba(255,70,84,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#FF4654",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {zone}
                  </div>
                  {/* Hollow checkbox */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: 12,
                      height: 12,
                      border: "1px solid rgba(236,232,225,0.2)",
                      marginTop: 6,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#ece8e1",
                        letterSpacing: "0.08em",
                        lineHeight: 1.3,
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(236,232,225,0.4)",
                        letterSpacing: "0.03em",
                        lineHeight: 1.5,
                      }}
                    >
                      — {desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78 }}
            >
              <motion.button
                onClick={onBegin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  background: "#FF4654",
                  border: "none",
                  borderRadius: 2,
                  color: "#ece8e1",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                BEGIN RECON
              </motion.button>
            </motion.div>

            {/* Clearance label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{
                marginTop: 16,
                textAlign: "center",
                fontSize: 9,
                color: "rgba(236,232,225,0.2)",
                letterSpacing: "0.3em",
              }}
            >
              CLEARANCE: ALPHA // EYES ONLY
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
