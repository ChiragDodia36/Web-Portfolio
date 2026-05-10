export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experiences: ExperienceEntry[] = [
  {
    role: "Mobile Developer (iOS & Android)",
    company: "Indiana University Bloomington",
    period: "Nov 2025 – Present",
    bullets: [
      "Built screen-capture pipelines on iOS (ReplayKit, AVFoundation) and Android (MediaProjection, Kotlin foreground services), reducing per-frame upload size from 9.6 MB to 60 KB — a 99% reduction.",
      "Visualized sentiment trends across 5 chart types in SwiftUI and Jetpack Compose; improved upload reliability with OkHttp connection pooling and exponential backoff, sustaining 99%+ uptime.",
    ],
  },
  {
    role: "Mobile Application Developer (Flutter)",
    company: "L&T Financial Services",
    period: "Jul 2023 – Jun 2024",
    bullets: [
      "Developed cross-platform features for PLANET — L&T Finance's flagship loan app serving 10M+ users — in Flutter/Dart, maintaining feature parity across iOS and Android.",
      "Authored unit and integration tests catching 3–5 regressions per sprint; triaged Dynatrace traces reducing mean time-to-resolution from ~2 days to under 6 hours.",
    ],
  },
  {
    role: "React Native Developer",
    company: "DotMinds LLP",
    period: "Mar 2022 – Mar 2023",
    bullets: [
      "Built and shipped a cross-platform app with React Native, TypeScript, and Redux — handling all screens, REST API integrations, and state management from design hand-off to release.",
      "Optimised request payloads and response caching, reducing average screen load time by 25% measured during pre-release performance profiling.",
    ],
  },
];
