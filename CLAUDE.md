# Chirag Dodia Portfolio

## Project Overview
Valorant-themed 3D portfolio — user drives through a tactical map via WASD. Structured as a guided mission: boot screen → mission briefing → tutorial → free roam with objectives tracker.

## Tech Stack
- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- @react-three/fiber 9 + @react-three/drei 10 (3D world)
- @chenglou/pretext (text measurement, browser-only in useEffect)
- Motion 12 (UI transitions, AnimatePresence)
- Tailwind CSS v4
- EmailJS (contact form)
- Groq SDK (AI chat via /api/chat)

## Commands
- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run lint` — ESLint check

## Architecture

### Page entry (`src/app/page.tsx`)
```
'use client'
OmenJourney (dynamic, ssr:false) — R3F Canvas, z:0
OmenZonePanels — fixed DOM overlay, z:10
DesktopLayout — fixed HUD overlay, z:50
ObjectivesTracker — bottom-right panel, z:80 (tutorial/active phases)
TutorialOverlay — non-blocking tooltips, z:100 (tutorial phase)
MissionBriefing — full-screen briefing, z:150 (briefing phase)
BootScreen — full-screen boot, z:200 (boot phase)
```

### Mission phase flow (`src/lib/mission-state.ts`)
`boot → briefing → tutorial → active`
Module singleton, same pattern as zone-control.ts

### Zone control (`src/lib/zone-control.ts`)
Extended with:
- `visitedZones: Set<number>` — initialized to Set([0])
- `onVisitedChange(cb)` — fires when new zone first visited

### 3D World (`src/components/world/`)
- `OmenJourney.tsx` — Canvas + Scene; subscribes to onVisitedChange, passes visitedZones to ValorantSites
- `ValorantController.tsx` — WASD movement, zone detection, flyTo
- `ValorantSites.tsx` — zone markers + tall beacon pillars (orange-red unvisited, teal visited)
- `ValorantAgent.tsx` — player diamond marker

### UI Components (`src/components/ui/`)
- `BootScreen.tsx` — typewriter boot lines, progress bar, uses @chenglou/pretext
- `MissionBriefing.tsx` — classified briefing card with 5 objectives, uses @chenglou/pretext
- `TutorialOverlay.tsx` — 3-step non-blocking tooltips, auto-advances on user action
- `ObjectivesTracker.tsx` — bottom-right panel with 5 zone checkmarks + LIVE INTEL section

### HUD (`src/components/desktop/`)
- `OmenHUD.tsx` — Top bar: "CHIRAG DODIA // PORTFOLIO" (NOT Valorant branding)
- `OmenAbilityBar.tsx` — Bottom nav with zone teleport icons

### GitHub Live Intel (`src/app/api/github-mission/route.ts`)
- Fetches most recently pushed public repo for ChiragDodia36
- Returns: repo name, open/closed issue counts, progressPct, lastPush
- 5-minute cache via `next: { revalidate: 300 }`
- Shown in ObjectivesTracker LIVE INTEL section

## Zone Positions
```
0: SPAWN      [  0, 0,   0]
1: LORE       [-22, 0, -28]  (About)
2: LOADOUT    [ 22, 0, -28]  (Skills)
3: CONTRACTS  [-22, 0, -56]  (Projects)
4: HISTORY    [ 22, 0, -56]  (Experience)
5: COMMS      [  0, 0, -80]  (Contact)
```
ZONE_RADIUS = 8 (2D XZ distance check)

## Design Conventions
- Background: `#0f1923` (slightly lighter Valorant dark)
- Red (primary): `#FF4654`
- Cream (text): `#ece8e1`
- Green (visited/success): `#30d158`
- Teal (visited beacon): `#1eb2a6`
- Orange-red (unvisited beacon): `#FF6B35`
- Zone panels bg: `rgba(15, 25, 35, 0.88)`
- HUD border/accents: `rgba(255,70,84,0.25)`
- Font: Rajdhani / system-ui (HUD), Courier New (boot screen)

## @chenglou/pretext Usage
- Browser-only: always call inside `useEffect` or async functions post-mount
- Use `prepareWithSegments` (not `prepare`) when calling `layoutWithLines`
- Pattern: `const p = prepareWithSegments(text, font); const { lineCount } = layoutWithLines(p, width, lineHeight);`

## Testing
- Visual verify after each feature: `npm run dev` → check in browser
- Build check: `npm run build` must pass before commits
- Lint: `npm run lint` must pass

## Rules
- All components 'use client' for interactive UI; R3F Canvas via next/dynamic (ssr: false)
- Module singletons for shared state (zone-control.ts, mission-state.ts, player-state.ts)
- Keep data separate from components (src/data/)
- One component per file, named exports
- HUD says "CHIRAG DODIA // PORTFOLIO" — never mention Valorant in the UI
