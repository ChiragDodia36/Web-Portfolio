"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { zoneControl } from "@/lib/zone-control";

const OBJECTIVES = [
  { zone: 1, label: "LORE", desc: "Agent background" },
  { zone: 2, label: "LOADOUT", desc: "Technical arsenal" },
  { zone: 3, label: "CONTRACTS", desc: "Mission logs" },
  { zone: 4, label: "HISTORY", desc: "Field experience" },
  { zone: 5, label: "COMMS", desc: "Secure channel" },
];


export function ObjectivesTracker() {
  const [visited, setVisited] = useState<Set<number>>(
    new Set(zoneControl.visitedZones)
  );
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    return zoneControl.onVisitedChange((v) => setVisited(new Set(v)));
  }, []);

  // Count visited zones excluding SPAWN (zone 0)
  const securedCount = [...visited].filter((z) => z > 0).length;
  const allComplete = securedCount === 5;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 80,
        right: 16,
        zIndex: 80,
        width: 220,
        background: "rgba(15,25,35,0.88)",
        border: "1px solid rgba(255,70,84,0.2)",
        borderRadius: 4,
        fontFamily: "'Rajdhani', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          background: "transparent",
          border: "none",
          borderBottom: collapsed
            ? "none"
            : "1px solid rgba(255,70,84,0.12)",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              color: allComplete ? "#1eb2a6" : "rgba(236,232,225,0.35)",
              marginBottom: 2,
            }}
          >
            {allComplete ? "MISSION COMPLETE" : "RECON STATUS"}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: allComplete ? "#1eb2a6" : "#ece8e1",
            }}
          >
            {securedCount}/5 SITES SECURED
          </div>
        </div>
        <div
          style={{
            fontSize: 10,
            color: "rgba(236,232,225,0.3)",
            transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.2s",
          }}
        >
          ▲
        </div>
      </button>

      {/* Collapsible body */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            key="body"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            {/* Objectives list */}
            <div style={{ padding: "8px 12px 4px" }}>
              {OBJECTIVES.map(({ zone, label, desc }) => {
                const done = visited.has(zone);
                return (
                  <motion.div
                    key={zone}
                    layout
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    {/* Check indicator */}
                    <motion.div
                      animate={
                        done
                          ? { scale: [1, 1.3, 1], opacity: 1 }
                          : { scale: 1, opacity: 1 }
                      }
                      transition={{ duration: 0.3 }}
                      style={{
                        flexShrink: 0,
                        width: 12,
                        height: 12,
                        border: done
                          ? "none"
                          : "1px solid rgba(236,232,225,0.2)",
                        background: done ? "#30d158" : "transparent",
                        borderRadius: done ? "50%" : 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 8,
                        color: "#fff",
                      }}
                    >
                      {done && "✓"}
                    </motion.div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: done
                            ? "rgba(236,232,225,0.5)"
                            : "#ece8e1",
                          letterSpacing: "0.06em",
                          lineHeight: 1.2,
                          textDecoration: done ? "line-through" : "none",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontSize: 9,
                          color: "rgba(236,232,225,0.25)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {desc}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
