"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const submit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setName("");
        setEmail("");
        setMessage("");
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 0",
    borderRadius: 0,
    border: "none",
    borderBottom: "1px solid var(--card-border)",
    backgroundColor: "transparent",
    color: "var(--text-primary)",
    fontSize: "15px",
    outline: "none",
    marginBottom: "24px",
    fontFamily: "inherit",
  };

  return (
    <section id="contact" style={{ padding: "0 20px 120px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        style={{ padding: "40px 0" }}
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
          04 — Contact
        </p>

        <h2
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "32px",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.1,
            marginBottom: "32px",
          }}
        >
          Let&apos;s build something together.
        </h2>

        {status === "success" ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              fontSize: "13px",
              color: "var(--accent-violet)",
              marginBottom: "32px",
            }}
          >
            ✓ Message sent. I&apos;ll be in touch soon.
          </motion.p>
        ) : (
          <form onSubmit={submit} style={{ marginBottom: "36px" }}>
            <input
              style={inputStyle}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              style={inputStyle}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              style={{
                ...inputStyle,
                resize: "none",
                height: "100px",
                marginBottom: "28px",
              }}
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            {status === "error" && (
              <p
                style={{
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                  fontSize: "11px",
                  color: "var(--accent-red)",
                  marginBottom: "16px",
                }}
              >
                Something went wrong. Please try again.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                backgroundColor: "var(--text-primary)",
                color: "var(--bg)",
                border: "none",
                borderRadius: "4px",
                padding: "13px 28px",
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
                cursor: status === "loading" ? "wait" : "pointer",
                opacity: status === "loading" ? 0.6 : 1,
                transition: "opacity 200ms",
              }}
            >
              {status === "loading" ? "Sending…" : "Send Message →"}
            </button>
          </form>
        )}

        {/* Social links */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {[
            { label: "GitHub", href: "https://github.com/ChiragDodia36" },
            { label: "LinkedIn", href: "https://linkedin.com/in/chiragdodia" },
            {
              label: "chiragdodia36@gmail.com",
              href: "mailto:chiragdodia36@gmail.com",
            },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: "10px",
                letterSpacing: "0.08em",
                color: "var(--text-secondary)",
                textDecoration: "none",
                borderBottom: "1px solid var(--card-border)",
                paddingBottom: "2px",
                transition: "color 200ms, border-color 200ms",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
