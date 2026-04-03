"use client";

import { motion } from "motion/react";

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed inset-4 sm:inset-8 md:inset-16 z-[90] flex flex-col"
    >
      <div className="flex-1 rounded-xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-[0_16px_48px_rgba(0,0,0,0.5)] flex flex-col">
        {/* Title bar */}
        <div className="h-8 flex items-center px-3 bg-[rgba(40,40,40,0.95)] backdrop-blur-md border-b border-[rgba(255,255,255,0.06)] shrink-0">
          <div className="flex gap-1.5">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"
            />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="flex-1 text-center text-[11px] text-white/40 font-medium">
            Preview — resume.pdf
          </span>
          <a
            href="/resume.pdf"
            download
            className="text-[10px] text-accent-blue hover:text-accent-blue/80 transition-colors"
          >
            ↓ Download
          </a>
        </div>

        {/* Toolbar */}
        <div className="h-7 flex items-center justify-center gap-4 px-3 bg-[rgba(35,35,35,0.9)] border-b border-[rgba(255,255,255,0.05)] shrink-0">
          <span className="text-[10px] text-white/30">Page 1</span>
          <div className="flex gap-2">
            <span className="text-[10px] text-white/20">Zoom:</span>
            <span className="text-[10px] text-white/40">Fit</span>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 bg-[rgba(50,50,50,0.5)] overflow-hidden">
          <iframe
            src="/resume.pdf"
            className="w-full h-full border-none"
            title="Resume PDF"
          />
        </div>
      </div>

      {/* Click outside backdrop */}
      <div
        className="fixed inset-0 -z-10 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
    </motion.div>
  );
}
