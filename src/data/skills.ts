export type SkillCategory = {
  category: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Python", "REST APIs", "PostgreSQL", "Prisma"],
  },
  {
    category: "Mobile",
    skills: ["React Native", "Expo"],
  },
  {
    category: "Tools",
    skills: ["Git", "Docker", "Vercel", "Figma", "VS Code"],
  },
];
