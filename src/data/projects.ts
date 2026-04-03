export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  liveUrl?: string;
  featured?: boolean;
  color: string;
  category: "ai" | "web" | "mobile" | "blockchain";
  icon: string; // Finder file icon emoji
}

export const projects: Project[] = [
  {
    title: "WC26 Fantasy Friends",
    description:
      "Full-Stack Fantasy Football Platform with on-device AI predictions using Qwen3",
    tags: ["TypeScript", "FastAPI", "PostgreSQL", "AI / Qwen3"],
    github: "https://github.com/ChiragDodia36/WC26-Fantasy-Friends",
    featured: true,
    color: "#30d158",
    category: "ai",
    icon: "⚽",
  },
  {
    title: "FinSight",
    description:
      "Agentic Financial Document Intelligence & Risk Analyst powered by LangGraph",
    tags: ["LangGraph", "Ollama", "Python"],
    github: "https://github.com/ChiragDodia36/FinSight",
    color: "#ff9f0a",
    category: "ai",
    icon: "📊",
  },
  {
    title: "Stock Trading Platform",
    description:
      "Native iOS Trading App with real-time market data and portfolio tracking",
    tags: ["SwiftUI", "Finnhub", "Alamofire"],
    github: "https://github.com/ChiragDodia36/Stock-Trading-Platform",
    color: "#f05138",
    category: "mobile",
    icon: "📈",
  },
  {
    title: "E-Voting Blockchain",
    description:
      "Decentralized voting system using Ethereum blockchain and smart contracts",
    tags: ["Solidity", "React", "Ethereum", "Web3.js"],
    github: "https://github.com/ChiragDodia36/E-Voting-Blockchain",
    color: "#88aaff",
    category: "blockchain",
    icon: "🗳️",
  },
  {
    title: "Netflix Clone",
    description:
      "Full-stack Netflix replica with user authentication and movie streaming",
    tags: ["React", "Node.js", "MongoDB", "TMDB API"],
    github: "https://github.com/ChiragDodia36/Netflix-Clone",
    color: "#bf5af2",
    category: "web",
    icon: "🎬",
  },
];

export const projectCategories = [
  { id: "all", label: "All", icon: "📁" },
  { id: "ai", label: "AI / ML", icon: "🤖" },
  { id: "web", label: "Web", icon: "🌐" },
  { id: "mobile", label: "Mobile", icon: "📱" },
  { id: "blockchain", label: "Blockchain", icon: "⛓️" },
];
