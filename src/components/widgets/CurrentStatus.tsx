"use client";

import { motion } from "motion/react";
import { currentStatus, focusAreas } from "@/data/status";

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export function CurrentStatusWidget() {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-xl border border-[rgba(255,255,255,0.06)] p-3 w-full">
      {/* Header */}
      <div className="flex items-center gap-1.5 mb-3">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-[#30d158]"
        />
        <span className="text-[10px] font-medium text-white/50 uppercase tracking-wider">
          Currently Working On
        </span>
      </div>

      {/* Current Project */}
      <div className="mb-3">
        <h4 className="text-xs font-medium text-white/80 mb-0.5">
          {currentStatus.project}
        </h4>
        <p className="text-[10px] text-white/40 leading-relaxed">
          {currentStatus.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1 mt-2">
          {currentStatus.tech.map((t) => (
            <span
              key={t}
              className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.04)] text-white/35"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        {currentStatus.progress !== undefined && (
          <div className="mt-2">
            <div className="flex justify-between mb-0.5">
              <span className="text-[9px] text-white/20">Progress</span>
              <span className="text-[9px] text-white/30">
                {currentStatus.progress}%
              </span>
            </div>
            <div className="h-1 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${currentStatus.progress}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-[#30d158] to-[#88aaff]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Focus Areas */}
      <div className="border-t border-[rgba(255,255,255,0.05)] pt-2">
        <p className="text-[9px] text-white/20 uppercase tracking-wider mb-1.5">
          Active Focus
        </p>
        <div className="space-y-1">
          {focusAreas.map((area) => (
            <div key={area} className="flex items-center gap-1.5">
              <div
                className="w-1 h-1 rounded-full"
                style={{
                  background: `rgba(${hexToRgb("#88aaff")}, 0.5)`,
                }}
              />
              <span className="text-[10px] text-white/40">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
