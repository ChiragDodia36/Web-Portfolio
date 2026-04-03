# 3D Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 3D animated portfolio for Chirag Dodia with a Vision Pro spatial hero transitioning into an interactive macOS desktop, using the latest tech stack.

**Architecture:** Next.js 16 App Router with React Three Fiber for 3D hero scene, GSAP ScrollTrigger for scroll-driven transitions, Motion (Framer Motion) for UI animations, and Tailwind CSS v4 for styling. All sections render on a true black (#000) background. The hero uses WebGL via R3F Canvas; desktop sections use HTML/CSS with glass-morphism.

**Tech Stack:** Next.js 16, React 19, TypeScript, @react-three/fiber 9, @react-three/drei 10, GSAP 3.14, motion 12, Tailwind CSS v4, EmailJS

---

## File Structure

```
my-portfolio/
├── CLAUDE.md                          # Project memory & conventions
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout (fonts, metadata, black bg)
│   │   ├── page.tsx                   # Main page composing all sections
│   │   └── globals.css                # Tailwind v4 imports + custom properties
│   ├── components/
│   │   ├── hero/
│   │   │   ├── HeroScene.tsx          # R3F Canvas wrapper (lazy loaded)
│   │   │   ├── GlassPanel.tsx         # R3F glass panel mesh component
│   │   │   ├── StarField.tsx          # R3F star particle system
│   │   │   └── HeroOverlay.tsx        # HTML overlay (name, role, stats)
│   │   ├── transition/
│   │   │   └── BootSequence.tsx       # GSAP scroll-triggered boot animation
│   │   ├── desktop/
│   │   │   ├── MacWindow.tsx          # Reusable macOS window (traffic lights, chrome)
│   │   │   ├── MenuBar.tsx            # macOS menu bar component
│   │   │   ├── Dock.tsx               # macOS dock with icons
│   │   │   └── DesktopSection.tsx     # Wrapper: menubar + content + dock
│   │   └── sections/
│   │       ├── About.tsx              # About.app window content
│   │       ├── Skills.tsx             # Skills.app with tabs + grid
│   │       ├── Projects.tsx           # Projects.app with featured cards
│   │       ├── Experience.tsx         # Experience.app timeline
│   │       └── Contact.tsx            # Contact.app form + mailto
│   ├── data/
│   │   ├── skills.ts                  # Skill categories & items
│   │   ├── projects.ts               # Project entries
│   │   └── experience.ts             # Timeline entries + education
│   └── lib/
│       └── email.ts                   # EmailJS send helper
├── public/
│   └── og-image.png                   # Open Graph image (create later)
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Chunk 1: Project Scaffolding & CLAUDE.md

### Task 1: Create Next.js 16 project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Scaffold the project**

```bash
cd /Users/chiragdodia/Desktop/my-portfolio
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --turbopack --import-alias "@/*" --yes
```

- [ ] **Step 2: Install 3D and animation dependencies**

```bash
npm install three @react-three/fiber @react-three/drei gsap @gsap/react motion @emailjs/browser
npm install -D @types/three
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```
Expected: Server starts on localhost:3000, default Next.js page renders.

- [ ] **Step 4: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 16 project with R3F, GSAP, Motion, Tailwind v4"
```

### Task 2: Create CLAUDE.md

**Files:**
- Create: `CLAUDE.md`

- [ ] **Step 1: Write CLAUDE.md with project conventions**

```markdown
# Chirag Dodia Portfolio

## Project Overview
3D animated portfolio website with Vision Pro spatial hero + macOS desktop sections.

## Tech Stack
- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- @react-three/fiber 9 + @react-three/drei 10 (3D hero)
- GSAP 3.14 + ScrollTrigger (scroll animations)
- Motion 12 (UI transitions)
- Tailwind CSS v4
- EmailJS (contact form)

## Commands
- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run lint` — ESLint check

## Architecture
- `src/app/` — Next.js App Router pages
- `src/components/hero/` — Vision Pro 3D hero (R3F Canvas)
- `src/components/desktop/` — macOS window, menu bar, dock
- `src/components/sections/` — About, Skills, Projects, Experience, Contact
- `src/data/` — Static data (skills, projects, experience)
- `src/lib/` — Utilities (email helper)

## Design Conventions
- True black (#000) background everywhere
- Glass windows: bg rgba(255,255,255,0.04), border rgba(255,255,255,0.08), rounded-[10-28px]
- Traffic light dots: #ff5f57, #febc2e, #28c840
- Typography: SF Pro Display / system font stack, weights 200-700
- Accent colors: Blue #88aaff, Purple #bf5af2, Green #30d158, Orange #ff9f0a
- Menu bar: 26px height, rgba(255,255,255,0.03)
- Dock: rgba(255,255,255,0.04), rounded-2xl

## Testing
- Visual verify after each feature: `npm run dev` → check in browser
- Build check: `npm run build` must pass before commits
- Lint: `npm run lint` must pass

## Rules
- All components are React Server Components by default; add 'use client' only when needed (R3F, GSAP, Motion, form state)
- Lazy load R3F Canvas with next/dynamic (ssr: false)
- Use Tailwind v4 CSS-first config (@theme in globals.css)
- Keep data separate from components (src/data/)
- One component per file, named exports
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add CLAUDE.md with project conventions and architecture"
```

### Task 3: Configure globals and layout

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace globals.css with black theme + Tailwind v4**

```css
@import "tailwindcss";

@theme {
  --color-glass: rgba(255, 255, 255, 0.04);
  --color-glass-border: rgba(255, 255, 255, 0.08);
  --color-glass-hover: rgba(255, 255, 255, 0.06);
  --color-accent-blue: #88aaff;
  --color-accent-purple: #bf5af2;
  --color-accent-green: #30d158;
  --color-accent-orange: #ff9f0a;
  --color-accent-red: #ff453a;
  --color-text-primary: rgba(255, 255, 255, 0.93);
  --color-text-secondary: rgba(255, 255, 255, 0.5);
  --color-text-muted: rgba(255, 255, 255, 0.25);
  --font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #000;
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: rgba(136, 170, 255, 0.3);
  color: white;
}
```

- [ ] **Step 2: Update layout.tsx with metadata**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chirag Dodia — Mobile & Full-Stack Engineer",
  description: "Portfolio showcasing mobile development, full-stack engineering, and AI projects. Built with Next.js, Three.js, and GSAP.",
  openGraph: {
    title: "Chirag Dodia — Mobile & Full-Stack Engineer",
    description: "Interactive 3D portfolio with Vision Pro and macOS desktop experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Create minimal page.tsx placeholder**

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-semibold text-white/90">
          Chirag Dodia
        </h1>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Verify — run dev server, check black background renders**

```bash
npm run dev
```
Expected: Black page with centered "Chirag Dodia" text at localhost:3000.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/app/page.tsx
git commit -m "feat: configure black theme, Tailwind v4 tokens, and root layout"
```

---

## Chunk 2: Data Layer

### Task 4: Create static data files

**Files:**
- Create: `src/data/skills.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/experience.ts`

- [ ] **Step 1: Create skills.ts**

```ts
export interface Skill {
  name: string;
  icon: string;
  proficiency: number; // 0-100
  color: string; // tailwind color or hex
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "mobile",
    label: "Mobile",
    skills: [
      { name: "React Native", icon: "RN", proficiency: 90, color: "#61dafb" },
      { name: "SwiftUI", icon: "Sw", proficiency: 85, color: "#f05138" },
      { name: "Kotlin", icon: "Kt", proficiency: 82, color: "#7f52ff" },
      { name: "Flutter", icon: "Fl", proficiency: 88, color: "#02569b" },
      { name: "TypeScript", icon: "TS", proficiency: 92, color: "#3178c6" },
      { name: "Redux", icon: "Rx", proficiency: 80, color: "#764abc" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", icon: "Nj", proficiency: 85, color: "#689f38" },
      { name: "FastAPI", icon: "FA", proficiency: 82, color: "#009688" },
      { name: "PostgreSQL", icon: "PG", proficiency: 80, color: "#336791" },
      { name: "MongoDB", icon: "MG", proficiency: 78, color: "#47a248" },
      { name: "Firebase", icon: "FB", proficiency: 84, color: "#ffca28" },
      { name: "REST/GraphQL", icon: "API", proficiency: 88, color: "#e535ab" },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    skills: [
      { name: "TensorFlow", icon: "TF", proficiency: 75, color: "#ff6f00" },
      { name: "LangChain", icon: "LC", proficiency: 78, color: "#1c3c3c" },
      { name: "Python", icon: "Py", proficiency: 84, color: "#3776ab" },
      { name: "Ollama", icon: "OL", proficiency: 72, color: "#ffffff" },
      { name: "OpenAI API", icon: "AI", proficiency: 80, color: "#412991" },
      { name: "Hugging Face", icon: "HF", proficiency: 70, color: "#ffbd45" },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    skills: [
      { name: "Docker", icon: "Dk", proficiency: 80, color: "#2496ed" },
      { name: "AWS", icon: "AW", proficiency: 75, color: "#ff9900" },
      { name: "CI/CD", icon: "CI", proficiency: 78, color: "#30d158" },
      { name: "Git", icon: "Gt", proficiency: 90, color: "#f05032" },
      { name: "Linux", icon: "Lx", proficiency: 82, color: "#fcc624" },
      { name: "Vercel", icon: "Vc", proficiency: 85, color: "#ffffff" },
    ],
  },
];
```

- [ ] **Step 2: Create projects.ts**

```ts
export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  featured?: boolean;
  color: string;
}

export const projects: Project[] = [
  {
    title: "WC26 Fantasy Friends",
    description: "Full-Stack Fantasy Football Platform with on-device AI predictions using Qwen3",
    tags: ["TypeScript", "FastAPI", "PostgreSQL", "AI / Qwen3"],
    github: "https://github.com/ChiragDodia36/WC26-Fantasy-Friends",
    featured: true,
    color: "#30d158",
  },
  {
    title: "FinSight",
    description: "Agentic Financial Document Intelligence & Risk Analyst powered by LangGraph",
    tags: ["LangGraph", "Ollama", "Python"],
    github: "https://github.com/ChiragDodia36/FinSight",
    color: "#ff9f0a",
  },
  {
    title: "Stock Trading Platform",
    description: "Native iOS Trading App with real-time market data and portfolio tracking",
    tags: ["SwiftUI", "Finnhub", "Alamofire"],
    github: "https://github.com/ChiragDodia36/Stock-Trading-Platform",
    color: "#f05138",
  },
  {
    title: "E-Voting Blockchain",
    description: "Decentralized voting system using Ethereum blockchain and smart contracts",
    tags: ["Solidity", "React", "Ethereum", "Web3.js"],
    github: "https://github.com/ChiragDodia36/E-Voting-Blockchain",
    color: "#88aaff",
  },
  {
    title: "Netflix Clone",
    description: "Full-stack Netflix replica with user authentication and movie streaming",
    tags: ["React", "Node.js", "MongoDB", "TMDB API"],
    github: "https://github.com/ChiragDodia36/Netflix-Clone",
    color: "#bf5af2",
  },
];
```

- [ ] **Step 3: Create experience.ts**

```ts
export interface Experience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current?: boolean;
}

export const experiences: Experience[] = [
  {
    role: "React Native Developer",
    company: "DotMinds LLP",
    location: "Mumbai, India",
    startDate: "Mar 2022",
    endDate: "Sep 2022",
  },
  {
    role: "Mobile App Developer",
    company: "L&T Financial Services",
    location: "Bangalore, India",
    startDate: "Jul 2023",
    endDate: "Jun 2024",
  },
  {
    role: "Mobile Software Engineer",
    company: "Indiana University",
    location: "Bloomington, USA",
    startDate: "Nov 2025",
    endDate: "Present",
    current: true,
  },
];

export interface Education {
  school: string;
  degree: string;
  years: string;
  gpa?: string;
}

export const education: Education[] = [
  {
    school: "Indiana University Bloomington",
    degree: "MS Computer Science",
    years: "2024 – 2026",
    gpa: "3.65",
  },
  {
    school: "University of Mumbai",
    degree: "BE Information Technology",
    years: "2020 – 2023",
    gpa: "8.83 CGPA",
  },
];
```

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add static data for skills, projects, and experience"
```

---

## Chunk 3: macOS Desktop Components

### Task 5: Build MacWindow component

**Files:**
- Create: `src/components/desktop/MacWindow.tsx`

- [ ] **Step 1: Create MacWindow.tsx**

```tsx
"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";

interface MacWindowProps {
  title: string;
  children: ReactNode;
  active?: boolean;
  className?: string;
  floatDuration?: number;
}

export function MacWindow({
  title,
  children,
  active = true,
  className = "",
  floatDuration = 7,
}: MacWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      animate={{ y: [0, -8, 0] }}
      // gentle float
      style={{
        animationDuration: `${floatDuration}s`,
      }}
      className={`
        rounded-[10px] overflow-hidden relative z-[1]
        bg-[rgba(255,255,255,0.04)]
        border border-[rgba(255,255,255,0.08)]
        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        ${active ? "border-[rgba(100,160,255,0.15)]" : ""}
        ${className}
      `}
    >
      {/* Window Chrome */}
      <div className="h-7 flex items-center px-3 bg-[rgba(255,255,255,0.03)] border-b border-[rgba(255,255,255,0.04)]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center text-[11px] font-medium text-white/50">
          {title}
        </div>
      </div>

      {/* Window Body */}
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/desktop/MacWindow.tsx
git commit -m "feat: add MacWindow component with traffic lights and glass styling"
```

### Task 6: Build MenuBar component

**Files:**
- Create: `src/components/desktop/MenuBar.tsx`

- [ ] **Step 1: Create MenuBar.tsx**

```tsx
interface MenuBarProps {
  appName: string;
  menuItems?: string[];
}

export function MenuBar({ appName, menuItems = ["File", "Edit", "View"] }: MenuBarProps) {
  const now = new Date();
  const timeStr = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }) + "  " + now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="h-[26px] bg-[rgba(255,255,255,0.03)] border-b border-[rgba(255,255,255,0.05)] flex items-center px-3.5 gap-4 text-xs relative z-[2]">
      <span className="text-sm text-white/70"></span>
      <span className="font-semibold text-white/70">{appName}</span>
      {menuItems.map((item) => (
        <span key={item} className="text-white/40">{item}</span>
      ))}
      <span className="ml-auto text-white/35 text-[11px]">{timeStr}</span>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/desktop/MenuBar.tsx
git commit -m "feat: add MenuBar component with Apple icon and time display"
```

### Task 7: Build Dock component

**Files:**
- Create: `src/components/desktop/Dock.tsx`

- [ ] **Step 1: Create Dock.tsx**

```tsx
"use client";

interface DockIcon {
  label: string;
  emoji: string;
  color: string;
  active?: boolean;
}

interface DockProps {
  activeApp?: string;
}

const dockIcons: DockIcon[] = [
  { label: "About", emoji: "i", color: "#88aaff" },
  { label: "Skills", emoji: "<>", color: "#ff9f0a" },
  { label: "Projects", emoji: "{}", color: "#30d158" },
  { label: "Experience", emoji: "◷", color: "#bf5af2" },
  { label: "Contact", emoji: "@", color: "#ff453a" },
];

export function Dock({ activeApp }: DockProps) {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 px-3.5 py-2 bg-[rgba(255,255,255,0.04)] rounded-2xl border border-[rgba(255,255,255,0.08)] z-[2]">
      {dockIcons.map((icon) => {
        const isActive = activeApp === icon.label;
        return (
          <div
            key={icon.label}
            className="w-9 h-9 rounded-[9px] flex items-center justify-center text-sm relative transition-transform hover:scale-110 hover:-translate-y-1"
            style={{
              background: `rgba(${hexToRgb(icon.color)}, ${isActive ? 0.15 : 0.12})`,
              color: icon.color,
            }}
          >
            <span>{icon.emoji}</span>
            {isActive && (
              <div
                className="absolute -bottom-1 w-1 h-1 rounded-full"
                style={{ background: icon.color }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/desktop/Dock.tsx
git commit -m "feat: add Dock component with hover effects and active indicator"
```

### Task 8: Build DesktopSection wrapper

**Files:**
- Create: `src/components/desktop/DesktopSection.tsx`

- [ ] **Step 1: Create DesktopSection.tsx**

```tsx
import { type ReactNode } from "react";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";

interface DesktopSectionProps {
  appName: string;
  menuItems?: string[];
  children: ReactNode;
  id?: string;
}

export function DesktopSection({ appName, menuItems, children, id }: DesktopSectionProps) {
  return (
    <section
      id={id}
      className="bg-black min-h-[420px] relative overflow-hidden pb-16"
    >
      {/* Subtle aurora overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 25% 20%, rgba(80,60,180,0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 65% 50%, rgba(60,120,200,0.025) 0%, transparent 50%),
            radial-gradient(ellipse at 45% 80%, rgba(100,60,160,0.02) 0%, transparent 40%)
          `,
        }}
      />
      <MenuBar appName={appName} menuItems={menuItems} />
      <div className="relative z-[1]">{children}</div>
      <Dock activeApp={appName.replace(".app", "")} />
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/desktop/DesktopSection.tsx
git commit -m "feat: add DesktopSection wrapper with MenuBar, Dock, and aurora"
```

- [ ] **Step 3: Verify — Temporarily render a DesktopSection in page.tsx**

Update `src/app/page.tsx` to import and render one DesktopSection with a MacWindow. Run `npm run dev` and verify the menu bar, window with traffic lights, and dock all render on a black background.

- [ ] **Step 4: Commit verification**

```bash
git add src/app/page.tsx
git commit -m "test: verify desktop components render correctly"
```

---

## Chunk 4: Content Sections (About, Skills, Projects, Experience, Contact)

### Task 9: Build About section

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: Create About.tsx**

The About section contains: avatar, name, role, bio paragraph, and two education cards inside a MacWindow, all wrapped in a DesktopSection.

- [ ] **Step 2: Add to page.tsx and verify visually**

Run `npm run dev`, scroll to About section. Verify: MacWindow renders with avatar, name "Chirag Dodia", role, bio text, and education cards. All on black background.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/About.tsx src/app/page.tsx
git commit -m "feat: add About.app section with profile card and education"
```

### Task 10: Build Skills section

**Files:**
- Create: `src/components/sections/Skills.tsx`

- [ ] **Step 1: Create Skills.tsx**

Skills section: Category tabs (Mobile/Backend/AI-ML/DevOps) with a 3x2 grid of skill cards. Each card shows icon, name, sub-label, and proficiency bar. Tabs switch with Motion animation. Uses `skillCategories` from data.

- [ ] **Step 2: Add to page.tsx and verify**

Verify: Tab switching works, skill cards show colored progress bars, grid layout correct.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Skills.tsx src/app/page.tsx
git commit -m "feat: add Skills.app section with tab switching and proficiency bars"
```

### Task 11: Build Projects section

**Files:**
- Create: `src/components/sections/Projects.tsx`

- [ ] **Step 1: Create Projects.tsx**

Projects section: Featured card (WC26 Fantasy) with green accent + FEATURED badge, then regular project cards. Each card: title, description, tech tags, GitHub link. Uses `projects` from data.

- [ ] **Step 2: Add to page.tsx and verify**

Verify: Featured card stands out, tags render with correct colors, GitHub links work.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Projects.tsx src/app/page.tsx
git commit -m "feat: add Projects.app section with featured card and tech tags"
```

### Task 12: Build Experience section

**Files:**
- Create: `src/components/sections/Experience.tsx`

- [ ] **Step 1: Create Experience.tsx**

Experience section: Horizontal timeline with 3 nodes (DotMinds → L&T → IU). Purple accent. Current role has CURRENT badge with pulsing dot. Education row at bottom. Uses `experiences` and `education` from data.

- [ ] **Step 2: Add to page.tsx and verify**

Verify: Timeline renders horizontally, CURRENT badge pulses, education shows at bottom.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Experience.tsx src/app/page.tsx
git commit -m "feat: add Experience.app section with career timeline"
```

### Task 13: Build Contact section

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Create: `src/lib/email.ts`

- [ ] **Step 1: Create email.ts helper**

```ts
import emailjs from "@emailjs/browser";

export async function sendEmail(form: HTMLFormElement) {
  return emailjs.sendForm(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    form,
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  );
}
```

- [ ] **Step 2: Create Contact.tsx**

Contact section: Form with Name, Email, Message fields. Glass-styled submit button. Mailto fallback link. Uses `sendEmail` helper. Form state managed with useState.

- [ ] **Step 3: Create .env.local with placeholder EmailJS keys**

```bash
echo 'NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key' > .env.local
```

- [ ] **Step 4: Add to page.tsx and verify**

Verify: Form renders, fields are fillable, submit button shows. Mailto link visible.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Contact.tsx src/lib/email.ts
git commit -m "feat: add Contact.app section with EmailJS form and mailto fallback"
```

- [ ] **Step 6: Run build check**

```bash
npm run build
```
Expected: Build succeeds with no errors.

---

## Chunk 5: Vision Pro Hero (React Three Fiber)

### Task 14: Build StarField component

**Files:**
- Create: `src/components/hero/StarField.tsx`

- [ ] **Step 1: Create StarField.tsx**

R3F component using `<Points>` from drei. 80 randomly positioned stars with twinkling animation via useFrame. Each star is a tiny sphere with varying opacity.

- [ ] **Step 2: Commit**

```bash
git add src/components/hero/StarField.tsx
git commit -m "feat: add StarField R3F component with twinkling particles"
```

### Task 15: Build GlassPanel component

**Files:**
- Create: `src/components/hero/GlassPanel.tsx`

- [ ] **Step 1: Create GlassPanel.tsx**

R3F mesh component: rounded rectangle geometry with custom shader material for glass effect (gradient fill, specular highlight, subtle border). Props: position, size, opacity, floatSpeed, floatPhase. Uses useFrame for gentle floating animation.

- [ ] **Step 2: Commit**

```bash
git add src/components/hero/GlassPanel.tsx
git commit -m "feat: add GlassPanel R3F component with visionOS glass material"
```

### Task 16: Build HeroOverlay (HTML layer)

**Files:**
- Create: `src/components/hero/HeroOverlay.tsx`

- [ ] **Step 1: Create HeroOverlay.tsx**

Absolute-positioned HTML overlay on top of the R3F canvas. Contains: CD avatar circle, "Chirag Dodia" name, "Mobile & Full-Stack Engineer" role, gradient divider, stats row (2+ Years, 5+ Projects, 3.65 GPA), university text, "Scroll to explore" with chevron animation. All centered with glassmorphism background.

- [ ] **Step 2: Commit**

```bash
git add src/components/hero/HeroOverlay.tsx
git commit -m "feat: add HeroOverlay with profile info and glass card"
```

### Task 17: Build HeroScene (R3F Canvas)

**Files:**
- Create: `src/components/hero/HeroScene.tsx`

- [ ] **Step 1: Create HeroScene.tsx**

Main hero component: R3F `<Canvas>` with black background, StarField, multiple GlassPanel instances (center profile, left skills, right projects, background depth panels). Lazy loaded with `next/dynamic` (ssr: false). Canvas renders behind HeroOverlay.

- [ ] **Step 2: Add hero to page.tsx as first section**

- [ ] **Step 3: Verify — run dev server**

```bash
npm run dev
```
Expected: 3D hero renders with floating glass panels, star field, and profile overlay on true black. No WebGL errors in console.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/HeroScene.tsx src/app/page.tsx
git commit -m "feat: add Vision Pro hero with R3F glass panels and star field"
```

---

## Chunk 6: Boot Transition & Scroll Animations

### Task 18: Build BootSequence transition

**Files:**
- Create: `src/components/transition/BootSequence.tsx`

- [ ] **Step 1: Create BootSequence.tsx**

GSAP ScrollTrigger-powered transition section. As user scrolls past hero, the void "boots" into macOS: menu bar fades in, ghost windows form, dock rises, loading bar animates. Uses `useGSAP` hook from `@gsap/react`.

- [ ] **Step 2: Add between hero and About in page.tsx**

- [ ] **Step 3: Verify scroll transition**

Run dev server, scroll from hero through boot sequence into About. Verify smooth animation.

- [ ] **Step 4: Commit**

```bash
git add src/components/transition/BootSequence.tsx src/app/page.tsx
git commit -m "feat: add boot sequence transition with GSAP ScrollTrigger"
```

### Task 19: Add scroll-triggered entrance animations to desktop sections

- [ ] **Step 1: Add Motion viewport animations**

Each DesktopSection and MacWindow already has `whileInView` from Motion. Verify all sections animate in as user scrolls. Adjust timing if needed.

- [ ] **Step 2: Verify full scroll journey**

Start at hero → scroll through boot → About → Skills → Projects → Experience → Contact. All transitions smooth, no janky jumps.

- [ ] **Step 3: Commit**

```bash
git commit -m "feat: polish scroll-triggered entrance animations across all sections"
```

---

## Chunk 7: Polish & Optimization

### Task 20: Performance optimization

- [ ] **Step 1: Lazy load R3F Canvas**

Ensure HeroScene uses `next/dynamic` with `ssr: false`. Add loading fallback (black div with subtle pulse).

- [ ] **Step 2: Add proper `<head>` tags**

Add favicon, apple-touch-icon, theme-color meta tag (#000000).

- [ ] **Step 3: Run production build and check**

```bash
npm run build
npm run start
```
Expected: No build errors. Site loads fast. Check Lighthouse score.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "perf: lazy load R3F canvas, add meta tags, optimize build"
```

### Task 21: Final verification

- [ ] **Step 1: Full visual QA**

Run `npm run dev` and verify every section:
- Hero: 3D panels float, stars twinkle, overlay centered
- Boot: Scroll transition smooth
- About: Profile info correct
- Skills: Tabs switch, bars colored
- Projects: Featured card green, tags correct
- Experience: Timeline horizontal, CURRENT badge
- Contact: Form works, mailto link correct

- [ ] **Step 2: Lint check**

```bash
npm run lint
```
Expected: No errors.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: final QA pass — all sections verified"
```
