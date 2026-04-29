# Mobile Portfolio — Design Spec
**Date:** 2026-04-29  
**Status:** Approved

---

## Overview

A mobile-first personal portfolio for Chirag Dodia, independent from the desktop Valorant-themed portfolio. Designed to be shown on a phone to anyone — recruiters, peers, collaborators. Theme: iOS/visionOS journal concept — minimal, glass morphism cards, smooth animations, adaptive light/dark.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** React 19 + TypeScript
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS v4
- **Contact backend:** Resend API (via Next.js API route `/api/contact`)
- **GitHub data:** GitHub REST API — fetches repos for `ChiragDodia36`
- **Deployment:** Separate Vercel project (independent from desktop portfolio)

---

## Visual Design System

### Color Palette (Adaptive)

| Token | Light | Dark |
|---|---|---|
| Background | `#F5F5F7` | `#1C1C1E` |
| Card glass | `rgba(255,255,255,0.6)` | `rgba(30,30,32,0.7)` |
| Card border | `rgba(255,255,255,0.3)` | `rgba(255,255,255,0.08)` |
| Primary text | `#1D1D1F` | `#F5F5F7` |
| Secondary text | `#6E6E73` | `#8E8E93` |
| Accent — Indigo | `#6366F1` | `#818CF8` |
| Accent — Amber | `#F59E0B` | `#FCD34D` |

- Adaptive: light by default, respects `prefers-color-scheme: dark`
- Theme crossfades smoothly (`transition: background 300ms`)

### Glass Card Recipe

```css
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid <card-border>;
border-radius: 24px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
```

### Typography

- **Font:** System font stack — SF Pro on iOS, Segoe UI on Windows, system-ui fallback
- **Headings:** Light weight (300–400), large tracking
- **Section labels:** Small caps, light weight — acts as journal chapter markers
- **Body:** Regular weight, 16px base, comfortable line height (1.6)
- No external font imports — renders natively on iOS for zero font load time

---

## Layout & Page Structure

```
┌─────────────────────────────┐
│  Fixed Header (blur bar)    │  — name + blur, collapses on scroll
├─────────────────────────────┤
│                             │
│  Hero Card                  │  — name, title, bio, CTA buttons
│  About Card                 │  — photo, journal-style bio paragraphs
│  Skills Card                │  — categorized tags (amber highlight)
│  Projects Card              │  — GitHub-pulled mini cards
│  Experience Card            │  — timeline, minimal
│  Contact Card               │  — Resend form + social links
│                             │
├─────────────────────────────┤
│  Fixed Bottom Tab Bar       │  — 5 icons, indigo active pill
└─────────────────────────────┘
```

### Header
- Fixed, full-width, `backdrop-filter: blur(20px)` — iOS Safari nav bar style
- Shows "Chirag Dodia" in light weight
- Shrinks slightly on scroll (font size + padding reduce)

### Bottom Tab Bar
- 5 tabs: About, Skills, Projects, Experience, Contact
- Active section tracked via `IntersectionObserver` — tab highlights automatically as user scrolls
- Tapping a tab smooth-scrolls to that section
- Active indicator: indigo pill that slides between tabs (spring animation)
- Icons: minimal line icons (Lucide or Heroicons)

---

## Sections

### Hero
- Full name, role ("Software Developer"), one-line bio
- Two CTA buttons: "View Projects" (indigo, filled) + "Contact Me" (ghost)
- Name types in on load (simple typewriter, no boot-screen complexity)
- Buttons slide up 150ms after name appears

### About
- Short bio paragraph (journal tone — first person, warm)
- Profile photo in a rounded glass frame

### Skills
- Skills grouped by category (Frontend, Backend, Tools, etc.)
- Each skill as a small pill/tag — amber tint on hover/active
- Data from `src/data/skills.ts`

### Projects
- Pulls public repos from GitHub API (`ChiragDodia36`)
- Each project: mini glass card — repo name, description, language badge (amber), stars, last push date
- Max 6 projects shown, sorted by last push
- API route: `/api/github` with 5-minute revalidation (`next: { revalidate: 300 }`)

### Experience
- Vertical timeline, minimal
- Each entry: role, company, date range, 1–2 bullet points
- Data from `src/data/experience.ts`

### Contact
- Form fields: Name, Email, Message
- Submits to `/api/contact` → Resend sends to `dodiachirag04@gmail.com`
- Success/error state with inline feedback (no page redirect)
- Social links: GitHub, LinkedIn — icon buttons below form

---

## Animations

All animations via Framer Motion.

| Element | Animation |
|---|---|
| Page load | Fade in `opacity: 0 → 1` over 400ms |
| Hero name | Typewriter on mount |
| Hero buttons | Slide up `translateY: 16px → 0` with 150ms delay |
| Section cards | Scroll reveal — `translateY: 24px → 0, opacity: 0 → 1` via `whileInView` |
| Card content | Staggered 150ms after card reveal |
| Project cards | Shimmer sweep on mount (once) |
| Bottom tab pill | Spring slide between tabs |
| Tab icons | Scale `1 → 1.1` on tap with bounce |
| Card press | Scale `1 → 0.98` on tap |
| Theme switch | Background crossfade `300ms` |

---

## API Routes

### `/api/github`
- Fetches public repos for `ChiragDodia36` from GitHub REST API
- Returns: name, description, language, stars, last push date
- `next: { revalidate: 300 }` (5-minute cache)

### `/api/contact`
- Accepts POST: `{ name, email, message }`
- Sends email to `dodiachirag04@gmail.com` via Resend
- Returns `{ success: true }` or `{ error: string }`
- Environment variable: `RESEND_API_KEY`

---

## File Structure

```
mobile-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx              — main scroll page
│   │   ├── layout.tsx            — root layout, theme provider
│   │   └── api/
│   │       ├── github/route.ts
│   │       └── contact/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── BottomTabBar.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Skills.tsx
│   │       ├── Projects.tsx
│   │       ├── Experience.tsx
│   │       └── Contact.tsx
│   ├── data/
│   │   ├── skills.ts
│   │   └── experience.ts
│   └── lib/
│       └── theme.ts              — adaptive theme utilities
├── public/
│   └── photo.jpg                 — profile photo
└── .env.local
    └── RESEND_API_KEY=...
```

---

## Constraints

- Mobile-only target — no responsive desktop layout needed (max-width ~430px is fine)
- No 3D, no WASD, no Canvas — pure DOM/CSS
- Performance: `backdrop-filter` on all cards may be heavy on mid-range Android — add `@media (prefers-reduced-transparency)` fallback that removes blur
- No skeleton loaders or spinners — content renders then reveals via animation
