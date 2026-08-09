import React from "react";
import { cn } from "@/lib/utils";

export function HighlightCard({ children, className, glowColor = "rgba(255,255,255,0.1)" }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "relative group overflow-hidden rounded-xl border border-white/5 bg-[#08070e] transition-colors duration-500 hover:border-white/10",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--x, 0) var(--y, 0), ${glowColor}, transparent 40%)`
        }}
      />
      <div className="relative z-10 p-6 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
