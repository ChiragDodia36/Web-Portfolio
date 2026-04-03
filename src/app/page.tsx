"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { DesktopLayout } from "@/components/desktop/DesktopLayout";
import { OmenZonePanels } from "@/components/world/OmenZonePanels";
import { BootScreen } from "@/components/ui/BootScreen";
import { MissionBriefing } from "@/components/ui/MissionBriefing";
import { TutorialOverlay } from "@/components/ui/TutorialOverlay";
import { ObjectivesTracker } from "@/components/ui/ObjectivesTracker";
import { LiveIntelWidget } from "@/components/ui/LiveIntelWidget";
import { MobileLayout } from "@/components/MobileLayout";
import { missionState } from "@/lib/mission-state";

// Load the 3D canvas client-side only (no SSR)
const OmenJourney = dynamic(
  () => import("@/components/world/OmenJourney").then((m) => m.OmenJourney),
  { ssr: false }
);

export default function Home() {
  const [phase, setPhase] = useState(missionState.phase);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    return missionState.onPhaseChange(setPhase);
  }, []);

  // Wait until screen size is known — prevents desktop boot/WASD from flashing on mobile
  if (isMobile === null) return null;

  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <main style={{ background: "#0f1923", height: "100vh", overflow: "hidden" }}>
      {/* Fixed full-screen 3D canvas */}
      <OmenJourney />

      {/* Zone-proximity HTML overlays */}
      <OmenZonePanels />

      {/* Fixed HUD overlay */}
      <DesktopLayout />

      {/* Objectives tracker — visible from tutorial phase onward */}
      {(phase === "tutorial" || phase === "active") && <ObjectivesTracker />}

      {/* Live Intel — top-right minimap widget */}
      {(phase === "tutorial" || phase === "active") && <LiveIntelWidget />}

      {/* Tutorial — non-blocking tooltips */}
      <AnimatePresence>
        {phase === "tutorial" && (
          <TutorialOverlay
            key="tutorial"
            onComplete={() => missionState._setPhase("active")}
          />
        )}
      </AnimatePresence>

      {/* Mission briefing — full-screen, blocks interaction */}
      <AnimatePresence>
        {phase === "briefing" && (
          <MissionBriefing
            key="briefing"
            onBegin={() => missionState._setPhase("tutorial")}
          />
        )}
      </AnimatePresence>

      {/* Boot screen — topmost */}
      <AnimatePresence>
        {phase === "boot" && (
          <BootScreen
            key="boot"
            onComplete={() => missionState._setPhase("briefing")}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
