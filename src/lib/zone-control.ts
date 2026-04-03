// Zone control bridge — mirrors scroll-control.ts pattern but for free-roam camera.
// OmenController writes flyTo + currentZone here.
// OmenZonePanels + OmenAbilityBar + OmenHUD read from here.

export type ZoneChangeCallback = (zone: number) => void;
export type VisitedChangeCallback = (visited: Set<number>) => void;

export const zoneControl: {
  flyTo: (zone: number) => void;
  currentZone: number;
  visitedZones: Set<number>;
  onZoneChange: (cb: ZoneChangeCallback) => () => void;
  onVisitedChange: (cb: VisitedChangeCallback) => () => void;
  _listeners: Set<ZoneChangeCallback>;
  _visitedListeners: Set<VisitedChangeCallback>;
  _setZone: (zone: number) => void;
} = {
  flyTo: () => {},
  currentZone: 0,
  visitedZones: new Set([0]), // SPAWN is visited on load
  _listeners: new Set(),
  _visitedListeners: new Set(),

  onZoneChange(cb: ZoneChangeCallback) {
    zoneControl._listeners.add(cb);
    return () => zoneControl._listeners.delete(cb);
  },

  onVisitedChange(cb: VisitedChangeCallback) {
    zoneControl._visitedListeners.add(cb);
    return () => zoneControl._visitedListeners.delete(cb);
  },

  _setZone(zone: number) {
    if (zone !== zoneControl.currentZone) {
      zoneControl.currentZone = zone;
      zoneControl._listeners.forEach((cb) => cb(zone));
    }
    if (!zoneControl.visitedZones.has(zone)) {
      zoneControl.visitedZones.add(zone);
      const snapshot = new Set(zoneControl.visitedZones);
      zoneControl._visitedListeners.forEach((cb) => cb(snapshot));
    }
  },
};
