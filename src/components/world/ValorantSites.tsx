"use client";

/**
 * ValorantSites — Valorant bomb-site style zone markers.
 *
 * Each zone has:
 *   • Large floor ring (glows brighter when active)
 *   • Faint fill circle
 *   • Vertical glowing beacon pillar (taller + pulsing for unvisited, dim teal for visited)
 *   • Red point light when active
 *
 * Zone letters: SPAWN / A / B / C / D / E
 */

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export const ZONE_LABELS = ["SPAWN", "A", "B", "C", "D", "E"];

const ZONE_INFO: { name: string; desc: string }[] = [
  { name: "SPAWN",     desc: "Starting Point"    },
  { name: "LORE",      desc: "About Me"          },
  { name: "LOADOUT",   desc: "Skills & Tech"     },
  { name: "CONTRACTS", desc: "Projects"          },
  { name: "HISTORY",   desc: "Work Experience"   },
  { name: "COMMS",     desc: "Contact Me"        },
];

const ZONE_POSITIONS: [number, number, number][] = [
  [0,   0,   0],
  [-22, 0, -28],
  [22,  0, -28],
  [-22, 0, -56],
  [22,  0, -56],
  [0,   0, -80],
];

interface SiteProps {
  position: [number, number, number];
  label: string;
  zoneIndex: number;
  activeZone: number;
  visited: boolean;
}

