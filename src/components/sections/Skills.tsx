"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MacWindow } from "@/components/desktop/MacWindow";
import { skillCategories } from "@/data/skills";

interface ValorantRank { name: string; color: string; pips: number; }

function getValorantRank(p: number): ValorantRank {
  if (p >= 98) return { name: "RADIANT",   color: "#C77DFF", pips: 10 };
  if (p >= 94) return { name: "IMMORTAL",  color: "#FF4654", pips: 9 };
  if (p >= 89) return { name: "ASCENDANT", color: "#30d158", pips: 8 };
  if (p >= 81) return { name: "DIAMOND",   color: "#4fa0ff", pips: 7 };
  if (p >= 71) return { name: "PLATINUM",  color: "#30d4cc", pips: 6 };
  if (p >= 56) return { name: "GOLD",      color: "#e8b84b", pips: 5 };
  if (p >= 41) return { name: "SILVER",    color: "#a0aab4", pips: 4 };
  if (p >= 21) return { name: "BRONZE",    color: "#b07030", pips: 3 };
  return              { name: "IRON",      color: "#8a7c7c", pips: 2 };
}

const TAB_KEYBINDS = ["Q", "E", "C", "X", "Z"];

export function Skills() {
  const [activeTab, setActiveTab] = useState("languages");
  const activeCategory = skillCategories.find((c) => c.id === activeTab)!;

  return (
    <section id="skills" className="w-full flex items-center relative">
      <div className="max-w-4xl mx-auto px-6 py-8 w-full">
        <MacWindow title="Arsenal // Ability Loadout">
          {/* Ability tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
            {skillCategories.map((cat, i) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  style={{
                    padding: "5px 12px", fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                    border: isActive ? "1px solid #9D4EDD" : "1px solid rgba(124,47,190,0.25)",
                    background: isActive ? "rgba(123,47,190,0.25)" : "rgba(13,5,24,0.5)",
                    color: isActive ? "#C77DFF" : "rgba(155,100,221,0.5)",
                    borderRadius: 0, fontFamily: "inherit", transition: "all 150ms",
                    boxShadow: isActive ? "0 0 8px rgba(157,78,221,0.2)" : "none",
                  }}
                >
                  {TAB_KEYBINDS[i] && (
                    <span style={{ color: "rgba(157,78,221,0.5)", marginRight: 4 }}>[{TAB_KEYBINDS[i]}]</span>
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {activeCategory.skills.map((skill) => {
                const rank = getValorantRank(skill.proficiency);
                return (
                  <div
                    key={skill.name}
                    style={{
                      padding: "10px 12px",
                      background: "rgba(13,5,24,0.6)",
                      border: "1px solid rgba(124,47,190,0.18)",
                      borderLeft: `2px solid ${rank.color}`,
                      borderRadius: 0, cursor: "default",
                      transition: "background 200ms",
                      display: "flex", flexDirection: "column", gap: 6,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(23,10,40,0.7)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(13,5,24,0.6)"; }}
                  >
                    {/* Name + icon */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{
                        width: 24, height: 24, display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 9, fontWeight: 700,
                        background: `${rank.color}20`, color: rank.color, borderRadius: 0, flexShrink: 0,
                      }}>
                        {skill.icon}
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "rgba(220,200,255,0.85)", textTransform: "uppercase" }}>
                        {skill.name}
                      </span>
                    </div>
                    {/* Rank badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                        <polygon points="5,1 9,9 1,9" fill={rank.color} opacity="0.9" />
                      </svg>
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", color: rank.color }}>
                        {rank.name}
                      </span>
                    </div>
                    {/* Pip bar */}
                    <div style={{ display: "flex", gap: 2 }}>
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: i < rank.pips ? rank.color : "rgba(155,100,221,0.15)",
                          boxShadow: i < rank.pips ? `0 0 4px ${rank.color}80` : "none",
                        }} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </MacWindow>
      </div>
    </section>
  );
}
