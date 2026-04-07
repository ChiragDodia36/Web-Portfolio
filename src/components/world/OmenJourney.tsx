"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ValorantController } from "./ValorantController";
import { ValorantAgent } from "./ValorantAgent";
import { ValorantGround } from "./ValorantGround";
import { ValorantSites } from "./ValorantSites";
import { ShadowParticles } from "./ShadowParticles";
import { ShadowDebris } from "./ShadowDebris";
import { zoneControl } from "@/lib/zone-control";

function ValorantLighting() {
  return (
    <>
      {/* Valorant map — near-total darkness, red accent lights */}
      <fog attach="fog" args={["#0f1923", 35, 110]} />
      <ambientLight intensity={0.15} color="#1a2030" />

      {/* Zone point lights (red) */}
      <pointLight position={[0,   6,   0]}  color="#FF4654" intensity={1.2} distance={28} />
      <pointLight position={[-22, 5, -28]}  color="#FF4654" intensity={1.0} distance={22} />
      <pointLight position={[22,  5, -28]}  color="#FF4654" intensity={1.0} distance={22} />
      <pointLight position={[-22, 5, -56]}  color="#FF4654" intensity={0.9} distance={22} />
      <pointLight position={[22,  5, -56]}  color="#FF4654" intensity={0.9} distance={22} />
      <pointLight position={[0,   5, -80]}  color="#FF4654" intensity={1.2} distance={28} />

      {/* Teal fill + soft directional */}
      <pointLight position={[0,  10, -40]}  color="#1eb2a6" intensity={0.25} distance={60} />
      <directionalLight position={[5, 10, 5]} intensity={0.12} color="#ece8e1" />
    </>
  );
}

function Scene() {
  const [activeZone, setActiveZone] = useState(0);
  const [visitedZones, setVisitedZones] = useState<Set<number>>(
    new Set(zoneControl.visitedZones)
  );

  useEffect(() => {
    const unsubZone = zoneControl.onZoneChange((zone) => setActiveZone(zone));
    const unsubVisited = zoneControl.onVisitedChange((v) =>
      setVisitedZones(new Set(v))
    );
    return () => {
      unsubZone();
      unsubVisited();
    };
  }, []);

  return (
    <>
      <ValorantController />
      <Suspense fallback={null}>
        <ValorantLighting />
        <ValorantGround />
        <ValorantSites activeZone={activeZone} visitedZones={visitedZones} />
        <ValorantAgent />
        <ShadowParticles />
        <ShadowDebris />
      </Suspense>
    </>
  );
}

function ClickToPlayHint() {
  const [locked, setLocked] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const isLocked = !!document.pointerLockElement;
      setLocked(isLocked);
      if (isLocked) setDismissed(true);
    };
    document.addEventListener("pointerlockchange", onChange);
    return () => document.removeEventListener("pointerlockchange", onChange);
  }, []);

  // Hide once locked — keep hidden for the session
  if (locked || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 72,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 5,
        background: "rgba(10, 15, 22, 0.9)",
        border: "1px solid rgba(255,70,84,0.45)",
        borderTop: "2px solid #FF4654",
        padding: "7px 20px",
        pointerEvents: "none",
        backdropFilter: "blur(8px)",
        boxShadow: "0 0 16px rgba(255,70,84,0.15)",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span style={{ color: "#FF4654", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em" }}>
        CLICK TO CONTROL
      </span>
      <span style={{ color: "rgba(236,232,225,0.35)", fontSize: 9, letterSpacing: "0.1em" }}>·</span>
      <span style={{ color: "rgba(236,232,225,0.55)", fontSize: 9, letterSpacing: "0.12em" }}>
        WASD MOVE · MOUSE AIM · ESC RELEASE
      </span>
    </div>
  );
}

export function OmenJourney() {
  return (
    <>
      <Canvas
        style={{ position: "fixed", inset: 0, zIndex: 0 }}
        camera={{ position: [0, 10, 12], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#0f1923"]} />
        <Scene />
      </Canvas>
      <ClickToPlayHint />
    </>
  );
}
