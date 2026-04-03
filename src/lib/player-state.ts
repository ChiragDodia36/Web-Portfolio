// Shared player state — written by ValorantController, read by ValorantAgent.
// Module-level singleton so both components share the same object reference.

import * as THREE from "three";

export const playerState = {
  position: new THREE.Vector3(0, 0, 0),
  yaw: 0,       // facing direction in radians
  velocity: 0,  // scalar forward velocity
};
