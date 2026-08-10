import React from 'react';
import { Link } from 'react-router-dom';
import WarpText from '../3d/WrapText';
import { ArrowLeft } from 'lucide-react';

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen w-full flex bg-[#050608] text-white font-['DM_Sans']">
      
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10">
        
        {/* Header / Back Link */}
        <div className="p-8 md:p-12 absolute top-0 left-0 w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/workloom-logo.png" alt="Workloom Logo" className="w-8 h-8 object-contain drop-shadow-[0_0_12px_rgba(124,60,255,0.44)]" />
            <div className="font-['Space_Grotesk'] font-bold text-lg tracking-[0.1em] uppercase">
              <span className="text-primary">WORK</span><span className="text-foreground">LOOM</span>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-white transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to home
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center max-w-[480px] w-full mx-auto px-6 py-24 md:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] tracking-tight mb-3">{title}</h1>
            {subtitle && <p className="text-[#a1a1aa] text-[15px]">{subtitle}</p>}
          </div>
          
          {children}
        </div>
      </div>

      {/* Right Column: Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0a0812] border-l border-white/5 items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(166,120,255,0.1) 0%, transparent 60%)' }} />
        <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(65,209,255,0.08) 0%, transparent 60%)' }} />
        
        {/* Grid Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)_translateY(-100px)_scale(3)]" />

        {/* Central Graphic */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-[120px] h-[120px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center mb-8 shadow-[0_0_80px_rgba(124,60,255,0.2)]">
             <img src="/workloom-logo.png" alt="Workloom Logo" className="w-[60px] h-[60px] object-contain drop-shadow-[0_0_24px_rgba(124,60,255,0.8)] animate-pulse" />
          </div>
          
          <div className="h-[60px] w-[300px] flex items-center justify-center">
            <WarpText 
              text="Design for Momentum"
              color="#ffffff"
              fontSize={28}
              fontWeight={600}
              fontFamily="'Space Grotesk', sans-serif"
            />
          </div>
          <p className="text-[#a1a1aa] text-center max-w-sm mt-4 text-[15px] leading-relaxed">
            The intelligent workspace that helps fast-moving teams plan, collaborate, and ship high-quality products.
          </p>
        </div>

        {/* Floating elements */}
        <div className="absolute top-[20%] left-[20%] w-[8px] h-[8px] rounded-full bg-primary/80 blur-[1px]" style={{ animation: 'float 6s ease-in-out infinite' }} />
        <div className="absolute bottom-[30%] right-[30%] w-[12px] h-[12px] rounded-full bg-[#52e7bc]/80 blur-[1px]" style={{ animation: 'float 8s ease-in-out infinite 1s' }} />
        <div className="absolute top-[60%] right-[20%] w-[6px] h-[6px] rounded-full bg-[#41d1ff]/80 blur-[1px]" style={{ animation: 'float 5s ease-in-out infinite 2s' }} />
      </div>

    </div>
  );
}
