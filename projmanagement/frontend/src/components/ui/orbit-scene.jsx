import React from 'react';
import { CheckCircle2, CircleDashed, Users, Shield, Zap, Search, ChevronRight, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingWidget = ({ icon: Icon, title, tasks, color, className, delay = "0s", duration = "6s" }) => (
  <div 
    className={cn(
      "absolute rounded-2xl border border-white/10 bg-[#0e0c15]/90 backdrop-blur-xl p-[14px] flex items-center gap-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)] z-20 transition-transform duration-300 hover:scale-105 hover:border-white/20 will-change-transform",
      className
    )}
    style={{
      animation: `float ${duration} ease-in-out infinite alternate ${delay}`
    }}
  >
    <div className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-white/5" style={{ color }}>
      <Icon size={18} />
    </div>
    <div className="pr-2">
      <div className="text-white text-[13px] font-semibold font-['Space_Grotesk'] leading-tight mb-0.5">{title}</div>
      <div className="text-[#a1a1aa] text-[11px]">{tasks} tasks</div>
    </div>
  </div>
);

export function OrbitScene() {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center perspective-[1200px] max-lg:h-[500px] max-md:h-[400px]">
      
      {/* Background glow & rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
         {/* Center Glow */}
         <div className="absolute w-[700px] h-[700px] rounded-full pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(99,102,241,0.08) 0%, transparent 60%)' }} />
         
         {/* Orbit Rings (CSS rotated) */}
         <div className="absolute w-[850px] h-[850px] border-[1px] border-indigo-500/15 rounded-full max-lg:w-[600px] max-lg:h-[600px] will-change-transform" style={{ transform: 'rotateX(72deg) rotateY(-12deg)' }} />
         <div className="absolute w-[650px] h-[650px] border-[1px] border-cyan-500/15 rounded-full max-lg:w-[450px] max-lg:h-[450px] will-change-transform" style={{ transform: 'rotateX(76deg) rotateY(18deg)' }} />
         <div className="absolute w-[1050px] h-[1050px] border-[1px] border-purple-500/10 rounded-full max-lg:w-[800px] max-lg:h-[800px] will-change-transform" style={{ transform: 'rotateX(68deg) rotateY(-8deg)' }} />
         
         {/* Small glowing orbit particles */}
         <div className="absolute w-[20px] h-[20px] rounded-full top-[15%] left-[20%] -ml-[7px] -mt-[7px]" style={{ backgroundImage: 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, transparent 70%)' }} />
         <div className="absolute w-[16px] h-[16px] rounded-full bottom-[25%] right-[25%] -mr-[6px] -mb-[6px]" style={{ backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.8) 0%, transparent 70%)' }} />
         <div className="absolute w-[24px] h-[24px] rounded-full top-[30%] right-[15%] -mr-[8px] -mt-[8px]" style={{ backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.8) 0%, transparent 70%)' }} />
      </div>

      {/* Main Kanban Board (The center focus) */}
      <div 
        className="relative z-10 w-[780px] h-[480px] rounded-[24px] border border-white/10 bg-[#0a0812]/80 backdrop-blur-2xl shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8),0_0_50px_10px_rgba(99,102,241,0.08)_inset] p-[24px] flex flex-col transition-transform duration-500 hover:scale-[1.02] max-lg:scale-[0.8] max-lg:hover:scale-[0.82] max-md:scale-[0.6] max-sm:scale-[0.45]"
      >
         {/* Header */}
         <div className="flex justify-between items-center mb-[32px]">
           <div className="flex items-center gap-[12px]">
             <h3 className="text-white text-[20px] font-bold font-['Space_Grotesk'] tracking-tight">Mobile App Launch</h3>
             <span className="px-[10px] py-[3px] rounded-full bg-[rgba(255,255,255,0.06)] border border-white/5 text-[#a1a1aa] text-[11px] font-semibold uppercase tracking-wider">Active</span>
           </div>
           <div className="flex gap-[8px] items-center">
              <div className="flex -space-x-2 mr-2">
                 {[1,2,3].map((i) => (
                   <div key={i} className={`w-[26px] h-[26px] rounded-full border-2 border-[#0a0812] bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/70 overflow-hidden`}>
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="avatar" className="w-full h-full object-cover" />
                   </div>
                 ))}
                 <div className="w-[26px] h-[26px] rounded-full border-2 border-[#0a0812] bg-[#1a1728] flex items-center justify-center text-[9px] font-bold text-white/70">+4</div>
              </div>
              <div className="px-[14px] py-[6px] rounded-lg bg-white/5 border border-white/5 text-white/80 text-[12px] font-semibold hover:bg-white/10 cursor-pointer transition-colors flex items-center gap-2">View <ChevronRight size={14} /></div>
           </div>
         </div>

         {/* Columns */}
         <div className="flex gap-[16px] h-full overflow-hidden">
            {/* Column 1: Backlog */}
            <div className="flex-1 flex flex-col gap-[12px]">
               <div className="flex justify-between items-center mb-[4px]">
                 <div className="text-[#a678ff] text-[11px] font-bold uppercase tracking-[0.1em]">Backlog</div>
                 <div className="text-[#a678ff]/40 text-[11px] font-bold">4</div>
               </div>
               
               <div className="bg-[#12101b] border border-white/5 rounded-[12px] p-[16px]">
                 <p className="text-[13px] text-white/90 font-medium mb-[16px]">Market Research</p>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold text-[#a678ff] bg-[rgba(166,120,255,0.1)] border border-[rgba(166,120,255,0.15)] px-[8px] py-[3px] rounded-[6px]">Research</span>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=11" className="w-5 h-5 rounded-full bg-white/10" alt="avatar" />
                 </div>
               </div>

               <div className="bg-[#12101b] border border-white/5 rounded-[12px] p-[16px]">
                 <p className="text-[13px] text-white/90 font-medium mb-[16px]">Competitor Analysis</p>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold text-[#a678ff] bg-[rgba(166,120,255,0.1)] border border-[rgba(166,120,255,0.15)] px-[8px] py-[3px] rounded-[6px]">Research</span>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=12" className="w-5 h-5 rounded-full bg-white/10" alt="avatar" />
                 </div>
               </div>
               
               <div className="text-[#a1a1aa] text-[11px] font-medium pt-1 px-1">+ 2 more</div>
            </div>
            
            {/* Column 2: In Progress */}
            <div className="flex-1 flex flex-col gap-[12px]">
               <div className="flex justify-between items-center mb-[4px]">
                 <div className="text-[#4182ff] text-[11px] font-bold uppercase tracking-[0.1em]">In Progress</div>
                 <div className="text-[#4182ff]/40 text-[11px] font-bold">3</div>
               </div>
               
               <div className="bg-[#12101b] border border-white/5 rounded-[12px] p-[16px]">
                 <p className="text-[13px] text-white/90 font-medium mb-[16px]">UI/UX Design</p>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold text-[#4182ff] bg-[rgba(65,130,255,0.1)] border border-[rgba(65,130,255,0.15)] px-[8px] py-[3px] rounded-[6px]">Design</span>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=13" className="w-5 h-5 rounded-full bg-white/10" alt="avatar" />
                 </div>
               </div>

               {/* Active Glowing Card */}
               <div className="bg-[#171524] border border-[#41d1ff]/30 rounded-[12px] p-[16px] shadow-[0_0_20px_rgba(65,209,255,0.15)] relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-[#41d1ff]" />
                 <p className="text-[13px] text-white font-medium mb-[16px]">API Development</p>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold text-[#41d1ff] bg-[rgba(65,209,255,0.1)] border border-[rgba(65,209,255,0.15)] px-[8px] py-[3px] rounded-[6px]">Dev</span>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=14" className="w-5 h-5 rounded-full bg-white/10" alt="avatar" />
                 </div>
               </div>
            </div>

            {/* Column 3: Review */}
            <div className="flex-1 flex flex-col gap-[12px]">
               <div className="flex justify-between items-center mb-[4px]">
                 <div className="text-[#41d1ff] text-[11px] font-bold uppercase tracking-[0.1em]">Review</div>
                 <div className="text-[#41d1ff]/40 text-[11px] font-bold">2</div>
               </div>
               
               <div className="bg-[#12101b] border border-white/5 rounded-[12px] p-[16px]">
                 <p className="text-[13px] text-white/90 font-medium mb-[16px]">QA Testing</p>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold text-[#52e7bc] bg-[rgba(82,231,188,0.1)] border border-[rgba(82,231,188,0.15)] px-[8px] py-[3px] rounded-[6px]">QA</span>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=15" className="w-5 h-5 rounded-full bg-white/10" alt="avatar" />
                 </div>
               </div>
               
               <div className="bg-[#12101b] border border-white/5 rounded-[12px] p-[16px]">
                 <p className="text-[13px] text-white/90 font-medium mb-[16px]">Performance Test</p>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold text-[#41d1ff] bg-[rgba(65,209,255,0.1)] border border-[rgba(65,209,255,0.15)] px-[8px] py-[3px] rounded-[6px]">Dev</span>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=16" className="w-5 h-5 rounded-full bg-white/10" alt="avatar" />
                 </div>
               </div>
            </div>

            {/* Column 4: Done */}
            <div className="flex-1 flex flex-col gap-[12px]">
               <div className="flex justify-between items-center mb-[4px]">
                 <div className="text-[#52e7bc] text-[11px] font-bold uppercase tracking-[0.1em]">Done</div>
                 <div className="text-[#52e7bc]/40 text-[11px] font-bold">4</div>
               </div>
               
               <div className="bg-[#0e0c15] border border-white/5 rounded-[12px] p-[16px] opacity-60">
                 <p className="text-[13px] text-white/70 line-through decoration-white/30 font-medium mb-[16px]">Project Setup</p>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold text-[#52e7bc] bg-[rgba(82,231,188,0.1)] border border-[rgba(82,231,188,0.15)] px-[8px] py-[3px] rounded-[6px]">Done</span>
                 </div>
               </div>
               
               <div className="bg-[#0e0c15] border border-white/5 rounded-[12px] p-[16px] opacity-60">
                 <p className="text-[13px] text-white/70 line-through decoration-white/30 font-medium mb-[16px]">Environment Setup</p>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold text-[#52e7bc] bg-[rgba(82,231,188,0.1)] border border-[rgba(82,231,188,0.15)] px-[8px] py-[3px] rounded-[6px]">Done</span>
                 </div>
               </div>
               
               <div className="text-[#a1a1aa] text-[11px] font-medium pt-1 px-1">+ 1 more</div>
            </div>
         </div>
         
         {/* Bottom Fade Gradient for columns */}
         <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-[#0a0812] to-transparent rounded-b-[24px] pointer-events-none" />
      </div>

      {/* Floating Widgets */}
      <FloatingWidget 
        icon={PenTool} 
        title="Design" 
        tasks={4} 
        color="#a678ff"
        className="top-[18%] -left-[10%] max-lg:left-[5%] max-md:hidden"
        delay="0s"
      />
      <FloatingWidget 
        icon={Search} 
        title="Research" 
        tasks={3} 
        color="#5c82ff"
        className="bottom-[22%] -left-[8%] max-lg:left-[2%] max-md:hidden"
        delay="2s"
      />
      <FloatingWidget 
        icon={Zap} 
        title="Dev" 
        tasks={6} 
        color="#41d1ff"
        className="top-[25%] -right-[12%] max-lg:right-[2%] max-md:hidden"
        delay="1.5s"
      />
      <FloatingWidget 
        icon={Shield} 
        title="QA" 
        tasks={2} 
        color="#52e7bc"
        className="bottom-[25%] -right-[6%] max-lg:right-[5%] max-md:hidden"
        delay="3s"
      />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}} />
    </div>
  );
}
