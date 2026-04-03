"use client";

/**
 * ValorantAgent — visible player character in the 3D world.
 *
 * Reads playerState (written by ValorantController) every frame and
 * updates the group's position/rotation to match.
 *
 * Design: floating Valorant-red diamond (octahedron) + direction arrow
 * + ground shadow circle + red point light glow.
 */

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { playerState } from "@/lib/player-state";

export function ValorantAgent() {
  const groupRef  = useRef<THREE.Group>(null);
  const lightRef  = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Sync position + facing rotation
    groupRef.current.position.copy(playerState.position);
    groupRef.current.position.y = 0.5 + Math.sin(t * 3) * 0.08; // hover bob
    groupRef.current.rotation.y = playerState.yaw;

    // Pulse light intensity with velocity
    if (lightRef.current) {
      const speed = Math.abs(playerState.velocity);
      lightRef.current.intensity = 1.2 + speed * 6 + Math.sin(t * 4) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Diamond core */}
      <mesh>
        <octahedronGeometry args={[0.45]} />
        <meshStandardMaterial
          color="#FF4654"
          emissive="#FF4654"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Direction indicator (cone pointing forward −Z) */}
      <mesh position={[0, 0, -0.72]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.1, 0.28, 4]} />
        <meshStandardMaterial
          color="#FF4654"
          emissive="#FF4654"
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* Thin outer ring (wireframe-ish halo) */}
      <mesh>
        <torusGeometry args={[0.58, 0.03, 6, 32]} />
        <meshStandardMaterial
          color="#f0b232"
          emissive="#f0b232"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Ground shadow circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 0]}>
        <circleGeometry args={[0.65, 24]} />
        <meshBasicMaterial color="#FF4654" opacity={0.22} transparent depthWrite={false} />
      </mesh>

      {/* Red point light */}
      <pointLight
        ref={lightRef}
        color="#FF4654"
        intensity={1.5}
        distance={8}
        decay={2}
      />
    </group>
  );
}
