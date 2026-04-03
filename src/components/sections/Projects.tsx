"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { MacWindow } from "@/components/desktop/MacWindow";
import { projects, projectCategories, type Project } from "@/data/projects";


function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(5,2,10,0.75)" }} />
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 8 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className="relative w-full max-w-lg z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <MacWindow title={`Mission Briefing // ${project.title}`}>
          <div className="p-2 space-y-4">
            <div className="flex items-start gap-4">
              <div style={{
                width: 52, height: 52, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 22, flexShrink: 0,
                background: `${project.color}15`, border: `1px solid ${project.color}30`, borderRadius: 0,
              }}>
                {project.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(220,200,255,0.9)", marginBottom: 4 }}>
                  {project.title}
                </h3>
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
                  background: `${project.color}20`, color: project.color, padding: "2px 8px", borderRadius: 0,
                }}>
                  {project.featured ? "[ACTIVE]" : "[CLASSIFIED]"} {project.category.toUpperCase()}
                </span>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(220,200,255,0.55)", lineHeight: 1.7 }}>{project.description}</p>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(155,100,221,0.4)", marginBottom: 8 }}>// TECH STACK</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: 10, padding: "3px 8px",
                    background: "rgba(123,47,190,0.12)", border: "1px solid rgba(124,47,190,0.25)",
                    color: "rgba(199,125,255,0.7)", borderRadius: 0, letterSpacing: "0.05em",
                  }}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
                  flex: 1, padding: "8px 0", textAlign: "center", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  background: "rgba(13,5,24,0.8)", border: "1px solid rgba(124,47,190,0.3)",
                  color: "#9D4EDD", textDecoration: "none", display: "block",
                }}>[GITHUB] →</a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                  flex: 1, padding: "8px 0", textAlign: "center", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  background: `${project.color}20`, border: `1px solid ${project.color}40`,
                  color: project.color, textDecoration: "none", display: "block",
                }}>[LIVE] ↗</a>
              )}
            </div>
          </div>
        </MacWindow>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"icons" | "list">("icons");

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <section
        id="projects"
        className="w-full flex items-center relative"
      >
        <div className="max-w-4xl mx-auto px-6 py-8 w-full">
            <MacWindow title="Mission Logs // Classified Intel">
              <div className="flex flex-col min-h-[320px]">
                {/* Category filter pills */}
                <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
                  {projectCategories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        style={{
                          padding: "4px 10px", fontSize: 9, fontWeight: 700,
                          letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer",
                          border: isActive ? "1px solid #9D4EDD" : "1px solid rgba(124,47,190,0.2)",
                          background: isActive ? "rgba(123,47,190,0.22)" : "rgba(13,5,24,0.5)",
                          color: isActive ? "#C77DFF" : "rgba(155,100,221,0.45)",
                          borderRadius: 0, fontFamily: "inherit",
                        }}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                  {/* View toggle */}
                  <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                    {(["icons", "list"] as const).map((mode) => (
                      <button key={mode} onClick={() => setViewMode(mode)} style={{
                        padding: "4px 10px", fontSize: 9, fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                        border: viewMode === mode ? "1px solid rgba(124,47,190,0.5)" : "1px solid rgba(124,47,190,0.15)",
                        background: viewMode === mode ? "rgba(123,47,190,0.18)" : "transparent",
                        color: viewMode === mode ? "#9D4EDD" : "rgba(155,100,221,0.35)",
                        borderRadius: 0, fontFamily: "inherit",
                      }}>{mode === "icons" ? "⊞ GRID" : "≡ LIST"}</button>
                    ))}
                  </div>
                </div>

                {/* Main area */}
                <div className="flex-1">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid rgba(124,47,190,0.12)" }}>
                    <span style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(155,100,221,0.35)" }}>// INTEL //</span>
                    <span style={{ fontSize: 10, letterSpacing: "0.1em", color: "#9D4EDD" }}>
                      {activeCategory === "all" ? "ALL MISSIONS" : projectCategories.find(c => c.id === activeCategory)?.label?.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 9, color: "rgba(155,100,221,0.3)", marginLeft: "auto" }}>{filtered.length} CLASSIFIED</span>
                  </div>

                  {/* File Grid / List */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeCategory}-${viewMode}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className={
                        viewMode === "icons"
                          ? "grid grid-cols-3 sm:grid-cols-4 gap-4"
                          : "space-y-1"
                      }
                    >
                      {filtered.map((project) =>
                        viewMode === "icons" ? (
                          <motion.button
                            key={project.title}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setSelectedProject(project)}
                            style={{
                              display: "flex", flexDirection: "column", alignItems: "center",
                              gap: 6, padding: 10, cursor: "pointer",
                              background: "rgba(13,5,24,0.5)", border: "1px solid rgba(124,47,190,0.15)",
                              borderRadius: 0, fontFamily: "inherit",
                            }}
                          >
                            <div style={{
                              width: 44, height: 44, display: "flex", alignItems: "center",
                              justifyContent: "center", fontSize: 20,
                              background: `${project.color}15`, border: `1px solid ${project.color}25`, borderRadius: 0,
                            }}>
                              {project.icon}
                            </div>
                            <span style={{ fontSize: 9, color: "rgba(220,200,255,0.7)", textAlign: "center", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.3 }}>
                              {project.title}
                            </span>
                            {project.featured && (
                              <span style={{
                                fontSize: 7, fontWeight: 700, letterSpacing: "0.15em",
                                background: `${project.color}20`, color: project.color,
                                padding: "1px 6px", borderRadius: 0, textTransform: "uppercase",
                              }}>[ACTIVE]</span>
                            )}
                          </motion.button>
                        ) : (
                          <motion.button
                            key={project.title}
                            whileHover={{ x: 3 }}
                            onClick={() => setSelectedProject(project)}
                            style={{
                              width: "100%", display: "flex", alignItems: "center", gap: 10,
                              padding: "8px 10px", cursor: "pointer", textAlign: "left",
                              background: "rgba(13,5,24,0.4)", border: "1px solid rgba(124,47,190,0.12)",
                              borderLeft: `2px solid ${project.color}50`,
                              borderRadius: 0, fontFamily: "inherit",
                            }}
                          >
                            <div style={{
                              width: 28, height: 28, display: "flex", alignItems: "center",
                              justifyContent: "center", fontSize: 14, flexShrink: 0,
                              background: `${project.color}12`, borderRadius: 0,
                            }}>{project.icon}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(220,200,255,0.8)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{project.title}</p>
                              <p style={{ fontSize: 9, color: "rgba(155,100,221,0.4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{project.description}</p>
                            </div>
                            <span style={{ fontSize: 8, color: "rgba(155,100,221,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0 }}>
                              {project.featured ? "[ACTIVE]" : "[CLASSIFIED]"}
                            </span>
                          </motion.button>
                        )
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </MacWindow>
        </div>
      </section>

      {/* Project Detail Modal — portaled to document.body so it escapes the
          ScrollSections rail's CSS transform containing block */}
      {selectedProject &&
        createPortal(
          <AnimatePresence>
            <ProjectDetailModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
