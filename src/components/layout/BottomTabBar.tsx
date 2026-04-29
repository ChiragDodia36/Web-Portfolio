"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TABS = [
  { id: "about", label: "About", icon: "👤" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "projects", label: "Projects", icon: "💻" },
  { id: "experience", label: "Exp", icon: "📋" },
  { id: "contact", label: "Contact", icon: "✉️" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function BottomTabBar() {
  const [active, setActive] = useState<TabId>("about");
  const pillRef = useRef<{ [key in TabId]?: DOMRect }>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: TabId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        backgroundColor: "var(--card-glass)",
        borderTop: "1px solid var(--card-border)",
        padding: "8px 0 max(8px, env(safe-area-inset-bottom))",
      }}
    >
      {TABS.map(({ id, label, icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              flex: 1,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 0",
            }}
          >
            {isActive && (
              <motion.div
                layoutId="tab-pill"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{
                  position: "absolute",
                  inset: "0 8px",
                  borderRadius: "12px",
                  backgroundColor: "var(--accent-indigo)",
                  opacity: 0.15,
                }}
              />
            )}
            <motion.span
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{ fontSize: "18px", position: "relative" }}
            >
              {icon}
            </motion.span>
            <span
              style={{
                fontSize: "10px",
                color: isActive ? "var(--accent-indigo)" : "var(--text-secondary)",
                fontWeight: isActive ? 600 : 400,
                position: "relative",
                transition: "color 200ms",
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
