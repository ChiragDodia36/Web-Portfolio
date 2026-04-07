export interface CurrentStatus {
  project: string;
  description: string;
  tech: string[];
  progress?: number; // 0-100
}

export const currentStatus: CurrentStatus = {
  project: "WC26 Fantasy Friends",
  description: "Building AI-powered fantasy football predictions with on-device inference",
  tech: ["TypeScript", "FastAPI", "Qwen3"],
  progress: 75,
};

export const focusAreas = [
  "Agentic AI Workflows",
  "Interactive Portfolio (Siri AI, Qwen/Groq)",
  "Mobile Development (SwiftUI & React Native)",
  "Full-Stack Systems",
];
