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
    role: "Full Stack Developer",
    company: "DotMinds LLP",
    location: "Mumbai, India",
    startDate: "Mar 2022",
    endDate: "Sep 2022",
  },
  {
    role: "Software Engineer (Mobile)",
    company: "Indiana University",
    location: "Bloomington, USA",
    startDate: "Nov 2025",
    endDate: "Present",
    current: true,
  },
  {
    role: "Software Engineer",
    company: "L&T Financial Services",
    location: "Bangalore, India",
    startDate: "Jul 2023",
    endDate: "Jun 2024",
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
    years: "2024 - 2026",
    gpa: "3.65 GPA",
  },
  {
    school: "University of Mumbai",
    degree: "BE Information Technology",
    years: "2020 - 2023",
    gpa: "8.83 CGPA",
  },
];
