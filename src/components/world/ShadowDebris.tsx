"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ShardProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  type: "tetra" | "octa";
  rotSpeed: [number, number, number];
}

function Shard({ position, rotation, scale, type, rotSpeed }: ShardProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0d0518"),
        emissive: new THREE.Color("#2d1b4e"),
        emissiveIntensity: 0.3,
        roughness: 0.8,
        metalness: 0.2,
        transparent: true,
        opacity: 0.75,
      }),
    []
  );

  useFrame(({ clock, camera }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x += rotSpeed[0] * 0.005;
    meshRef.current.rotation.y += rotSpeed[1] * 0.005;
    meshRef.current.rotation.z += rotSpeed[2] * 0.005;

    // Float gently
    meshRef.current.position.y = position[1] + Math.sin(t * 0.2 + position[0]) * 0.3;

    // Proximity emissive boost
    const dx = camera.position.x - position[0];
    const dy = camera.position.y - position[1];
    const dz = camera.position.z - position[2];
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const prox = Math.max(0, 1 - dist / 15);
    material.emissiveIntensity = 0.2 + prox * 0.8;
    material.opacity = 0.6 + prox * 0.35;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} material={material}>
      {type === "tetra" ? (
        <tetrahedronGeometry args={[1, 0]} />
      ) : (
        <octahedronGeometry args={[1, 0]} />
      )}
    </mesh>
  );
}

// Pre-seeded debris layout
const DEBRIS: ShardProps[] = [
  { position: [-8, 3, -8],    rotation: [0.5, 0.3, 0.1],  scale: 0.9,  type: "tetra", rotSpeed: [0.7, 1.2, 0.3] },
  { position: [7, -3, -12],   rotation: [1.2, 0.8, 0.5],  scale: 0.6,  type: "octa",  rotSpeed: [1.0, 0.5, 0.8] },
  { position: [-5, -4, -18],  rotation: [0.1, 1.5, 0.9],  scale: 1.1,  type: "tetra", rotSpeed: [0.4, 0.9, 1.1] },
  { position: [14, 3, -22],   rotation: [0.8, 0.2, 1.3],  scale: 0.7,  type: "octa",  rotSpeed: [1.2, 0.3, 0.6] },
  { position: [-16, 1, -25],  rotation: [1.1, 0.7, 0.4],  scale: 0.8,  type: "tetra", rotSpeed: [0.6, 1.4, 0.2] },
  { position: [5, 4, -30],    rotation: [0.3, 1.0, 0.7],  scale: 1.2,  type: "octa",  rotSpeed: [0.8, 0.7, 1.3] },
  { position: [-10, -2, -34], rotation: [0.9, 0.4, 1.2],  scale: 0.65, type: "tetra", rotSpeed: [1.1, 0.6, 0.4] },
  { position: [18, -1, -38],  rotation: [0.2, 1.3, 0.6],  scale: 0.75, type: "octa",  rotSpeed: [0.5, 1.0, 0.9] },
  { position: [-3, 5, -40],   rotation: [1.4, 0.1, 0.8],  scale: 0.9,  type: "tetra", rotSpeed: [0.9, 0.4, 1.2] },
  { position: [8, -4, -45],   rotation: [0.6, 0.9, 0.3],  scale: 1.0,  type: "octa",  rotSpeed: [0.3, 1.1, 0.7] },
  { position: [-14, 2, -48],  rotation: [1.0, 0.5, 1.1],  scale: 0.55, type: "tetra", rotSpeed: [1.3, 0.2, 0.5] },
  { position: [4, 3, -52],    rotation: [0.4, 1.2, 0.2],  scale: 0.85, type: "octa",  rotSpeed: [0.7, 0.8, 1.0] },
  { position: [-7, -5, -55],  rotation: [1.3, 0.6, 0.9],  scale: 0.70, type: "tetra", rotSpeed: [0.6, 1.3, 0.4] },
  { position: [10, 4, -58],   rotation: [0.7, 0.3, 1.4],  scale: 0.95, type: "octa",  rotSpeed: [1.0, 0.6, 0.8] },
  { position: [-2, -3, -62],  rotation: [0.2, 1.1, 0.5],  scale: 0.60, type: "tetra", rotSpeed: [0.4, 0.9, 1.2] },
];

export function ShadowDebris() {
  return (
    <>
      {DEBRIS.map((props, i) => (
        <Shard key={i} {...props} />
      ))}
    </>
  );
}
