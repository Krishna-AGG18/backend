import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-background px-8 md:px-12 pb-8 overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-10">
            <div className="flex items-center gap-3">
              <img src="/workloom-logo.png" alt="Workloom Logo" className="h-10 w-10 object-contain drop-shadow-[0_0_12px_rgba(124,60,255,0.44)]" />
              <div className="font-['Space_Grotesk'] font-bold text-xl tracking-[0.2em] uppercase">
                <span className="text-primary">WORK</span><span className="text-foreground">LOOM</span>
              </div>
            </div>
            
            <p className="text-muted-foreground text-[15px] leading-relaxed max-w-sm">
              Plan, collaborate, ship. <span className="italic font-serif">Designing for momentum.</span> The modern workspace for delivering work that matters.
            </p>
          </div>
          
          {/* Right Columns */}
          <div className="lg:col-span-7 flex flex-row gap-16 lg:gap-24 pt-4 lg:pl-16">
            <div className="space-y-8">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary flex items-center gap-3">
                <span className="w-3 h-[1px] bg-primary"></span> Resources
              </h4>
              <ul className="space-y-5 text-[14px] text-muted-foreground font-medium">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary flex items-center gap-3">
                <span className="w-3 h-[1px] bg-primary"></span> Connect
              </h4>
              <ul className="space-y-5 text-[14px] text-muted-foreground font-medium">
                <li><a href="https://www.linkedin.com/in/krishnawd" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="https://x.com/krishna2909782" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter (X)</a></li>
                <li><a href="https://github.com/Krishna-agg18" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] text-muted-foreground/60 font-mono uppercase tracking-[0.2em]">
          <p>© 2026 Workloom · Made for teams that move together</p>
          <p>Organize the work. Own the momentum.</p>
          <p>Build Beyond Screens</p>
        </div>
        
        {/* Giant Outline Text */}
        <div className="mt-8 w-full overflow-hidden select-none pointer-events-none opacity-40">
          <svg viewBox="0 0 1200 200" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <text 
              x="50%" 
              y="150" 
              textAnchor="middle" 
              className="font-['Space_Grotesk'] font-bold"
              style={{
                fontSize: '130px',
                fill: 'transparent',
                stroke: 'currentColor',
                color: 'var(--border)',
                strokeWidth: '2px',
                letterSpacing: '0.05em'
              }}
            >
              WORKLOOM
            </text>
            <text
              x="98%"
              y="70"
              textAnchor="end"
              className="font-sans font-bold"
              style={{
                fontSize: '24px',
                fill: 'var(--muted-foreground)',
              }}
            >
              TM
            </text>
          </svg>
        </div>
        
      </div>
    </footer>
  );
}