function Site({ position, zoneIndex, activeZone, visited }: SiteProps) {
  const [hovered, setHovered] = useState(false);
  const ringRef    = useRef<THREE.Mesh>(null);
  const fillRef    = useRef<THREE.Mesh>(null);
  const pillarRef  = useRef<THREE.Mesh>(null);
  const beaconRef  = useRef<THREE.Mesh>(null);
  const diamondRef = useRef<THREE.Mesh>(null);
  const lightRef   = useRef<THREE.PointLight>(null);
  const beaconLightRef = useRef<THREE.PointLight>(null);

  const ringMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FF4654"),
        emissive: new THREE.Color("#FF4654"),
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      }),
    []
  );

  const fillMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FF4654"),
        transparent: true,
        opacity: 0.03,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    []
  );

  const pillarMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FF4654"),
        emissive: new THREE.Color("#FF4654"),
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.7,
      }),
    []
  );

  // Beacon material: orange-red for unvisited, teal for visited
  const beaconMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(visited ? "#1eb2a6" : "#FF6B35"),
        emissive: new THREE.Color(visited ? "#1eb2a6" : "#FF6B35"),
        emissiveIntensity: visited ? 0.2 : 0.7,
        transparent: true,
        opacity: visited ? 0.4 : 0.85,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const isActive = zoneIndex === activeZone;

    const targetRingIntensity = isActive ? 1.8 + Math.sin(t * 2.5) * 0.3 : 0.35;
    ringMat.emissiveIntensity += (targetRingIntensity - ringMat.emissiveIntensity) * 0.06;
    ringMat.opacity = isActive ? 1.0 : 0.7;

    fillMat.opacity = isActive ? 0.07 + Math.sin(t * 2) * 0.015 : 0.025;

    const targetPillarIntensity = isActive ? 1.2 + Math.sin(t * 3) * 0.2 : 0.25;
    pillarMat.emissiveIntensity += (targetPillarIntensity - pillarMat.emissiveIntensity) * 0.06;

    if (pillarRef.current) {
      pillarRef.current.rotation.y += 0.008;
    }

    if (lightRef.current) {
      lightRef.current.intensity = isActive ? 2.5 + Math.sin(t * 3) * 0.4 : 0;
    }

    // Beacon: pulse when unvisited, stay dim when visited
    if (beaconMat) {
      if (visited) {
        beaconMat.emissiveIntensity = 0.15;
        beaconMat.opacity = 0.35;
      } else if (!isActive) {
        const pulse = 0.6 + Math.sin(t * 1.5) * 0.4;
        beaconMat.emissiveIntensity = pulse;
        beaconMat.opacity = 0.7 + Math.sin(t * 1.5) * 0.15;
      }
    }

    if (beaconLightRef.current) {
      if (visited) {
        beaconLightRef.current.intensity = 0;
      } else if (!isActive) {
        beaconLightRef.current.intensity = 0.6 + Math.sin(t * 1.5) * 0.25;
      } else {
        beaconLightRef.current.intensity = 0;
      }
    }

    if (diamondRef.current) {
      diamondRef.current.rotation.y += visited ? 0.002 : 0.012;
    }
    if (beaconRef.current) {
      beaconRef.current.rotation.y += 0.004;
    }
  });

  const info = ZONE_INFO[zoneIndex];

  return (
    <group position={position}>
      {/* Invisible hover target — large flat disc */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
      >
        <circleGeometry args={[5.5, 32]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* 3D hover label */}
      {hovered && (
        <Html
          center
          position={[0, 2.5, 0]}
          distanceFactor={14}
          style={{ pointerEvents: "none" }}
        >
          <div style={{
            background: "rgba(10, 15, 22, 0.92)",
            border: "1px solid rgba(255,70,84,0.6)",
            borderTop: "2px solid #FF4654",
            padding: "8px 14px",
            minWidth: 130,
            textAlign: "center",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 16px rgba(255,70,84,0.25), 0 4px 16px rgba(0,0,0,0.6)",
          }}>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#FF4654",
              fontFamily: "Rajdhani, system-ui, sans-serif",
              marginBottom: 3,
            }}>
              {info.name}
            </div>
            <div style={{
              fontSize: 10,
              letterSpacing: "0.08em",
              color: "rgba(236,232,225,0.75)",
              fontFamily: "Rajdhani, system-ui, sans-serif",
              textTransform: "uppercase",
            }}>
              {info.desc}
            </div>
            {/* Small triangle pointer */}
            <div style={{
              position: "absolute",
              bottom: -6,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid rgba(255,70,84,0.6)",
            }} />
          </div>
        </Html>
      )}

      {/* Outer ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} material={ringMat}>
        <ringGeometry args={[4.5, 4.85, 64]} />
      </mesh>

      {/* Inner thinner ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={ringMat}>
        <ringGeometry args={[2.2, 2.42, 48]} />
      </mesh>

      {/* Fill */}
      <mesh ref={fillRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} material={fillMat}>
        <circleGeometry args={[4.5, 64]} />
      </mesh>

      {/* Original short pillar (always visible) */}
      <mesh ref={pillarRef} position={[0, 2.5, 0]} material={pillarMat}>
        <cylinderGeometry args={[0.05, 0.05, 5, 8]} />
      </mesh>

      {/* Pillar top cap */}
      <mesh position={[0, 5.1, 0]} material={pillarMat}>
        <octahedronGeometry args={[0.2]} />
      </mesh>

      {/* Tall beacon (only for non-SPAWN zones) */}
      {zoneIndex > 0 && (
        <>
          <mesh ref={beaconRef} position={[0, 9, 0]} material={beaconMat}>
            <cylinderGeometry args={[0.06, 0.06, 8, 8]} />
          </mesh>
          <mesh ref={diamondRef} position={[0, 13.2, 0]} material={beaconMat}>
            <octahedronGeometry args={[0.35]} />
          </mesh>
          {/* Beacon ambient glow light */}
          <pointLight
            ref={beaconLightRef}
            color={visited ? "#1eb2a6" : "#FF6B35"}
            intensity={0}
            distance={18}
            decay={2}
            position={[0, 10, 0]}
          />
        </>
      )}

      {/* Active site glow */}
      <pointLight
        ref={lightRef}
        color="#FF4654"
        intensity={0}
        distance={20}
        decay={2}
      />
    </group>
  );
}

interface ValorantSitesProps {
  activeZone: number;
  visitedZones?: Set<number>;
}

export function ValorantSites({ activeZone, visitedZones }: ValorantSitesProps) {
  const visited = visitedZones ?? new Set([0]);
  return (
    <>
      {ZONE_POSITIONS.map((pos, i) => (
        <Site
          key={i}
          position={pos}
          label={ZONE_LABELS[i]}
          zoneIndex={i}
          activeZone={activeZone}
          visited={visited.has(i)}
        />
      ))}
    </>
  );
}
