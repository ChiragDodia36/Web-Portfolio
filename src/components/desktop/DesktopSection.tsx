"use client";

import { type ReactNode } from "react";

interface DesktopSectionProps {
  appName: string;
  children: ReactNode;
  id?: string;
}

export function DesktopSection({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  appName,
  children,
  id,
}: DesktopSectionProps) {
  return (
    <section
      id={id}
      className="bg-black min-h-[420px] relative overflow-hidden pb-16"
    >
      {/* Subtle aurora overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 25% 20%, rgba(80,60,180,0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 65% 50%, rgba(60,120,200,0.025) 0%, transparent 50%),
            radial-gradient(ellipse at 45% 80%, rgba(100,60,160,0.02) 0%, transparent 40%)
          `,
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </section>
  );
}

