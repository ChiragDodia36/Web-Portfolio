"use client";

/**
 * OmenZonePanels — replaces ScrollSections.
 *
 * Listens to zoneControl.currentZone and shows the panel for the active zone.
 * Panels fade out when the user starts moving (WASD/arrows) and fade back
 * in 400ms after keys are released, so the 3D world is visible during travel.
 */

import { useEffect, useRef, useState } from "react";
import { zoneControl } from "@/lib/zone-control";
import { HeroOverlay } from "@/components/hero/HeroOverlay";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

const PANEL_BG = "rgba(15, 25, 35, 0.88)";
const MENU_HEIGHT = "36px";

const MOVE_KEYS = new Set([
  "w", "a", "s", "d",
  "arrowup", "arrowdown", "arrowleft", "arrowright",
]);

interface ZonePanelProps {
  active: boolean;
  moving: boolean;
  children: React.ReactNode;
  center?: boolean;
}

function ZonePanel({ active, moving, children, center = false }: ZonePanelProps) {
  const [visible, setVisible] = useState(active);
  const [mounted, setMounted] = useState(active);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => { setMounted(true); setVisible(true); }, 10);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 320);
      return () => clearTimeout(t);
    }
  }, [active]);

  if (!mounted) return null;

  // When moving: hide instantly (opacity 0, fast 150ms)
  // When stopped: use the normal 300ms fade
  const isShown = visible && !moving;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: PANEL_BG,
        display: "flex",
        flexDirection: "column",
        alignItems: center ? "center" : undefined,
        justifyContent: center ? "center" : undefined,
        paddingTop: center ? MENU_HEIGHT : undefined,
        boxSizing: "border-box",
        pointerEvents: isShown ? "auto" : "none",
        zIndex: 10,
        transition: moving
          ? "opacity 150ms ease, transform 150ms ease"
          : "opacity 300ms ease, transform 300ms ease",
        opacity: isShown ? 1 : 0,
        transform: isShown ? "scale(1)" : "scale(0.98)",
        overflowY: "auto",
      }}
    >
      {children}
    </div>
  );
}

export function OmenZonePanels() {
  const [activeZone, setActiveZone] = useState(0);
  const [moving, setMoving] = useState(false);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressedKeys = useRef(new Set<string>());

  useEffect(() => {
    return zoneControl.onZoneChange((zone) => setActiveZone(zone));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (!MOVE_KEYS.has(key)) return;
      pressedKeys.current.add(key);

      // Cancel any pending stop timer
      if (stopTimerRef.current) {
        clearTimeout(stopTimerRef.current);
        stopTimerRef.current = null;
      }
      setMoving(true);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      pressedKeys.current.delete(key);

      // Only start the stop timer when no move keys are held
      if (pressedKeys.current.size === 0) {
        stopTimerRef.current = setTimeout(() => {
          setMoving(false);
          stopTimerRef.current = null;
        }, 400);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* Zone 0 — Hero */}
      <ZonePanel active={activeZone === 0} moving={moving} center>
        <HeroOverlay />
      </ZonePanel>

      {/* Zone 1 — LORE (About) */}
      <ZonePanel active={activeZone === 1} moving={moving}>
        <div style={{ paddingTop: MENU_HEIGHT, width: "100%", height: "100%", overflowY: "auto", boxSizing: "border-box" }}>
          <About />
        </div>
      </ZonePanel>

      {/* Zone 2 — LOADOUT (Skills) */}
      <ZonePanel active={activeZone === 2} moving={moving}>
        <div style={{ paddingTop: MENU_HEIGHT, width: "100%", height: "100%", overflowY: "auto", boxSizing: "border-box" }}>
          <Skills />
        </div>
      </ZonePanel>

      {/* Zone 3 — CONTRACTS (Projects) */}
      <ZonePanel active={activeZone === 3} moving={moving}>
        <div style={{ paddingTop: MENU_HEIGHT, width: "100%", height: "100%", overflowY: "auto", boxSizing: "border-box" }}>
          <Projects />
        </div>
      </ZonePanel>

      {/* Zone 4 — HISTORY (Experience) */}
      <ZonePanel active={activeZone === 4} moving={moving}>
        <div style={{ paddingTop: MENU_HEIGHT, width: "100%", height: "100%", overflowY: "auto", boxSizing: "border-box" }}>
          <Experience />
        </div>
      </ZonePanel>

      {/* Zone 5 — COMMS (Contact) */}
      <ZonePanel active={activeZone === 5} moving={moving} center>
        <Contact />
      </ZonePanel>
    </>
  );
}
