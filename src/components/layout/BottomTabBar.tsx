"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TABS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Exp" },
  { id: "contact", label: "Contact" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function BottomTabBar() {
  const [active, setActive] = useState<TabId>("about");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: TabId) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "var(--bg)",
        borderTop: "1px solid var(--card-border)",
        padding: "10px 0 max(10px, env(safe-area-inset-bottom))",
      }}
    >
      {TABS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              position: "relative",
              flex: 1,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
            }}
          >
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: "12px",
                  right: "12px",
                  height: "2px",
                  backgroundColor: "var(--accent-violet)",
                  borderRadius: "0 0 2px 2px",
                }}
              />
            )}
            <span
              style={{
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: "9px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: isActive ? "var(--accent-violet)" : "var(--text-secondary)",
                fontWeight: isActive ? 500 : 400,
                transition: "color 200ms",
                marginTop: "4px",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
