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

export function OmenJourney() {
  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      camera={{ position: [0, 10, 12], fov: 60 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={["#0f1923"]} />
      <Scene />
    </Canvas>
  );
}
