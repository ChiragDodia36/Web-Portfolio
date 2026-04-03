"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { OmenHUD } from "./OmenHUD";
import { OmenAbilityBar } from "./OmenAbilityBar";
import { Terminal } from "./Terminal";
import { ResumeViewer } from "./ResumeViewer";
import { Spotlight } from "./Spotlight";

export function DesktopLayout() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);

  const handleAppAction = useCallback((action: string) => {
    switch (action) {
      case "terminal":
        setTerminalOpen((prev) => !prev);
        break;
      case "resume":
        setResumeOpen((prev) => !prev);
        break;
    }
  }, []);

  // ⌘K for Spotlight
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSpotlightOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Valorant HUD — always visible */}
      <div className="pointer-events-auto">
        <OmenHUD />
      </div>

      {/* Ability bar — zone fast travel + app shortcuts */}
      <div className="pointer-events-auto">
        <OmenAbilityBar visible onAppAction={handleAppAction} />
      </div>

      {/* App windows */}
      <div className="pointer-events-auto">
        <AnimatePresence>
          {terminalOpen && (
            <Terminal key="terminal" isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {resumeOpen && (
            <ResumeViewer key="resume" isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {spotlightOpen && (
            <Spotlight
              key="spotlight"
              isOpen={spotlightOpen}
              onClose={() => setSpotlightOpen(false)}
              onAppAction={handleAppAction}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
