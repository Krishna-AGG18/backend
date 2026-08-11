import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Users, CheckSquare, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const OnboardingPage = () => {
  return (
    <div className="min-h-screen bg-[#050608] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Starry/Grid Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-[#050608] to-[#050608]" />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/2 right-1/4 w-[800px] h-[800px] bg-[#8b55ff]/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left: Content */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-[36px] md:text-[48px] font-bold text-white font-['Space_Grotesk'] leading-tight">
              Welcome to <span className="text-[#8b55ff]">Workloom</span>
            </h1>
            <p className="text-[15px] text-[#a1a1aa]">
              Let's set up your workspace and get your first project rolling.
            </p>
          </div>

          {/* Stepper */}
          <div className="flex flex-col md:flex-row gap-6 relative">
            {/* Connecting lines between steps (Desktop only) */}
            <div className="hidden md:block absolute top-6 left-12 right-12 h-px bg-white/10 -z-10" />

            {/* Step 1 */}
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#8b55ff]/20 border border-[#8b55ff]/40 flex items-center justify-center relative">
                <div className="absolute -top-3 -left-3 w-5 h-5 rounded-full bg-[#12101b] border border-white/20 flex items-center justify-center text-[10px] text-white">1</div>
                <Box size={24} className="text-[#8b55ff]" />
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-white mb-1">Create a Project</h3>
                <p className="text-[12px] text-[#a1a1aa] leading-relaxed">Start by creating a new project to organize your work.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative">
                <div className="absolute -top-3 -left-3 w-5 h-5 rounded-full bg-[#12101b] border border-white/20 flex items-center justify-center text-[10px] text-white">2</div>
                <Users size={24} className="text-[#a1a1aa]" />
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-white mb-1">Invite Your Team</h3>
                <p className="text-[12px] text-[#a1a1aa] leading-relaxed">Bring your team together and collaborate seamlessly.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative">
                <div className="absolute -top-3 -left-3 w-5 h-5 rounded-full bg-[#12101b] border border-white/20 flex items-center justify-center text-[10px] text-white">3</div>
                <CheckSquare size={24} className="text-[#a1a1aa]" />
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-white mb-1">Create Your First Task</h3>
                <p className="text-[12px] text-[#a1a1aa] leading-relaxed">Break things down into tasks and track progress.</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
            <Link 
              to="/dashboard"
              className="bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[14px] font-medium py-3.5 px-8 rounded-lg transition-colors shadow-[0_0_20px_rgba(139,85,255,0.4)] flex items-center gap-2"
            >
              <Box size={18} /> Create Your First Project
            </Link>
            <Link 
              to="#"
              className="text-[#a1a1aa] hover:text-white text-[14px] font-medium transition-colors flex items-center gap-2"
            >
              Invite Your Team <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="hidden lg:flex items-center justify-center relative h-[400px]">
          {/* Base Grid Platform */}
          <div className="absolute bottom-0 w-[400px] h-[200px] border border-white/10 bg-[#12101b]/50 transform rotate-[-30deg] skew-x-[30deg] rounded-3xl" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
          
          {/* Main glowing cube */}
          <div className="absolute top-1/4 w-32 h-32 bg-[#8b55ff]/30 backdrop-blur-md border border-[#8b55ff]/50 transform rotate-[-30deg] skew-x-[30deg] rounded-xl shadow-[0_0_50px_rgba(139,85,255,0.6)] animate-pulse flex items-center justify-center">
             <div className="w-full h-full border border-white/20 rounded-xl mix-blend-overlay"></div>
          </div>
          
          {/* Floating small cubes */}
          <div className="absolute top-1/2 -left-10 w-12 h-12 bg-[#52e7bc]/20 backdrop-blur-md border border-[#52e7bc]/40 transform rotate-[-30deg] skew-x-[30deg] rounded-lg animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-500/20 backdrop-blur-md border border-blue-500/40 transform rotate-[-30deg] skew-x-[30deg] rounded-lg animate-bounce" style={{ animationDuration: '4s' }}></div>
        </div>

      </div>
    </div>
  );
};
