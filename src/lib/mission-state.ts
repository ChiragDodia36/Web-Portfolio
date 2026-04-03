// Mission state bridge — controls the UI phase flow.
// boot → briefing → tutorial → active
// Follows the same module-singleton pattern as zone-control.ts

export type MissionPhase = 'boot' | 'briefing' | 'tutorial' | 'active';
export type PhaseChangeCallback = (phase: MissionPhase) => void;

export const missionState: {
  phase: MissionPhase;
  _listeners: Set<PhaseChangeCallback>;
  onPhaseChange: (cb: PhaseChangeCallback) => () => void;
  _setPhase: (phase: MissionPhase) => void;
} = {
  phase: 'boot',
  _listeners: new Set(),

  onPhaseChange(cb: PhaseChangeCallback) {
    missionState._listeners.add(cb);
    return () => missionState._listeners.delete(cb);
  },

  _setPhase(phase: MissionPhase) {
    missionState.phase = phase;
    missionState._listeners.forEach((cb) => cb(phase));
  },
};
