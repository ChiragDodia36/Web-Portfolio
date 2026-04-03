import type { Metadata, Viewport } from "next";
import "./globals.css";

import { CursorWrapper } from "@/components/ui/CursorWrapper";

export const metadata: Metadata = {
  title: "Chirag Dodia — Mobile & Full-Stack Engineer",
  description:
    "Portfolio showcasing mobile development, full-stack engineering, and AI projects. Built with Next.js, Three.js, and GSAP.",
  openGraph: {
    title: "Chirag Dodia — Mobile & Full-Stack Engineer",
    description:
      "Interactive 3D portfolio with Vision Pro and macOS desktop experience.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CursorWrapper />
        {children}
      </body>
    </html>
  );
}
