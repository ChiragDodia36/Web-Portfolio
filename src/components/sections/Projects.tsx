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
    <section id="projects" style={{ padding: "0 20px 40px" }}>
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        style={{ padding: "28px 24px" }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            marginBottom: "20px",
          }}
        >
          Projects
        </p>

        {error && (
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            Couldn't load projects right now.
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              style={{
                display: "block",
                padding: "16px",
                borderRadius: "16px",
                border: "1px solid var(--card-border)",
                backgroundColor: "var(--card-glass)",
                backdropFilter: "blur(10px)",
                textDecoration: "none",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                  }}
                >
                  {repo.name}
                </span>
                {repo.stars > 0 && (
                  <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                    ⭐ {repo.stars}
                  </span>
                )}
              </div>
              {repo.description && (
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    marginBottom: "10px",
                    lineHeight: 1.5,
                  }}
                >
                  {repo.description}
                </p>
              )}
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {repo.language && (
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "3px 10px",
                      borderRadius: "100px",
                      backgroundColor: "var(--accent-amber)",
                      color: "#1D1D1F",
                      fontWeight: 500,
                    }}
                  >
                    {repo.language}
                  </span>
                )}
                <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                  {formatDate(repo.pushedAt)}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
