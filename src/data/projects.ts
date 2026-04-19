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
    title: "BT Transit App",
    description:
      "Real-time bus transit tracking app for Brampton Transit with live route updates and trip planning",
    tags: ["Swift", "SwiftUI", "CoreLocation", "Transit API"],
    github: "https://github.com/ChiragDodia36/BT_transit_App",
    color: "#0a84ff",
    category: "mobile",
    icon: "🚌",
  },
  {
    title: "Stock Trading Platform",
    description:
      "Native iOS Trading App with real-time market data and portfolio tracking",
    tags: ["SwiftUI", "Finnhub", "Alamofire"],
    github: "https://github.com/ChiragDodia36/AppDev-IOS",
    color: "#f05138",
    category: "mobile",
    icon: "📈",
  },
  {
    title: "Netflix Clone",
    description:
      "Full-stack Netflix replica with user authentication and movie streaming",
    tags: ["React", "Node.js", "MongoDB", "TMDB API"],
    github: "https://github.com/ChiragDodia36/Netflix_Clone",
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
