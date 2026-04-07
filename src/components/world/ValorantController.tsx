"use client";

/**
 * ValorantController — Bruno Simon-style ground movement + third-person camera.
 *
 * Controls:
 *   W / ↑  — accelerate forward
 *   S / ↓  — brake / reverse
 *   A / ←  — turn left
 *   D / →  — turn right
 *
 * Player moves on Y=0 ground plane.
 * Camera follows from above-behind (pure third-person follow).
 * Zone detection: 2D XZ distance from player position.
 * flyTo: immediately calls _setZone + lerps player to zone position.
 */

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { zoneControl } from "@/lib/zone-control";
import { playerState } from "@/lib/player-state";

export const ZONE_POSITIONS: [number, number, number][] = [
  [0,   0,   0],   // 0 — SPAWN
  [-22, 0, -28],   // 1 — LORE (About)
  [22,  0, -28],   // 2 — LOADOUT (Skills)
  [-22, 0, -56],   // 3 — CONTRACTS (Projects)
  [22,  0, -56],   // 4 — HISTORY (Experience)
  [0,   0, -80],   // 5 — COMMS (Contact)
];

const ZONE_RADIUS  = 8;
const TURN_SPEED   = 0.035;
const ACCEL        = 0.08;
const DAMP         = 0.88;
const FLY_SPEED    = 0.06;

// Map bounds — just inside the boundary walls in ValorantGround
const MAP_X_MIN = -52;
const MAP_X_MAX =  52;
const MAP_Z_MIN = -97;
const MAP_Z_MAX =   8;

export function ValorantController() {
  const { camera } = useThree();

  const keys      = useRef<Record<string, boolean>>({});
  const flyTarget = useRef<THREE.Vector3 | null>(null);
  const posRef    = playerState.position;

  useEffect(() => {
    camera.position.set(0, 10, 12);
    camera.lookAt(0, 0, 0);

    zoneControl.flyTo = (zoneIndex: number) => {
      const pos = ZONE_POSITIONS[zoneIndex];
      if (!pos) return;
      flyTarget.current = new THREE.Vector3(pos[0], 0, pos[2]);
      zoneControl._setZone(zoneIndex);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      keys.current[e.code] = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      keys.current[e.code] = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup",   onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup",   onKeyUp);
    };
  }, [camera]);

  useFrame(() => {
    const k = keys.current;

    if (flyTarget.current) {
      posRef.lerp(flyTarget.current, FLY_SPEED);

      const dx = flyTarget.current.x - posRef.x;
      const dz = flyTarget.current.z - posRef.z;
      if (Math.abs(dx) + Math.abs(dz) > 0.01) {
        const targetYaw = Math.atan2(-dx, -dz);
        let diff = targetYaw - playerState.yaw;
        while (diff >  Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        playerState.yaw += diff * 0.1;
      }

      if (posRef.distanceTo(flyTarget.current) < 0.4) {
        flyTarget.current = null;
      }
    } else {
      // A/D — turn left/right
      if (k["KeyA"] || k["ArrowLeft"])  playerState.yaw += TURN_SPEED;
      if (k["KeyD"] || k["ArrowRight"]) playerState.yaw -= TURN_SPEED;

      // W/S — forward/backward
      if (k["KeyW"] || k["ArrowUp"])   playerState.velocity += ACCEL;
      if (k["KeyS"] || k["ArrowDown"]) playerState.velocity -= ACCEL * 0.6;

      playerState.velocity *= DAMP;

      posRef.x -= Math.sin(playerState.yaw) * playerState.velocity;
      posRef.z -= Math.cos(playerState.yaw) * playerState.velocity;

      // Clamp to map bounds
      posRef.x = Math.max(MAP_X_MIN, Math.min(MAP_X_MAX, posRef.x));
      posRef.z = Math.max(MAP_Z_MIN, Math.min(MAP_Z_MAX, posRef.z));
    }

    // Third-person follow camera
    const camOffset = new THREE.Vector3(
      Math.sin(playerState.yaw) * 11,
      8,
      Math.cos(playerState.yaw) * 11
    );
    const camTarget = posRef.clone().add(camOffset);
    camera.position.lerp(camTarget, 0.08);
    camera.lookAt(posRef.x, 0.5, posRef.z);

    // Zone detection (2D XZ only)
    let closestZone = 0;
    let closestDist = Infinity;
    ZONE_POSITIONS.forEach((pos, i) => {
      const dx = posRef.x - pos[0];
      const dz = posRef.z - pos[2];
      const d  = Math.sqrt(dx * dx + dz * dz);
      if (d < closestDist) { closestDist = d; closestZone = i; }
    });

    if (closestDist <= ZONE_RADIUS) {
      zoneControl._setZone(closestZone);
    }
  });

  return null;
}
