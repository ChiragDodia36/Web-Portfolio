export interface Skill {
  name: string;
  icon: string;
  proficiency: number; // 0-100
  color: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "TypeScript", icon: "TS", proficiency: 92, color: "#3178c6" },
      { name: "Python", icon: "Py", proficiency: 88, color: "#3776ab" },
      { name: "JavaScript", icon: "JS", proficiency: 94, color: "#f7df1e" },
      { name: "Swift", icon: "Sw", proficiency: 85, color: "#f05138" },
      { name: "Kotlin", icon: "Kt", proficiency: 82, color: "#7f52ff" },
      { name: "Java", icon: "Jv", proficiency: 80, color: "#ed8b00" },
      { name: "C++", icon: "C+", proficiency: 72, color: "#00599c" },
      { name: "SQL", icon: "SQ", proficiency: 85, color: "#336791" },
      { name: "Dart", icon: "Dt", proficiency: 78, color: "#02569b" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", icon: "Re", proficiency: 93, color: "#61dafb" },
      { name: "React Native", icon: "RN", proficiency: 90, color: "#61dafb" },
      { name: "Next.js", icon: "Nx", proficiency: 88, color: "#ffffff" },
      { name: "SwiftUI", icon: "SU", proficiency: 85, color: "#f05138" },
      { name: "Flutter", icon: "Fl", proficiency: 84, color: "#02569b" },
      { name: "Tailwind CSS", icon: "TW", proficiency: 90, color: "#38bdf8" },
      { name: "Three.js", icon: "3D", proficiency: 72, color: "#049ef4" },
      { name: "Redux", icon: "Rx", proficiency: 82, color: "#764abc" },
      { name: "HTML/CSS", icon: "HC", proficiency: 95, color: "#e44d26" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", icon: "Nj", proficiency: 88, color: "#689f38" },
      { name: "Express", icon: "Ex", proficiency: 86, color: "#ffffff" },
      { name: "FastAPI", icon: "FA", proficiency: 82, color: "#009688" },
      { name: "PostgreSQL", icon: "PG", proficiency: 82, color: "#336791" },
      { name: "MongoDB", icon: "MG", proficiency: 80, color: "#47a248" },
      { name: "Redis", icon: "Rd", proficiency: 74, color: "#dc382d" },
      { name: "Firebase", icon: "FB", proficiency: 86, color: "#ffca28" },
      { name: "GraphQL", icon: "GQ", proficiency: 80, color: "#e535ab" },
      { name: "REST APIs", icon: "AP", proficiency: 92, color: "#30d158" },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    skills: [
      { name: "TensorFlow", icon: "TF", proficiency: 76, color: "#ff6f00" },
      { name: "PyTorch", icon: "PT", proficiency: 74, color: "#ee4c2c" },
      { name: "LangChain", icon: "LC", proficiency: 80, color: "#1c3c3c" },
      { name: "OpenAI API", icon: "AI", proficiency: 84, color: "#412991" },
      { name: "Hugging Face", icon: "HF", proficiency: 72, color: "#ffbd45" },
      { name: "scikit-learn", icon: "SK", proficiency: 78, color: "#f89939" },
      { name: "Pandas", icon: "Pd", proficiency: 82, color: "#150458" },
      { name: "NumPy", icon: "NP", proficiency: 80, color: "#4dabcf" },
      { name: "NLP", icon: "NL", proficiency: 70, color: "#88aaff" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    skills: [
      { name: "Docker", icon: "Dk", proficiency: 82, color: "#2496ed" },
      { name: "AWS", icon: "AW", proficiency: 78, color: "#ff9900" },
      { name: "GCP", icon: "GC", proficiency: 72, color: "#4285f4" },
      { name: "CI/CD", icon: "CI", proficiency: 80, color: "#30d158" },
      { name: "Git", icon: "Gt", proficiency: 92, color: "#f05032" },
      { name: "Kubernetes", icon: "K8", proficiency: 68, color: "#326ce5" },
      { name: "Linux", icon: "Lx", proficiency: 84, color: "#fcc624" },
      { name: "Vercel", icon: "Vc", proficiency: 88, color: "#ffffff" },
      { name: "Terraform", icon: "Tf", proficiency: 65, color: "#7b42bc" },
    ],
  },
];
