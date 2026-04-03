"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const SMOKE_COUNT = 4000;
const SPARK_COUNT = 800;

function generateSmokePositions(): Float32Array {
  const pos = new Float32Array(SMOKE_COUNT * 3);
  for (let i = 0; i < SMOKE_COUNT; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 80;  // X: ±40
    pos[i * 3 + 1] = (Math.random() - 0.5) * 40;  // Y: ±20
    pos[i * 3 + 2] = Math.random() * -65;           // Z: 0 → -65 (entire journey)
  }
  return pos;
}

// Sparks clustered near each zone center
const ZONE_POSITIONS: [number, number, number][] = [
  [0,    0,   0],
  [-12,  0, -20],
  [10,  -2, -32],
  [-6,   2, -44],
  [14,   1, -36],
  [0,   -4, -56],
];

function generateSparkPositions(): Float32Array {
  const pos = new Float32Array(SPARK_COUNT * 3);
  for (let i = 0; i < SPARK_COUNT; i++) {
    const zone = ZONE_POSITIONS[Math.floor(Math.random() * ZONE_POSITIONS.length)];
    pos[i * 3]     = zone[0] + (Math.random() - 0.5) * 12;
    pos[i * 3 + 1] = zone[1] + (Math.random() - 0.5) * 8;
    pos[i * 3 + 2] = zone[2] + (Math.random() - 0.5) * 8;
  }
  return pos;
}

const smokePositions = generateSmokePositions();
const sparkPositions = generateSparkPositions();

export function ShadowParticles() {
  const smokeRef = useRef<THREE.Points>(null);
  const sparkRef = useRef<THREE.Points>(null);

  // Per-particle Y offsets for drift
  const smokeOffsets = useMemo(
    () => new Float32Array(SMOKE_COUNT).map(() => Math.random() * Math.PI * 2),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (smokeRef.current) {
      const mat = smokeRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.18 + Math.sin(t * 0.3) * 0.07;
      // Very slow upward smoke drift
      const positions = smokeRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < SMOKE_COUNT; i++) {
        positions[i * 3 + 1] += 0.0004 + Math.sin(smokeOffsets[i] + t * 0.1) * 0.0002;
        // Wrap at bounds
        if (positions[i * 3 + 1] > 22) positions[i * 3 + 1] = -22;
      }
      smokeRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (sparkRef.current) {
      const mat = sparkRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.35 + Math.sin(t * 0.8) * 0.2;
    }
  });

  return (
    <>
      {/* Purple smoke — fills the entire void */}
      <Points ref={smokeRef} positions={smokePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4a1a7a"
          size={0.04}
          sizeAttenuation
          depthWrite={false}
          opacity={0.2}
        />
      </Points>

      {/* Bright sparks near zone centers */}
      <Points ref={sparkRef} positions={sparkPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#C77DFF"
          size={0.025}
          sizeAttenuation
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </>
  );
}
