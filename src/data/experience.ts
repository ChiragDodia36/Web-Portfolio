export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experiences: ExperienceEntry[] = [
  {
    role: "Software Developer",
    company: "Freelance",
    period: "2024 – Present",
    bullets: [
      "Built full-stack web apps for clients using Next.js and Node.js.",
      "Delivered responsive, accessible UIs with Tailwind CSS and Framer Motion.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Startup",
    period: "2023",
    bullets: [
      "Developed React components and integrated REST APIs.",
      "Improved page load performance by 30% through code-splitting and lazy loading.",
    ],
  },
];
