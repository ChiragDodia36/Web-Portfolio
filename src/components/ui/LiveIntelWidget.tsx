"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { GitHubMissionData, GitHubRepoData } from "@/app/api/github-mission/route";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function LiveIntelWidget() {
  const [repos, setRepos] = useState<GitHubRepoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github-mission")
      .then((r) => r.json())
      .then((d: GitHubMissionData & { error?: boolean }) => {
        if (d.error) setError(true);
        else setRepos(d.repos);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      style={{
        position: "fixed",
        top: 40,
        right: 16,
        zIndex: 80,
        width: 210,
        fontFamily: "'Rajdhani', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(15,25,35,0.92)",
          border: "1px solid rgba(255,70,84,0.3)",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(255,70,84,0.08), inset 0 0 20px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        {/* Corner accents */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 8, height: 8, borderTop: "1.5px solid #FF4654", borderLeft: "1.5px solid #FF4654", zIndex: 1 }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 8, height: 8, borderTop: "1.5px solid #FF4654", borderRight: "1.5px solid #FF4654", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 8, height: 8, borderBottom: "1.5px solid rgba(255,70,84,0.4)", borderLeft: "1.5px solid rgba(255,70,84,0.4)", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 8, height: 8, borderBottom: "1.5px solid rgba(255,70,84,0.4)", borderRight: "1.5px solid rgba(255,70,84,0.4)", zIndex: 1 }} />

        {/* Header */}
        <div
          style={{
            padding: "6px 10px 5px",
            borderBottom: "1px solid rgba(255,70,84,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 8, letterSpacing: "0.35em", color: "rgba(236,232,225,0.3)" }}>
            LIVE INTEL
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: loading ? "rgba(236,232,225,0.3)" : error ? "#FF4654" : "#30d158",
                boxShadow: loading ? "none" : error ? "0 0 5px #FF4654" : "0 0 5px #30d158",
              }}
            />
            <span style={{ fontSize: 7, letterSpacing: "0.2em", color: "rgba(236,232,225,0.2)" }}>
              {loading ? "SCANNING" : error ? "NO SIGNAL" : "LIVE"}
            </span>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "8px 10px",
            backgroundImage: `
              linear-gradient(rgba(255,70,84,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,70,84,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "12px 12px",
          }}
        >
          {loading && (
            <div style={{ fontSize: 10, color: "rgba(236,232,225,0.3)", letterSpacing: "0.1em", textAlign: "center", padding: "10px 0" }}>
              SCANNING...
            </div>
          )}

          {!loading && error && (
            <div style={{ fontSize: 10, color: "rgba(255,70,84,0.5)", letterSpacing: "0.08em", textAlign: "center", padding: "10px 0" }}>
              ⚠ SIGNAL LOST
            </div>
          )}

          {!loading && repos.length > 0 && (
            <div>
              {repos.map((r, i) => (
                <div key={r.repo}>
                  {i > 0 && (
                    <div style={{ borderTop: "1px solid rgba(255,70,84,0.08)", margin: "7px 0" }} />
                  )}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6, marginBottom: 3 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
                      {/* Active dot — brighter for most recent */}
                      <motion.div
                        animate={i === 0 ? { opacity: [1, 0.4, 1] } : { opacity: 0.4 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                          flexShrink: 0,
                          width: i === 0 ? 5 : 4,
                          height: i === 0 ? 5 : 4,
                          borderRadius: "50%",
                          background: i === 0 ? "#30d158" : "rgba(30,178,166,0.6)",
                          boxShadow: i === 0 ? "0 0 6px #30d158" : "none",
                        }}
                      />
                      <a
                        href={r.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: i === 0 ? 12 : 10,
                          fontWeight: i === 0 ? 700 : 500,
                          color: i === 0 ? "#ece8e1" : "rgba(236,232,225,0.55)",
                          letterSpacing: "0.03em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          textDecoration: "none",
                          display: "block",
                          maxWidth: 130,
                        }}
                        title={r.repo}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#FF4654")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = i === 0 ? "#ece8e1" : "rgba(236,232,225,0.55)")}
                      >
                        {r.repo}
                      </a>
                    </div>
                    <span style={{ fontSize: 8, color: "rgba(236,232,225,0.25)", letterSpacing: "0.04em", flexShrink: 0, paddingTop: 1 }}>
                      {timeAgo(r.lastPush)}
                    </span>
                  </div>
                  {i === 0 && r.openIssues > 0 && (
                    <div style={{ marginLeft: 10, fontSize: 8, color: "rgba(255,70,84,0.5)", letterSpacing: "0.06em" }}>
                      {r.openIssues} open issue{r.openIssues !== 1 ? "s" : ""}
                    </div>
                  )}
                </div>
              ))}

              <div style={{ borderTop: "1px solid rgba(255,70,84,0.1)", marginTop: 8, paddingTop: 6 }}>
                <a
                  href={`https://github.com/ChiragDodia36`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 8,
                    color: "rgba(255,70,84,0.55)",
                    letterSpacing: "0.2em",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#FF4654")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,70,84,0.55)")}
                >
                  ALL REPOS ↗
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
