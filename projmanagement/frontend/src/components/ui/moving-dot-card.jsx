import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function MovingDotCard({ children, className, dotColor = "#41d1ff", bgGlow = "rgba(65,209,255,0.08)" }) {
  const containerRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let startTime;
    const duration = 4000; // 4 seconds for one full lap

    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = (elapsed % duration) / duration;

      if (containerRef.current && dotRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        
        // Inset matches the line positions
        const inset = 24; 
        const pathWidth = width - inset * 2;
        const pathHeight = height - inset * 2;
        
        // Total distance the dot travels
        const perimeter = pathWidth * 2 + pathHeight * 2;
        let currentPos = progress * perimeter;
        
        let x = 0;
        let y = 0;

        // Traverse Top edge (left to right)
        if (currentPos < pathWidth) {
          x = currentPos;
          y = 0;
        } 
        // Traverse Right edge (top to bottom)
        else if (currentPos < pathWidth + pathHeight) {
          x = pathWidth;
          y = currentPos - pathWidth;
        } 
        // Traverse Bottom edge (right to left)
        else if (currentPos < pathWidth * 2 + pathHeight) {
          x = pathWidth - (currentPos - (pathWidth + pathHeight));
          y = pathHeight;
        } 
        // Traverse Left edge (bottom to top)
        else {
          x = 0;
          y = pathHeight - (currentPos - (pathWidth * 2 + pathHeight));
        }

        // Apply transform. The dot is absolutely positioned at top: inset, left: inset.
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-[#08070e] border border-white/5 shadow-2xl",
        className
      )}
    >
      {/* Subtle background radial gradient */}
      <div 
        className="absolute inset-0 pointer-events-none transition-colors duration-500" 
        style={{ backgroundImage: `radial-gradient(circle at center, ${bgGlow} 0%, transparent 70%)` }}
      />

      {/* Grid Lines */}
      <div className="absolute top-[24px] left-0 right-0 h-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute bottom-[24px] left-0 right-0 h-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute left-[24px] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute right-[24px] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />

      {/* The Moving Dot */}
      {/* Positioned exactly at the top-left intersection (left: 24, top: 24) */}
      <div
        className="absolute left-[24px] top-[24px] -ml-[3px] -mt-[3px] pointer-events-none z-20"
        ref={dotRef}
      >
        <div 
          className="w-[7px] h-[7px] rounded-full transition-colors duration-500" 
          style={{
            backgroundColor: dotColor,
            boxShadow: `0 0 12px 3px ${dotColor}`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full p-8 flex flex-col items-start justify-center text-left">
        {children}
      </div>
    </div>
  );
}
