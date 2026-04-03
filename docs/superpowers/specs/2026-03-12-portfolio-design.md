# Portfolio Website Design Spec

## Overview
A 3D animated portfolio website for Chirag Dodia (Mobile & Full-Stack Engineer) featuring a Vision Pro spatial hero transitioning into an interactive macOS desktop experience. True black theme throughout.

## Design Direction
- **Hero**: visionOS-inspired spatial UI with floating glass windows, star field, ambient lighting
- **Desktop Sections**: macOS-style windows (About.app, Skills.app, Projects.app, Experience.app, Contact.app) with menu bar, dock, traffic light dots
- **Theme**: True black (#000) background, glassmorphism windows, Apple-grade typography
- **Tone**: Clean, premium, sleek, Apple aesthetic

## Sections

### 1. Vision Pro Hero (Landing)
- True black void with twinkling star field (80 stars)
- Center: "Portfolio.app" glass window with avatar (CD initials), name, role, stats (2+ Years, 5+ Projects, 3.65 GPA), university
- Left: "Skills" glass window with progress bars (React Native, Flutter, SwiftUI, TypeScript, Python, Node.js)
- Right: "Projects" glass window with mini cards (WC26 Fantasy, FinSight, Stock Trading)
- Background: faded depth windows at different z-layers
- visionOS home indicator bar at bottom
- All windows float gently with sinusoidal motion at different phases
- Glass windows: multi-layer gradient fill, specular top-edge highlight, 0.5px border, soft shadow

### 2. Boot Transition
- Scroll-triggered morph from spatial void to macOS desktop
- Menu bar fades in, dock rises from bottom
- Ghost windows form and solidify
- Loading bar animation

### 3. About.app
- macOS window with traffic light dots
- Avatar, name "Chirag Dodia", role "Mobile & Full-Stack Engineer"
- Bio text, education cards (IU + Mumbai)
- Menu bar: About.app | File | Edit | View

### 4. Skills.app
- Category tabs: Mobile | Backend | AI/ML | DevOps
- 3x2 grid of skill cards with icons, names, proficiency bars
- Skills: React Native, SwiftUI, Kotlin, Flutter, TypeScript, Redux (Mobile tab shown)

### 5. Projects.app
- Featured project card: WC26 Fantasy Friends (TypeScript, FastAPI, PostgreSQL, AI/Qwen3)
- Regular cards: FinSight (LangGraph, Ollama, Python), Stock Trading (SwiftUI, Finnhub, Alamofire)
- Each card: title, description, tech tags, GitHub link

### 6. Experience.app
- Horizontal timeline: DotMinds (Mar-Sep 2022) -> L&T Financial (Jul 2023-Jun 2024) -> Indiana University (Nov 2025-Present, CURRENT badge)
- Education row at bottom
- Purple accent color theme

### 7. Contact.app
- Form fields: Name, Email, Message
- Send button with glass styling
- Mailto fallback link
- Email integration via EmailJS or Resend

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **3D Engine**: React Three Fiber + Drei
- **Animation**: GSAP 3 + ScrollTrigger + Framer Motion
- **Styling**: Tailwind CSS v4
- **Email**: EmailJS or Resend
- **Deployment**: Vercel

## Visual Specs
- Background: #000 (true black) everywhere
- Glass windows: rgba(255,255,255,0.04-0.07), border rgba(255,255,255,0.08), border-radius 10-28px
- Window chrome: rgba(255,255,255,0.03), traffic light dots (#ff5f57, #febc2e, #28c840)
- Typography: SF Pro Display / -apple-system, weights 200-700
- Accent colors: Blue (#88aaff), Purple (#bf5af2), Green (#30d158), Orange (#ff9f0a)
- Dock: rgba(255,255,255,0.04), border-radius 16px, icon size 36px
- Menu bar: 26px height, rgba(255,255,255,0.03)

## Content Source
- Resumes: Mobile Software Developer + Application Support
- GitHub: github.com/ChiragDodia36
- LinkedIn: linkedin.com/in/chirag-dodia04
