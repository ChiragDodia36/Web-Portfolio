"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface SiriAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SiriAssistant({ isOpen, onClose }: SiriAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, I'm having trouble connecting right now. Please make sure the GROQ_API_KEY is configured in .env.local",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-16 right-4 w-[380px] max-w-[calc(100vw-2rem)] z-[80]"
    >
      <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
        {/* Title bar */}
        <div className="h-8 flex items-center px-3 bg-[rgba(30,30,35,0.95)] backdrop-blur-md border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex gap-1.5">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"
            />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="flex-1 text-center text-[11px] text-white/40 font-medium">
            Siri — Ask Chirag&apos;s AI
          </span>
        </div>

        {/* Chat body */}
        <div className="bg-[rgba(15,15,20,0.95)] backdrop-blur-md">
          {/* Siri orb when empty */}
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center py-8 px-4">
              {/* Animated orb */}
              <div className="relative w-16 h-16 mb-4">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(136,170,255,0.4) 0%, rgba(191,90,242,0.3) 50%, transparent 70%)",
                  }}
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute inset-[-8px] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(136,170,255,0.15) 0%, transparent 60%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xl">
                  ✦
                </div>
              </div>
              <p className="text-sm text-white/50 text-center">
                Ask me anything about Chirag
              </p>
              <p className="text-[10px] text-white/25 text-center mt-1">
                Skills, experience, projects, education...
              </p>

              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
                {[
                  "What are your skills?",
                  "Tell me about your experience",
                  "What projects have you built?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInput(suggestion);
                      setTimeout(() => {
                        const form = inputRef.current?.closest("form");
                        if (form)
                          form.dispatchEvent(
                            new Event("submit", { bubbles: true })
                          );
                      }, 50);
                    }}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-white/40 hover:bg-[rgba(136,170,255,0.1)] hover:text-accent-blue hover:border-[rgba(136,170,255,0.2)] transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {(messages.length > 0 || isLoading) && (
            <div ref={scrollRef} className="h-[300px] overflow-y-auto p-3 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[rgba(136,170,255,0.15)] text-white/80 rounded-br-md"
                        : "bg-[rgba(255,255,255,0.05)] text-white/70 rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="px-3 py-2 rounded-2xl rounded-bl-md bg-[rgba(255,255,255,0.05)]">
                    <motion.div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                          className="w-1.5 h-1.5 rounded-full bg-white/30"
                        />
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-[rgba(255,255,255,0.06)]"
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Chirag..."
                className="flex-1 px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-[rgba(136,170,255,0.3)] transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-3 py-2 rounded-xl bg-[rgba(136,170,255,0.12)] text-accent-blue text-sm font-medium hover:bg-[rgba(136,170,255,0.2)] transition-colors disabled:opacity-30"
              >
                ↑
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
