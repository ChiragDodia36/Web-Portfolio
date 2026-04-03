"use client";

import { motion } from "motion/react";
import { MacWindow } from "@/components/desktop/MacWindow";
import { experiences, education } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="w-full flex items-center relative">
      <div className="max-w-4xl mx-auto px-6 py-8 w-full">
        <MacWindow title="Shadow History // Field Records">
          {/* Timeline */}
          <div className="relative mb-6">
            {/* Dots + line */}
            <div className="relative flex justify-between mb-4">
              <div className="absolute top-1/2 left-[15%] right-[15%] h-px -translate-y-1/2" style={{ background: "#7B2FBE", opacity: 0.4 }} />
              {experiences.map((exp, i) => (
                <motion.div
                  key={`dot-${exp.company}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="flex-1 flex justify-center"
                >
                  <div
                    style={{
                      width: 12, height: 12, borderRadius: "50%",
                      border: exp.current ? "2px solid #1CC7D3" : "2px solid rgba(124,47,190,0.5)",
                      background: exp.current ? "rgba(28,199,211,0.3)" : "rgba(13,5,24,0.9)",
                      position: "relative", zIndex: 1,
                      boxShadow: exp.current ? "0 0 10px #1CC7D3" : "none",
                    }}
                  >
                    {exp.current && (
                      <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "#1CC7D3", opacity: 0.25 }} />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Cards */}
            <div className="flex justify-between gap-3">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.15 }}
                  className="flex-1 flex justify-center"
                >
                  <div style={{
                    padding: "10px 10px",
                    background: "rgba(13,5,24,0.6)",
                    border: "1px solid rgba(124,47,190,0.2)",
                    borderTop: exp.current ? "2px solid #1CC7D3" : "2px solid #7B2FBE",
                    borderRadius: 0,
                    width: "100%", maxWidth: 200, textAlign: "center",
                    cursor: "default",
                  }}>
                    {exp.current && (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 6 }}>
                        <div className="animate-pulse" style={{ width: 5, height: 5, borderRadius: "50%", background: "#1CC7D3" }} />
                        <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.18em", color: "#1CC7D3", textTransform: "uppercase" }}>
                          Active Deployment
                        </span>
                      </div>
                    )}
                    <h4 style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(220,200,255,0.85)", marginBottom: 3 }}>
                      {exp.role}
                    </h4>
                    <p style={{ fontSize: 10, color: "#9D4EDD", fontWeight: 600, letterSpacing: "0.05em" }}>
                      {exp.company}
                    </p>
                    <p style={{ fontSize: 8, color: "rgba(155,100,221,0.35)", marginTop: 4, letterSpacing: "0.06em" }}>
                      {exp.startDate} — {exp.endDate}
                    </p>
                    <p style={{ fontSize: 8, color: "rgba(155,100,221,0.25)", letterSpacing: "0.04em" }}>{exp.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Training Records (Education) */}
          <div style={{ borderTop: "1px solid rgba(124,47,190,0.15)", paddingTop: 14 }}>
            <h3 style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(155,100,221,0.4)", marginBottom: 10, textTransform: "uppercase" }}>
              // Training Records
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {education.map((edu) => (
                <div
                  key={edu.school}
                  style={{
                    padding: "10px 12px",
                    background: "rgba(13,5,24,0.5)",
                    border: "1px solid rgba(124,47,190,0.15)",
                    borderLeft: "2px solid rgba(124,47,190,0.4)",
                    borderRadius: 0, cursor: "default",
                  }}
                >
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(220,200,255,0.8)" }}>
                    {edu.degree}
                  </p>
                  <p style={{ fontSize: 9, color: "rgba(155,100,221,0.45)", marginTop: 2 }}>{edu.school}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontSize: 8, color: "rgba(155,100,221,0.3)", letterSpacing: "0.06em" }}>{edu.years}</span>
                    {edu.gpa && (
                      <span style={{ fontSize: 8, color: "#30d158", fontWeight: 700, letterSpacing: "0.08em" }}>GPA: {edu.gpa}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MacWindow>
      </div>
    </section>
  );
}
