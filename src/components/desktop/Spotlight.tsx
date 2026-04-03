"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "motion/react";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

interface SearchResult {
  type: "section" | "project" | "skill";
  title: string;
  subtitle: string;
  icon: string;
  action: () => void;
}

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onAppAction?: (action: string) => void;
}

export function Spotlight({ isOpen, onClose, onAppAction }: SpotlightProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when spotlight opens (state resets automatically via unmount/remount)
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Build searchable items
  const allItems = useMemo<SearchResult[]>(() => {
    const sections: SearchResult[] = [
      {
        type: "section",
        title: "About",
        subtitle: "Learn about Chirag",
        icon: "ℹ",
        action: () => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        type: "section",
        title: "Skills",
        subtitle: "Technical skills & proficiency",
        icon: "◇",
        action: () => {
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        type: "section",
        title: "Projects",
        subtitle: "Browse all projects",
        icon: "{}",
        action: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        type: "section",
        title: "Experience",
        subtitle: "Work experience timeline",
        icon: "◷",
        action: () => {
          document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        type: "section",
        title: "Contact",
        subtitle: "Get in touch",
        icon: "@",
        action: () => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        type: "section",
        title: "Terminal",
        subtitle: "Open interactive terminal",
        icon: ">_",
        action: () => {
          onAppAction?.("terminal");
          onClose();
        },
      },
      {
        type: "section",
        title: "Resume",
        subtitle: "View resume in Preview.app",
        icon: "📄",
        action: () => {
          onAppAction?.("resume");
          onClose();
        },
      },
      {
        type: "section",
        title: "Siri",
        subtitle: "Ask Chirag's AI assistant",
        icon: "✦",
        action: () => {
          onAppAction?.("siri");
          onClose();
        },
      },
    ];

    const projectItems: SearchResult[] = projects.map((p) => ({
      type: "project",
      title: p.title,
      subtitle: p.description,
      icon: p.icon,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    }));

    const skillItems: SearchResult[] = skillCategories.flatMap((cat) =>
      cat.skills.map((s) => ({
        type: "skill" as const,
        title: s.name,
        subtitle: `${cat.label} — ${s.proficiency}%`,
        icon: s.icon,
        action: () => {
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      }))
    );

    return [...sections, ...projectItems, ...skillItems];
  }, [onClose, onAppAction]);

  const results = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8);
    const q = query.toLowerCase();
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, allItems]);

  // Clamp selectedIndex to valid results range (avoids setState-in-effect for query resets)
  const safeIndex = Math.min(selectedIndex, Math.max(0, results.length - 1));

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[safeIndex]) {
      results[safeIndex].action();
    } else if (e.key === "Escape") {
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <motion.div
        initial={{ scale: 0.95, y: -10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: -10 }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        className="relative w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.12)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-[rgba(30,30,35,0.95)] backdrop-blur-xl">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
            <span className="text-white/30 text-lg">⌕</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search or type a command..."
              className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/25 outline-none"
              autoComplete="off"
              spellCheck={false}
            />
            <kbd className="text-[9px] text-white/15 px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)]">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[320px] overflow-y-auto py-1">
            {results.length === 0 ? (
              <p className="text-center text-[11px] text-white/20 py-6">
                No results found
              </p>
            ) : (
              <>
                {/* Group by type */}
                {["section", "project", "skill"]
                  .filter((type) =>
                    results.some((r) => r.type === type)
                  )
                  .map((type) => (
                    <div key={type}>
                      <p className="text-[9px] uppercase tracking-wider text-white/20 px-4 py-1 font-medium">
                        {type === "section"
                          ? "Top Hits"
                          : type === "project"
                            ? "Projects"
                            : "Skills"}
                      </p>
                      {results
                        .filter((r) => r.type === type)
                        .map((result, i) => {
                          const globalIndex = results.indexOf(result);
                          return (
                            <button
                              key={`${result.type}-${result.title}-${i}`}
                              onClick={result.action}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${
                                safeIndex === globalIndex
                                  ? "bg-[rgba(136,170,255,0.12)]"
                                  : "hover:bg-[rgba(255,255,255,0.04)]"
                              }`}
                            >
                              <div className="w-7 h-7 rounded-md bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-xs text-white/40 shrink-0">
                                {result.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-white/70 truncate">
                                  {result.title}
                                </p>
                                <p className="text-[10px] text-white/25 truncate">
                                  {result.subtitle}
                                </p>
                              </div>
                              {selectedIndex === globalIndex && (
                                <span className="text-[10px] text-white/20">
                                  ↵
                                </span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  ))}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-[rgba(255,255,255,0.05)]">
            <span className="text-[9px] text-white/15">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-white/15">Navigate</span>
              <span className="text-[9px] text-white/15">↑↓</span>
              <span className="text-[9px] text-white/15">Open</span>
              <span className="text-[9px] text-white/15">↵</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
