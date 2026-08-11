import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#050608] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b55ff]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left: Illustration Area */}
        <div className="relative h-[300px] flex items-center justify-center">
          {/* Isometric Blocks (CSS representation) */}
          <div className="relative w-48 h-48">
            {/* Base block */}
            <div className="absolute bottom-0 left-0 w-32 h-16 bg-[#12101b] border border-white/10 skew-y-[20deg] transform -rotate-45 rounded shadow-[0_20px_40px_rgba(0,0,0,0.5)]"></div>
            {/* Step block */}
            <div className="absolute bottom-8 left-8 w-24 h-12 bg-[#1a1726] border border-white/10 skew-y-[20deg] transform -rotate-45 rounded"></div>
            {/* Top block */}
            <div className="absolute bottom-16 left-16 w-16 h-8 bg-blue-500/20 border border-blue-500/40 skew-y-[20deg] transform -rotate-45 rounded flex items-center justify-center">
              <div className="transform rotate-45 -skew-y-[20deg] translate-y-[-20px]">
                <Compass size={48} className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
              </div>
            </div>
            {/* Floating blocks */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-[#8b55ff]/20 border border-[#8b55ff]/40 skew-y-[20deg] transform -rotate-45 rounded animate-bounce"></div>
            <div className="absolute bottom-10 -left-10 w-6 h-6 bg-[#52e7bc]/20 border border-[#52e7bc]/40 skew-y-[20deg] transform -rotate-45 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="space-y-6 text-center md:text-left">
          <div className="text-[#8b55ff] font-mono font-bold text-[64px] leading-none mb-2">404</div>
          <h1 className="text-[32px] md:text-[40px] font-bold text-white font-['Space_Grotesk'] leading-tight">
            Page not found
          </h1>
          <div className="space-y-4 text-[15px] text-[#a1a1aa] leading-relaxed">
            <p>
              Oops! The page you're looking for seems to have wandered off.
            </p>
            <p>
              It might have been moved, deleted, or perhaps it never existed in the first place.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
            <Link 
              to="/dashboard"
              className="w-full sm:w-auto bg-[linear-gradient(135deg,#8b55ff,#5b28d9)] hover:opacity-90 text-white text-[14px] font-medium py-3 px-6 rounded-[11px] transition-all shadow-[0_4px_14px_rgba(95,40,214,.4)] hover:shadow-[0_6px_20px_rgba(95,40,214,.6)] hover:-translate-y-[2px] text-center"
            >
              Back to Dashboard
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto bg-transparent border border-[var(--line)] hover:bg-[rgba(255,255,255,.045)] text-white text-[14px] font-medium py-3 px-6 rounded-[11px] transition-all text-center"
            >
              Go Back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
