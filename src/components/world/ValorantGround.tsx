"use client";

/**
 * ValorantGround — tactical map ground plane + subtle red grid.
 * Mimics the dark angular aesthetic of Valorant's in-game maps.
 */

import { useMemo } from "react";
import * as THREE from "three";

export function ValorantGround() {
  // Build a custom grid with very faint Valorant-red lines
  const gridMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color("#FF4654"),
      opacity: 0.06,
      transparent: true,
    });
  }, []);

  return (
    <>
      {/* Main dark ground plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, -40]}
        receiveShadow
      >
        <planeGeometry args={[250, 250]} />
        <meshStandardMaterial color="#0d1117" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Subtle tactical grid */}
      <gridHelper
        args={[250, 50, new THREE.Color("#FF4654"), new THREE.Color("#FF4654")]}
        position={[0, 0, -40]}
        material={gridMaterial}
      />

      {/* Slightly brighter secondary grid (larger cells) */}
      <gridHelper
        args={[250, 10, new THREE.Color("#FF4654"), new THREE.Color("#FF4654")]}
        position={[0, 0.005, -40]}
        material={
          new THREE.LineBasicMaterial({
            color: new THREE.Color("#FF4654"),
            opacity: 0.12,
            transparent: true,
          })
        }
      />

      {/* Playfield boundary — thin wall outlines so player knows the edges */}
      {/* North wall */}
      <mesh position={[0, 1, -100]}>
        <boxGeometry args={[250, 2, 0.3]} />
        <meshStandardMaterial color="#0d1117" emissive="#FF4654" emissiveIntensity={0.08} />
      </mesh>
      {/* South wall */}
      <mesh position={[0, 1, 10]}>
        <boxGeometry args={[250, 2, 0.3]} />
        <meshStandardMaterial color="#0d1117" emissive="#FF4654" emissiveIntensity={0.08} />
      </mesh>
      {/* West wall */}
      <mesh position={[-55, 1, -45]}>
        <boxGeometry args={[0.3, 2, 110]} />
        <meshStandardMaterial color="#0d1117" emissive="#FF4654" emissiveIntensity={0.08} />
      </mesh>
      {/* East wall */}
      <mesh position={[55, 1, -45]}>
        <boxGeometry args={[0.3, 2, 110]} />
        <meshStandardMaterial color="#0d1117" emissive="#FF4654" emissiveIntensity={0.08} />
      </mesh>

      {/* Scattered map crates (Valorant-style cover objects) */}
      {[
        [-10,  0, -14], [10,  0, -14],
        [-8,   0, -42], [8,   0, -42],
        [-14,  0, -68], [14,  0, -68],
        [0,    0, -36], [0,   0, -64],
        [-30,  0, -38], [30,  0, -38],
        [-30,  0, -20], [30,  0, -20],
      ].map(([x, , z], i) => (
        <mesh key={i} position={[x, 0.55, z]}>
          <boxGeometry args={[1.8, 1.1, 1.8]} />
          <meshStandardMaterial
            color="#151c24"
            emissive="#FF4654"
            emissiveIntensity={0.04}
            roughness={0.9}
          />
        </mesh>
      ))}
    </>
  );
}
