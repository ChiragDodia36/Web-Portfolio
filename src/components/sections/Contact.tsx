"use client";

import { useState, useRef } from "react";
import { MacWindow } from "@/components/desktop/MacWindow";
import { sendEmail } from "@/lib/email";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");
    try {
      await sendEmail(formRef.current);
      setStatus("sent");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    background: "rgba(13,5,24,0.8)",
    border: "1px solid rgba(124,47,190,0.3)",
    borderRadius: 0,
    fontSize: 13,
    color: "rgba(220,200,255,0.85)",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box" as const,
    transition: "border-color 200ms",
  };

  return (
    <section id="contact" className="w-full flex items-center relative">
      <div className="max-w-4xl mx-auto px-6 py-4 w-full">
        <MacWindow title="Signal Drop // Open Channel">
          <div className="max-w-md mx-auto">
            <p style={{ fontSize: 12, color: "rgba(155,100,221,0.5)", marginBottom: 16, textAlign: "center", letterSpacing: "0.06em" }}>
              Send a signal into the shadows
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(155,100,221,0.4)", display: "block", marginBottom: 4 }}>
                  Agent Identifier
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  style={inputStyle}
                  placeholder="Your name"
                  onFocus={(e) => { e.target.style.borderColor = "rgba(157,78,221,0.6)"; e.target.style.boxShadow = "0 0 12px rgba(157,78,221,0.12)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(124,47,190,0.3)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div>
                <label style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(155,100,221,0.4)", display: "block", marginBottom: 4 }}>
                  Secure Frequency
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  style={inputStyle}
                  placeholder="your@email.com"
                  onFocus={(e) => { e.target.style.borderColor = "rgba(157,78,221,0.6)"; e.target.style.boxShadow = "0 0 12px rgba(157,78,221,0.12)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(124,47,190,0.3)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div>
                <label style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(155,100,221,0.4)", display: "block", marginBottom: 4 }}>
                  Transmission
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  style={{ ...inputStyle, resize: "none" }}
                  placeholder="Tell me about your project..."
                  onFocus={(e) => { e.target.style.borderColor = "rgba(157,78,221,0.6)"; e.target.style.boxShadow = "0 0 12px rgba(157,78,221,0.12)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(124,47,190,0.3)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  width: "100%",
                  padding: "10px 0",
                  background: status === "sent" ? "rgba(48,209,88,0.2)" : "rgba(123,47,190,0.3)",
                  border: status === "sent" ? "1px solid #30d158" : "1px solid rgba(157,78,221,0.5)",
                  color: status === "sent" ? "#30d158" : "#C77DFF",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  borderRadius: 0,
                  fontFamily: "inherit",
                  opacity: status === "sending" ? 0.6 : 1,
                  transition: "all 200ms",
                }}
              >
                {status === "idle"    && "[TRANSMIT]"}
                {status === "sending" && "// TRANSMITTING..."}
                {status === "sent"    && "[SIGNAL RECEIVED]"}
                {status === "error"   && "[TRANSMISSION FAILED — RETRY]"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <a
                href="mailto:chiragdodia36@gmail.com"
                style={{ fontSize: 10, color: "rgba(155,100,221,0.35)", letterSpacing: "0.1em", textDecoration: "none", transition: "color 200ms" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(199,125,255,0.65)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(155,100,221,0.35)"; }}
              >
                // DIRECT LINK: chiragdodia36@gmail.com
              </a>
            </div>
          </div>
        </MacWindow>
      </div>
    </section>
  );
}
