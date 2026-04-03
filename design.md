# 3D Spatial Portfolio Design Plan (Bruno Simon × Vision Pro Fusion)

## Objective
Transform an existing 2D macOS-themed Next.js portfolio into a fully interactive 3D "Spatial Computing" journey. The goal is to capture the playful, immersive 3D WOW-factor of Bruno Simon's famous portfolio, but maintain a strictly professional, sleek, dark-mode Apple Vision Pro / macOS aesthetic. 

Recruiters must not get lost navigating. The experience must be controlled entirely by scrolling (no WASD driving required).

## Architecture Stack
- **Framework:** Next.js (React)
- **3D Engine:** Three.js + `@react-three/fiber` + `@react-three/drei`
- **Animations:** GSAP & Framer Motion
- **Styling:** Tailwind CSS (Dark Mode)

---

## ✦ Reference Inspirations
Before we dive into the core concepts, this feature draws deeply from two world-class interactive design references:
1. **[Bruno Simon Portfolio](https://bruno-simon.com)** — The gold standard for fully interactive, physics-based 3D portfolios. Our "Spatial Journey" mirrors this playful 3D environment, but swaps out driving a car for flying via scrolling.
2. **[Prathamesh Pravin More - "The Technical Journal"](https://dribbble.com/shots/23588960-The-Technical-Journal) / Clean Corporate Editorial** — The contrast. While the background is a playful 3D void, the data (Resume, AI, Projects) remains rigidly clean, typography-focused, and highly utilitarian.

---

## 1. The Core Concept: "The Spatial Journey"
Instead of a flat vertical webpage, the background of the entire site is a `<Canvas>` rendering a dark, premium 3D void. 

We use three.js and `@react-three/drei`'s `<ScrollControls>` to hijack the native scroll. As the user scrolls down their mouse wheel or trackpad, the 3D camera **flies forward down the Z-axis**.

## 2. Pinned 2D UI (The Anchor)
To ensure the site remains highly usable, the core macOS navigation components remain pinned as flat DOM elements over top of the 3D canvas. These do not move in 3D space:
- **macOS Menu Bar:** Pinned to top.
- **macOS Dock:** Pinned to bottom (with magnification physics).
- **Spotlight Search (⌘K) & Siri AI:** Accessible instantly as overlays.

## 3. 3D Milestones (Spatial Apps)
The actual content of the portfolio (About Me, Experience, Projects) currently exists as standard React components styled like frosted-glass macOS windows.

**The Transformation:** 
We wrap these existing React components in `@react-three/drei`'s `<Html>` helpers.
As the scroll-controlled camera flies down the Z-axis, it encounters these windows floating in 3D space. They act as "Spatial Apps" (like wearing a Vision Pro).
- At scroll depth 0%: Hero Section 3D text.
- At scroll depth 25%: The "About Me" glass window fades/scales into view.
- At scroll depth 50%: The "Projects" Finder window appears.
- At scroll depth 75%: The "Experience" window appears.

## 4. Bruno Simon Interactivity (Playful 3D Elements)
To make the world feel alive and interactive, we scatter 3D objects along the flight path. These objects react to the user's mouse pointer (hover, click, drag).
- **Floating Glass Orbs / Cubes:** Abstract VisionOS-style frosted glass geometry drifting slowly in the background to establish scale and depth.
- **Tech Stack Props:** A floating 3D iPhone (representing mobile dev), a 3D server rack, or 3D `{ }` code brackets.
- **Physics/Interactions:** When the user moves their mouse over these floating objects while scrolling past them, the objects tilt, spin, or glow based on the cursor's raycaster position.

## 5. Lighting & Atmosphere
- **Background:** Deep, rich dark colors (`#000000` to very dark grey/blue gradients).
- **Lighting:** Soft ambient light + directional rim lighting to highlight the edges of the abstract glass shapes. 
- **Environment:** Use a studio HDR environment map inside R3F to give the 3D objects ultra-realistic, shiny, Apple-esque reflections.

---

## Required Implementation Steps:
1. Wrap the current `DesktopLayout` in a main wrapper that holds the R3F `<Canvas>`.
2. Inside the Canvas, instantiate `<ScrollControls pages={5}>`.
3. Create a `CameraRig` component inside ScrollControls that reads `useScroll().offset` and maps it to `camera.position.z` (flying forward).
4. Migrate the existing DOM Sections (Hero, About, Projects) into `<Html transform position={[x, y, z]}>` containers scattered along the Z-axis negative coordinates.
5. Add lighting (AmbientLight, SpotLight) and a dark fog (`<fog attach="fog" args={['#050505', 10, 50]} />`) to blend objects in the distance.
6. Drop in interactive primitive geometries (`<mesh>`) with custom materials (MeshPhysicalMaterial with high transmission/roughness for frosted glass).
7. Sync DOM opacity/scale with the scroll offset so windows only appear when the camera is right in front of them.
