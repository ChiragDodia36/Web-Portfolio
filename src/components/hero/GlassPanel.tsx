"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface GlassPanelProps {
  position: [number, number, number];
  size: [number, number, number];
  opacity?: number;
  floatSpeed?: number;
  floatAmplitude?: number;
  floatPhase?: number;
  fillColor?: string;
}

const MAX_TILT = 0.12; // radians
const LERP_SPEED = 0.08;

export function GlassPanel({
  position,
  size,
  opacity = 0.06,
  floatSpeed = 1,
  floatAmplitude = 0.08,
  floatPhase = 0,
  fillColor,
}: GlassPanelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseY = position[1];
  const [hovered, setHovered] = useState(false);
  const mouseOffset = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const currentEmissive = useRef(0);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Floating animation
    meshRef.current.position.y =
      baseY + Math.sin(t * floatSpeed + floatPhase) * floatAmplitude;

    // Mouse tilt — lerp toward cursor offset when hovered
    const targetRotX = hovered ? -mouseOffset.current.y * MAX_TILT : 0;
    const targetRotY = hovered ? mouseOffset.current.x * MAX_TILT : 0;
    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x,
      targetRotX,
      LERP_SPEED
    );
    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y,
      targetRotY,
      LERP_SPEED
    );
    meshRef.current.rotation.x = currentRotation.current.x;
    meshRef.current.rotation.y = currentRotation.current.y;

    // Emissive glow on hover
    const targetEmissive = hovered ? 0.08 : 0;
    currentEmissive.current = THREE.MathUtils.lerp(
      currentEmissive.current,
      targetEmissive,
      0.06
    );
    const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
    mat.emissiveIntensity = currentEmissive.current;
  });

  const material = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: fillColor ? new THREE.Color(fillColor) : new THREE.Color(0xffffff),
      transparent: true,
      opacity,
      roughness: 0.1,
      metalness: 0.0,
      clearcoat: 0.3,
      clearcoatRoughness: 0.4,
      transmission: 0.2,
      side: THREE.DoubleSide,
      depthWrite: false,
      emissive: new THREE.Color("#88aaff"),
      emissiveIntensity: 0,
    });
    return mat;
  }, [opacity, fillColor]);

  return (
    <group>
      <RoundedBox
        ref={meshRef}
        args={size}
        radius={0.08}
        smoothness={4}
        position={position}
        material={material}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        onPointerMove={(e) => {
          // Normalize mouse offset relative to panel center (-0.5 to 0.5)
          const bounds = [size[0], size[1]];
          mouseOffset.current.x = (e.point.x - position[0]) / bounds[0];
          mouseOffset.current.y = (e.point.y - position[1]) / bounds[1];
        }}
      />
      {/* Top specular highlight line */}
      <mesh
        position={[
          position[0],
          position[1] + size[1] / 2 - 0.02,
          position[2] + 0.01,
        ]}
      >
        <planeGeometry args={[size[0] * 0.85, 0.005]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
