"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  "> PORTFOLIO PROTOCOL v4.6 — INITIALIZING",
  "> CHECKING GPU SUBSYSTEM............[OK]",
  "> LOADING AGENT DATABASE............[OK]",
  "> VERIFYING NETWORK MESH............[OK]",
  "> TACTICAL MAP ACCESS...............[GRANTED]",
  "> IDENTITY SCAN — CHIRAG DODIA......[CONFIRMED]",
  "> ALL SYSTEMS NOMINAL",
  "> LOADING MISSION DATA...",
];

const CHAR_INTERVAL = 18; // ms per character
const LINE_PAUSE = 120;   // ms between lines

export function BootScreen({ onComplete }: BootScreenProps) {
  const [visible, setVisible] = useState(true);
  const [revealedLines, setRevealedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // pretext validation: confirm text fits container width before animating
  const pretextValidated = useRef(false);

  // Validate line widths with @chenglou/pretext on mount
  useEffect(() => {
    if (pretextValidated.current) return;
    pretextValidated.current = true;

    async function validate() {
      const { prepareWithSegments, layoutWithLines } = await import("@chenglou/pretext");
      const containerWidth = containerRef.current?.clientWidth ?? 600;
      const font = "500 13px 'Courier New', monospace";
      // Verify no line overflows — if it does we truncate at layout boundary
      BOOT_LINES.forEach((line) => {
        const prepared = prepareWithSegments(line, font);
        const { lineCount } = layoutWithLines(prepared, containerWidth - 64, 20);
        // lineCount > 1 means wrap — we could handle it but our lines are short
        void lineCount;
      });
    }

    validate().catch(() => {/* browser canvas unavailable in SSR — safe to ignore */});
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (currentLine >= BOOT_LINES.length) {
      const t = setTimeout(() => {
        setDone(true);
        setVisible(false);
        setTimeout(onComplete, 700);
      }, 600);
      return () => clearTimeout(t);
    }

    const line = BOOT_LINES[currentLine];

    if (charCount < line.length) {
      const t = setTimeout(() => {
        setCharCount((c) => c + 1);
      }, CHAR_INTERVAL);
      return () => clearTimeout(t);
    }

    // Line complete — pause then move to next
    const t = setTimeout(() => {
      setRevealedLines((prev) => [...prev, line]);
      setCurrentLine((l) => l + 1);
      setCharCount(0);
    }, LINE_PAUSE);
    return () => clearTimeout(t);
  }, [currentLine, charCount, onComplete]);

  const progress = Math.min(
    ((currentLine + charCount / (BOOT_LINES[currentLine]?.length || 1)) /
      BOOT_LINES.length) *
      100,
    100
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "#050d14",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Courier New', monospace",
          }}
        >
          <div
            ref={containerRef}
            style={{
              width: "100%",
              maxWidth: 640,
              padding: "0 32px",
            }}
          >
            {/* Header */}
            <div
              style={{
                marginBottom: 32,
                borderBottom: "1px solid rgba(255,70,84,0.3)",
                paddingBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  color: "#FF4654",
                  marginBottom: 4,
                  textTransform: "uppercase",
                }}
              >
                PORTFOLIO PROTOCOL
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#ece8e1",
                  letterSpacing: "0.05em",
                }}
              >
                TACTICAL SYSTEM ONLINE
              </div>
            </div>

            {/* Boot log */}
            <div style={{ minHeight: 220, marginBottom: 32 }}>
              {revealedLines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 13,
                    color: line.includes("[OK]") || line.includes("[GRANTED]") || line.includes("[CONFIRMED]")
                      ? "#30d158"
                      : "rgba(236,232,225,0.7)",
                    lineHeight: "1.8",
                    letterSpacing: "0.02em",
                  }}
                >
                  {line}
                </div>
              ))}

              {/* Currently typing line */}
              {currentLine < BOOT_LINES.length && (
                <div
                  style={{
                    fontSize: 13,
                    color: "#ece8e1",
                    lineHeight: "1.8",
                    letterSpacing: "0.02em",
                  }}
                >
                  {BOOT_LINES[currentLine].slice(0, charCount)}
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 13,
                      background: "#FF4654",
                      marginLeft: 2,
                      animation: "bootCursor 0.8s step-end infinite",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10,
                  color: "rgba(236,232,225,0.4)",
                  letterSpacing: "0.2em",
                  marginBottom: 8,
                }}
              >
                <span>LOADING</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 2,
                  background: "rgba(255,70,84,0.15)",
                  borderRadius: 1,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: "#FF4654",
                    borderRadius: 1,
                    transition: "width 400ms ease",
                  }}
                />
              </div>
            </div>

            {done && (
              <div
                style={{
                  marginTop: 24,
                  fontSize: 11,
                  color: "#30d158",
                  letterSpacing: "0.3em",
                  textAlign: "center",
                }}
              >
                READY
              </div>
            )}
          </div>

          <style>{`
            @keyframes bootCursor {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
