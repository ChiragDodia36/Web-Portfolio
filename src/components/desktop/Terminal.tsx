"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experiences, education } from "@/data/experience";

interface TerminalLine {
  type: "input" | "output" | "ai" | "error";
  content: string;
}

const LOCAL_COMMANDS: Record<string, () => string> = {
  help: () =>
    `Available commands:
  whoami          — Who am I?
  ls projects     — List all projects
  cat resume      — View resume highlights
  skills --all    — Show all skills
  experience      — Work experience
  education       — Education history
  contact         — Contact info
  clear           — Clear terminal
  echo <text>     — Echo text back
  date            — Show current date

Anything else is sent to the AI →  ask me anything naturally!`,

  whoami: () =>
    `Chirag Dodia
Mobile & Full-Stack Engineer
MS Computer Science — Indiana University Bloomington
Currently: Software Engineer (Mobile) @ Indiana University`,

  "ls projects": () =>
    projects
      .map(
        (p) =>
          `${p.featured ? "★" : " "} ${p.icon} ${p.title.padEnd(25)} [${p.category}]  ${p.tags.slice(0, 3).join(", ")}`
      )
      .join("\n"),

  "cat resume": () =>
    `╔══════════════════════════════════════╗
║        CHIRAG DODIA                  ║
║   Mobile & Full-Stack Engineer       ║
╚══════════════════════════════════════╝

EXPERIENCE:
  → Software Engineer (Mobile) @ Indiana University  [Nov 2025 - Present]
  → Software Engineer @ L&T Financial Services       [Jul 2023 - Jun 2024]
  → Full Stack Developer @ DotMinds LLP              [Mar 2022 - Sep 2022]

EDUCATION:
  → MS Computer Science, Indiana University (GPA: 3.65)
  → BE Information Technology, University of Mumbai (CGPA: 8.83)

SKILLS: TypeScript, Python, Swift, React Native, SwiftUI, Next.js, FastAPI, Docker, AWS
AI/ML:  TensorFlow, PyTorch, LangChain, OpenAI API

📄 Type 'open resume' to view full resume PDF`,

  "skills --all": () =>
    skillCategories
      .map(
        (cat) =>
          `[${cat.label}]\n  ${cat.skills.map((s) => `${s.name} (${s.proficiency}%)`).join(", ")}`
      )
      .join("\n\n"),

  experience: () =>
    experiences
      .map(
        (exp) =>
          `${exp.current ? "● " : "  "}${exp.role}\n    ${exp.company} — ${exp.location}\n    ${exp.startDate} - ${exp.endDate}`
      )
      .join("\n\n"),

  education: () =>
    education
      .map(
        (edu) =>
          `🎓 ${edu.degree}\n   ${edu.school}\n   ${edu.years}${edu.gpa ? ` — ${edu.gpa}` : ""}`
      )
      .join("\n\n"),

  contact: () =>
    `📧 chiragdodia36@gmail.com
🔗 github.com/ChiragDodia36
💼 linkedin.com/in/chiragdodia

Feel free to reach out! 👋`,

  date: () => new Date().toLocaleString(),
};

// Chat history for AI context (separate from terminal lines)
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Terminal({ isOpen, onClose }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "output",
      content: `Welcome to Chirag's AI Terminal
Type 'help' for commands, or ask me anything naturally.
`,
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, isLoading]);

  async function handleCommand(cmd: string) {
    const trimmed = cmd.trim();
    const lower = trimmed.toLowerCase();

    if (!trimmed) return;

    const newLines: TerminalLine[] = [...lines, { type: "input", content: cmd }];

    if (lower === "clear") {
      setLines([]);
      setInput("");
      setChatHistory([]);
      return;
    }

    if (lower === "open resume") {
      window.open("/resume.pdf", "_blank");
      newLines.push({ type: "output", content: "Opening resume.pdf..." });
    } else if (lower.startsWith("echo ")) {
      newLines.push({ type: "output", content: cmd.slice(5) });
    } else if (LOCAL_COMMANDS[lower]) {
      newLines.push({ type: "output", content: LOCAL_COMMANDS[lower]() });
    } else {
      // Unknown command → send to AI
      newLines.push({ type: "output", content: "" }); // spacer
      setLines(newLines);
      setInput("");
      setHistory((prev) => [cmd, ...prev]);
      setHistoryIndex(-1);
      setIsLoading(true);

      const updatedChat: ChatMessage[] = [
        ...chatHistory,
        { role: "user", content: trimmed },
      ];
      setChatHistory(updatedChat);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedChat }),
        });

        if (!response.ok) throw new Error("API error");

        const data = await response.json();
        const aiReply = data.message as string;

        setChatHistory((prev) => [...prev, { role: "assistant", content: aiReply }]);
        setLines((prev) => [...prev, { type: "ai", content: aiReply }]);
      } catch {
        setLines((prev) => [
          ...prev,
          {
            type: "error",
            content: "ai: connection failed. Set GROQ_API_KEY in .env.local",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setLines(newLines);
    setInput("");
    setHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      if (history[newIndex]) setInput(history[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? "" : history[newIndex]);
    }
  }

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-16 right-4 w-[520px] max-w-[calc(100vw-2rem)] z-[80]"
    >
      <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        {/* Title bar */}
        <div className="h-7 flex items-center px-3 bg-[rgba(28,28,32,0.98)] backdrop-blur-md border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex gap-1.5">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"
            />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="flex-1 text-center text-[11px] text-white/30 font-medium">
            chirag@portfolio — AI Terminal
          </span>
          <span className="text-[9px] text-[#bf5af2]/60 font-medium tracking-wide">✦ AI</span>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="bg-[rgba(6,6,10,0.96)] p-3 h-[380px] overflow-y-auto font-mono text-[12px] leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div key={i} className="mb-1">
              {line.type === "input" && (
                <div>
                  <span className="text-[#28c840]">chirag@portfolio</span>
                  <span className="text-white/25">:</span>
                  <span className="text-[#88aaff]">~</span>
                  <span className="text-white/35">$ </span>
                  <span className="text-white/80">{line.content}</span>
                </div>
              )}
              {line.type === "output" && line.content && (
                <pre className="text-white/55 whitespace-pre-wrap">{line.content}</pre>
              )}
              {line.type === "ai" && (
                <div className="mt-1 mb-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[#bf5af2]">✦</span>
                    <span className="text-[10px] text-[#bf5af2]/60 tracking-widest uppercase">ai</span>
                  </div>
                  <pre className="text-[#c8aaff]/80 whitespace-pre-wrap pl-3 border-l border-[#bf5af2]/20">
                    {line.content}
                  </pre>
                </div>
              )}
              {line.type === "error" && (
                <span className="text-[#ff453a]/80">{line.content}</span>
              )}
            </div>
          ))}

          {/* AI loading indicator */}
          {isLoading && (
            <div className="mb-1 mt-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[#bf5af2]">✦</span>
                <span className="text-[10px] text-[#bf5af2]/60 tracking-widest uppercase">ai</span>
              </div>
              <div className="flex gap-1 pl-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    className="w-1.5 h-1.5 rounded-full bg-[#bf5af2]/50"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Current input line */}
          {!isLoading && (
            <div className="flex items-center">
              <span className="text-[#28c840]">chirag@portfolio</span>
              <span className="text-white/25">:</span>
              <span className="text-[#88aaff]">~</span>
              <span className="text-white/35">$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white/80 outline-none caret-[#28c840] font-mono text-[12px]"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
