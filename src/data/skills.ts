export type SkillCategory = {
  category: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "iOS",
    skills: ["Swift", "SwiftUI", "UIKit", "AVFoundation", "Core Data", "Swift Charts", "Alamofire", "Xcode"],
  },
  {
    category: "Android",
    skills: ["Kotlin", "Jetpack Compose", "ViewModel", "Coroutines", "Flow", "Room", "Android Studio"],
  },
  {
    category: "Cross-Platform",
    skills: ["React Native", "Flutter", "Expo Router", "TypeScript", "Redux", "Zustand", "Dart", "Bloc"],
  },
  {
    category: "Backend & Data",
    skills: ["FastAPI", "Node.js", "PostgreSQL", "Firebase", "SQLite", "ChromaDB", "REST APIs"],
  },
  {
    category: "Testing & DevOps",
    skills: ["Jest", "GitHub Actions", "Docker", "AWS", "Git", "Linux"],
  },
];
