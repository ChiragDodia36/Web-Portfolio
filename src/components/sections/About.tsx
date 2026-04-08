"use client";

import { MacWindow } from "@/components/desktop/MacWindow";
import { education } from "@/data/experience";

function OmenEye() {
  return (
    <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
      <ellipse cx="28" cy="20" rx="26" ry="16" stroke="#1CC7D3" strokeWidth="1.5" />
      <ellipse cx="28" cy="20" rx="16" ry="10" stroke="#1CC7D3" strokeWidth="0.8" opacity="0.4" />
      <circle cx="28" cy="20" r="7" fill="#1CC7D3" opacity="0.85" />
      <circle cx="28" cy="20" r="3.5" fill="#05020a" />
      <line x1="2" y1="20" x2="12" y2="20" stroke="#1CC7D3" strokeWidth="1" opacity="0.35" />
      <line x1="44" y1="20" x2="54" y2="20" stroke="#1CC7D3" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

export function About() {
  return (
    <section id="about" className="w-full flex items-center relative">
      <div className="max-w-4xl mx-auto px-6 py-8 w-full">
        <MacWindow title="Void Archive // Agent Profile">
          <div className="flex flex-col md:flex-row gap-6 p-2">
            {/* Avatar + Name */}
            <div className="flex flex-col items-center md:items-start gap-3 min-w-[180px]">
              {/* Omen eye + initials */}
              <div
                style={{
                  width: 80, height: 80,
                  background: "rgba(13,5,24,0.9)",
                  border: "1px solid rgba(124,47,190,0.4)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  boxShadow: "0 0 20px rgba(123,47,190,0.2)",
                  borderRadius: 0,
                }}
              >
                <OmenEye />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "#9D4EDD" }}>
                  CD
                </span>
              </div>
              <div className="text-center md:text-left">
                <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(220,200,255,0.95)" }}>
                  Chirag Dodia
                </h2>
                <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "#9D4EDD", textTransform: "uppercase" }}>
                  Mobile &amp; Full-Stack Engineer
                </p>
              </div>
              {/* Section label */}
              <span style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(155,100,221,0.35)" }}>
                {"// AGENT PROFILE"}
              </span>
            </div>

            {/* Bio */}
            <div className="flex-1 space-y-4">
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(220,200,255,0.55)" }}>
                Passionate mobile and full-stack engineer with 2+ years of industry experience
                building production-grade applications. Currently pursuing MS in Computer Science
                at Indiana University Bloomington while working as a Mobile Software Engineer.
                Specialized in React Native, SwiftUI, and cross-platform development with a
                strong foundation in AI/ML and cloud technologies.
              </p>

              {/* Education Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {education.map((edu) => (
                  <div
                    key={edu.school}
                    style={{
                      padding: "10px 12px",
                      background: "rgba(13,5,24,0.6)",
                      border: "1px solid rgba(124,47,190,0.2)",
                      borderLeft: "2px solid #7B2FBE",
                      borderRadius: 0,
                      cursor: "default",
                      transition: "border-color 200ms",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(157,78,221,0.5)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(124,47,190,0.2)")}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "rgba(220,200,255,0.8)", textTransform: "uppercase", marginBottom: 3 }}>
                      {edu.degree}
                    </div>
                    <p style={{ fontSize: 10, color: "rgba(155,100,221,0.5)", letterSpacing: "0.05em" }}>{edu.school}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                      <span style={{ fontSize: 9, color: "rgba(155,100,221,0.35)", letterSpacing: "0.08em" }}>{edu.years}</span>
                      {edu.gpa && (
                        <span style={{ fontSize: 9, color: "#30d158", fontWeight: 700, letterSpacing: "0.08em" }}>
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MacWindow>
      </div>
    </section>
  );
}
