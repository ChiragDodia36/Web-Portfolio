"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { RepoCard } from "@/app/api/github/route";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function Projects() {
  const [repos, setRepos] = useState<RepoCard[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data);
        else setError(true);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <section id="projects" style={{ padding: "0 20px 0" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        style={{ borderBottom: "1px solid var(--card-border)", padding: "40px 0" }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: "10px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            marginBottom: "28px",
          }}
        >
          02 — Work
        </p>

        {error && (
          <p
            style={{
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              fontSize: "12px",
              color: "var(--text-secondary)",
            }}
          >
            Couldn&apos;t load projects.
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileTap={{ scale: 0.99 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              style={{
                display: "block",
                padding: "20px 0",
                borderBottom:
                  i < repos.length - 1
                    ? "1px solid var(--card-border)"
                    : "none",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    lineHeight: 1.2,
                  }}
                >
                  {repo.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), ui-monospace, monospace",
                    fontSize: "10px",
                    color: "var(--text-secondary)",
                    letterSpacing: "0.06em",
                    flexShrink: 0,
                    marginLeft: "8px",
                  }}
                >
                  {formatDate(repo.pushedAt)}
                </span>
              </div>
              {repo.description && (
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    marginBottom: "12px",
                    lineHeight: 1.6,
                  }}
                >
                  {repo.description}
                </p>
              )}
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {repo.language && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono), ui-monospace, monospace",
                      fontSize: "10px",
                      padding: "3px 8px",
                      borderRadius: "3px",
                      border: "1px solid var(--accent-red)",
                      color: "var(--accent-red)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {repo.language}
                  </span>
                )}
                {repo.stars > 0 && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono), ui-monospace, monospace",
                      fontSize: "10px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    ★ {repo.stars}
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
