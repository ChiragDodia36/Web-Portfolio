"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormState>("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid var(--card-border)",
    backgroundColor: "var(--card-glass)",
    color: "var(--text-primary)",
    fontSize: "15px",
    outline: "none",
    marginBottom: "12px",
    fontFamily: "inherit",
  };

  return (
    <section id="contact" style={{ padding: "0 20px 120px" }}>
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
          Contact
        </p>

        {status === "success" ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: "var(--accent-indigo)", fontSize: "15px" }}
          >
            Message sent! I'll get back to you soon.
          </motion.p>
        ) : (
          <form onSubmit={submit}>
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
              style={{ ...inputStyle, resize: "none", height: "120px", marginBottom: "16px" }}
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            {status === "error" && (
              <p style={{ color: "#EF4444", fontSize: "13px", marginBottom: "12px" }}>
                Something went wrong. Please try again.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: "var(--accent-indigo)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 500,
                cursor: status === "loading" ? "wait" : "pointer",
                opacity: status === "loading" ? 0.7 : 1,
                transition: "opacity 200ms",
              }}
            >
              {status === "loading" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}

        <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
          <a
            href="https://github.com/ChiragDodia36"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "10px 20px",
              borderRadius: "12px",
              border: "1px solid var(--card-border)",
              color: "var(--text-primary)",
              textDecoration: "none",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/chiragdodia"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "10px 20px",
              borderRadius: "12px",
              border: "1px solid var(--card-border)",
              color: "var(--text-primary)",
              textDecoration: "none",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}
