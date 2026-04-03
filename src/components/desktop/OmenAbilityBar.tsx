"use client";

import { useRef, useState, useEffect, type MouseEvent } from "react";
import { motion, useSpring, useTransform, type MotionValue } from "motion/react";
import { zoneControl } from "@/lib/zone-control";

interface AbilityIcon {
  label: string;
  abbrev: string;
  keybind: string;
  zoneIndex: number | null; // null = app, not zone
  appAction?: string;
  color: string;
  symbol: string;
}

const ABILITIES: AbilityIcon[] = [
  { label: "Lore",      abbrev: "LORE",      keybind: "Q", zoneIndex: 1, color: "#FF4654", symbol: "◈" },
  { label: "Loadout",   abbrev: "LOADOUT",   keybind: "E", zoneIndex: 2, color: "#f0b232", symbol: "⚡" },
  { label: "Contracts", abbrev: "CONTRACTS", keybind: "C", zoneIndex: 3, color: "#FF4654", symbol: "⬡" },
  { label: "History",   abbrev: "HISTORY",   keybind: "X", zoneIndex: 4, color: "#1eb2a6", symbol: "◷" },
  { label: "Comms",     abbrev: "COMMS",     keybind: "Z", zoneIndex: 5, color: "#f0b232", symbol: "@" },
  { label: "Terminal",  abbrev: "TERM",      keybind: "",  zoneIndex: null, appAction: "terminal", color: "#FF4654", symbol: "✦" },
  { label: "Resume",    abbrev: "RESUME",    keybind: "",  zoneIndex: null, appAction: "resume",   color: "#f0b232", symbol: "▤" },
];

interface AbilityItemProps {
  icon: AbilityIcon;
  isActive: boolean;
  mouseX: MotionValue<number>;
  onClick: () => void;
}

function AbilityItem({ icon, isActive, mouseX, onClick }: AbilityItemProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovering, setHovering] = useState(false);
  const [bouncing, setBouncing] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 150;
    return val - (rect.left + rect.width / 2);
  });

  const scale = useTransform(distance, [-100, -50, 0, 50, 100], [1, 1.18, 1.5, 1.18, 1]);
  const springScale = useSpring(scale, { mass: 0.1, stiffness: 200, damping: 12 });
  const y = useTransform(distance, [-100, -50, 0, 50, 100], [0, -4, -10, -4, 0]);
  const springY = useSpring(y, { mass: 0.1, stiffness: 200, damping: 12 });

  function handleClick() {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 500);
    onClick();
  }

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative flex flex-col items-center outline-none"
      style={{ scale: springScale, y: springY }}
    >
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 4, scale: 0.85 }}
        animate={hovering ? { opacity: 1, y: -4, scale: 1 } : { opacity: 0, y: 4, scale: 0.85 }}
        transition={{ duration: 0.12 }}
        style={{
          position: "absolute",
          top: -36,
          background: "rgba(13,5,24,0.95)",
          border: "1px solid rgba(124,47,190,0.3)",
          padding: "2px 8px",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          borderRadius: 0,
        }}
      >
        <span style={{ fontSize: 10, color: "#C77DFF", letterSpacing: "0.1em", fontWeight: 700 }}>
          {icon.label.toUpperCase()}
        </span>
      </motion.div>

      {/* Keybind */}
      {icon.keybind && (
        <span
          style={{
            fontSize: 8,
            color: isActive ? "#C77DFF" : "rgba(155,100,221,0.5)",
            letterSpacing: "0.06em",
            marginBottom: 2,
            fontWeight: 700,
          }}
        >
          [{icon.keybind}]
        </span>
      )}

      {/* Icon square */}
      <motion.div
        animate={bouncing ? { y: [0, -14, 0, -6, 0] } : {}}
        transition={bouncing ? { duration: 0.5, ease: "easeOut" } : {}}
        style={{
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          color: icon.color,
          background: isActive
            ? `rgba(123,47,190,0.3)`
            : `rgba(13,5,24,0.7)`,
          border: isActive
            ? `1px solid ${icon.color}`
            : "1px solid rgba(124,47,190,0.25)",
          borderRadius: 0,
          boxShadow: isActive
            ? `0 0 12px ${icon.color}40, inset 0 0 8px ${icon.color}20`
            : "none",
        }}
      >
        {icon.symbol}
      </motion.div>

      {/* Active glow bar */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            bottom: -3,
            left: 4,
            right: 4,
            height: 2,
            background: icon.color,
            boxShadow: `0 0 6px ${icon.color}`,
          }}
        />
      )}
    </motion.button>
  );
}

interface OmenAbilityBarProps {
  visible?: boolean;
  onAppAction?: (action: string) => void;
}

export function OmenAbilityBar({ visible = true, onAppAction }: OmenAbilityBarProps) {
  const mouseX = useSpring(0, { mass: 0.1, stiffness: 200, damping: 15 });
  const [activeZone, setActiveZone] = useState(0);

  useEffect(() => {
    return zoneControl.onZoneChange((z) => setActiveZone(z));
  }, []);

  function handleClick(icon: AbilityIcon) {
    if (icon.zoneIndex !== null) {
      zoneControl.flyTo(icon.zoneIndex);
    } else if (icon.appAction) {
      onAppAction?.(icon.appAction);
    }
  }

  return (
    <motion.div
      onMouseMove={(e: MouseEvent) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(0)}
      style={{
        position: "fixed",
        bottom: 12,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        padding: "8px 12px 10px",
        background: "rgba(15, 25, 35, 0.92)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 70, 84, 0.2)",
        borderTop: "2px solid rgba(255, 70, 84, 0.5)",
        borderRadius: 0,
        zIndex: 50,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 300ms",
      }}
    >
      {/* Zone navigation abilities */}
      {ABILITIES.slice(0, 5).map((icon) => (
        <AbilityItem
          key={icon.label}
          icon={icon}
          isActive={icon.zoneIndex === activeZone}
          mouseX={mouseX}
          onClick={() => handleClick(icon)}
        />
      ))}

      {/* Separator */}
      <div
        style={{
          width: 1,
          height: 28,
          background: "rgba(255,70,84,0.2)",
          margin: "0 4px",
          alignSelf: "center",
        }}
      />

      {/* App actions */}
      {ABILITIES.slice(5).map((icon) => (
        <AbilityItem
          key={icon.label}
          icon={icon}
          isActive={false}
          mouseX={mouseX}
          onClick={() => handleClick(icon)}
        />
      ))}
    </motion.div>
  );
}
