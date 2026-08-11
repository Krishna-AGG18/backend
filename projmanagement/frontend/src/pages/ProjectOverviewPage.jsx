import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowLeft, Star, FileText } from 'lucide-react';

const Card = ({ children, className }) => (
  <div className={cn("bg-[#12101b] border border-white/5 rounded-xl p-6", className)}>
    {children}
  </div>
);

export const ProjectOverviewPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Tasks', 'Timeline', 'Files', 'Discussions', 'Notes'];

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto space-y-8">
      
      {/* Back & Header */}
      <div className="shrink-0 space-y-6">
        <button 
          onClick={() => navigate('/dashboard/projects')}
          className="text-[12px] text-[#a1a1aa] hover:text-white flex items-center gap-2 transition-colors w-fit"
        >
          <ArrowLeft size={14} /> Back to Projects
        </button>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 border border-white/5 flex items-center justify-center text-[24px] font-bold shrink-0">
              L
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-[28px] font-bold text-white font-['Space_Grotesk'] tracking-tight leading-none">
                  Loom Website Redesign
                </h1>
                <Star size={20} className="text-[#f59e0b] fill-[#f59e0b] cursor-pointer hover:scale-110 transition-transform" />
              </div>
              <p className="text-[14px] text-[#a1a1aa] mb-4">
                Redesigning the marketing website for better engagement and conversions.
              </p>
              
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#4182ff]/10 text-[#4182ff] border border-[#4182ff]/20 text-[11px] font-medium px-2.5 py-1 rounded-full">
                  In Progress
                </span>
                <span className="bg-transparent text-red-400 border border-red-500/30 text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> High Priority
                </span>
                <span className="text-[12px] text-[#a1a1aa] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                  Due Jun 15, 2024
                </span>
              </div>
            </div>
          </div>

          {/* Right Header Stats */}
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-2 min-w-[140px]">
              <div className="flex justify-between text-[12px] font-medium">
                <span className="text-white">Progress</span>
                <span className="text-[#a1a1aa]">68%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#8b55ff] to-[#4182ff] rounded-full w-[68%]" />
              </div>
            </div>
            
            <div>
              <div className="text-[12px] text-[#a1a1aa] font-medium mb-2">Members</div>
              <div className="flex -space-x-2">
                {['Olivia', 'Phoenix', 'Lana', 'Demi'].map((member, i) => (
                  <img 
                    key={i} 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member}`} 
                    alt={member} 
                    className="w-8 h-8 rounded-full bg-[#12101b] border-2 border-[#12101b] cursor-pointer hover:z-10 relative"
                  />
                ))}
                <div className="w-8 h-8 rounded-full bg-white/5 border-2 border-[#12101b] flex items-center justify-center text-[10px] font-medium text-white cursor-pointer hover:bg-white/10 transition-colors z-10">
                  +3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-white/5 shrink-0 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "text-[13px] font-medium pb-4 border-b-2 transition-colors whitespace-nowrap",
              activeTab === tab 
                ? "text-white border-[#8b55ff]" 
                : "text-[#a1a1aa] border-transparent hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0 pb-10">
        
        {/* Task Summary Donut */}
        <Card className="col-span-1">
          <h3 className="text-[14px] font-semibold text-white mb-6">Task Summary</h3>
          <div className="flex items-center gap-8">
            {/* Donut SVG */}
            <div className="relative w-[140px] h-[140px] shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" stroke="#1f1d2b" strokeWidth="16" fill="none" />
                
                {/* To Do (19%) */}
                <circle cx="50" cy="50" r="38" stroke="#a1a1aa" strokeWidth="16" fill="none" strokeDasharray="238.76" strokeDashoffset="0" />
                {/* In Progress (33%) */}
                <circle cx="50" cy="50" r="38" stroke="#4182ff" strokeWidth="16" fill="none" strokeDasharray="238.76" strokeDashoffset="45.36" />
                {/* Completed (42%) */}
                <circle cx="50" cy="50" r="38" stroke="#52e7bc" strokeWidth="16" fill="none" strokeDasharray="238.76" strokeDashoffset="124.15" className="drop-shadow-[0_0_8px_rgba(82,231,188,0.4)]" />
                {/* Blocked (6%) */}
                <circle cx="50" cy="50" r="38" stroke="#ef4444" strokeWidth="16" fill="none" strokeDasharray="238.76" strokeDashoffset="224.43" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white text-[28px] font-bold leading-none mb-1">48</span>
                <span className="text-[#a1a1aa] text-[10px]">Total</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-3 justify-center flex-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#52e7bc]" />
                <div className="flex justify-between w-full">
                  <span className="text-[11px] text-white/90">Completed</span>
                  <span className="text-[10px] text-[#a1a1aa]">20 (42%)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4182ff]" />
                <div className="flex justify-between w-full">
                  <span className="text-[11px] text-white/90">In Progress</span>
                  <span className="text-[10px] text-[#a1a1aa]">16 (33%)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#a1a1aa]" />
                <div className="flex justify-between w-full">
                  <span className="text-[11px] text-white/90">To Do</span>
                  <span className="text-[10px] text-[#a1a1aa]">9 (19%)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <div className="flex justify-between w-full">
                  <span className="text-[11px] text-white/90">Blocked</span>
                  <span className="text-[10px] text-[#a1a1aa]">3 (6%)</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[14px] font-semibold text-white">Recent Activity</h3>
            <button onClick={() => navigate('/dashboard/projects/1/activity')} className="text-[11px] text-[#8b55ff] hover:underline font-medium">View all activity</button>
          </div>
          <div className="space-y-5">
            {[
              { a: 'Ethan', img: 'Ethan', action: 'updated a task', t: 'Design system updates', time: '2m ago' },
              { a: 'Mia', img: 'Mia', action: 'completed a task', t: 'Homepage wireframe', time: '1h ago' },
              { a: 'Noah', img: 'Noah', action: 'added a comment', t: 'On Hero section design', time: '3h ago' }
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${act.img}`} alt={act.a} className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-white/90 leading-snug mb-0.5">
                    <span className="font-semibold text-white">{act.a}</span> {act.action}
                  </div>
                  <div className="text-[12px] text-[#a1a1aa] truncate">{act.t}</div>
                </div>
                <div className="text-[11px] text-[#a1a1aa] shrink-0 mt-0.5">
                  {act.time}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Project Description */}
        <Card className="col-span-1">
          <h3 className="text-[14px] font-semibold text-white mb-4">Project Description</h3>
          <p className="text-[13px] text-[#a1a1aa] leading-relaxed mb-4">
            We're redesigning our marketing website to improve user engagement, communicate our value proposition more clearly, and increase conversion rates. This includes a new visual design, improved content structure, and performance optimizations.
          </p>
          <button className="text-[11px] text-[#8b55ff] hover:underline font-medium">View full description</button>
        </Card>

        {/* Notes Preview */}
        <Card className="col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[14px] font-semibold text-white">Notes Preview</h3>
            <button onClick={() => navigate('/dashboard/projects/1/notes')} className="text-[11px] text-[#8b55ff] hover:underline font-medium">View all notes</button>
          </div>
          <div className="space-y-4">
            {[
              { t: 'Design Inspiration', d: 'Updated 2h ago' },
              { t: 'User Feedback Summary', d: 'Updated 1d ago' },
              { t: 'Content Guidelines', d: 'Updated 2d ago' },
            ].map((note, i) => (
              <div key={i} className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#8b55ff]/10 group-hover:text-[#8b55ff] transition-colors">
                  <FileText size={14} className="text-[#a1a1aa] group-hover:text-[#8b55ff] transition-colors" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-white mb-0.5 group-hover:text-[#8b55ff] transition-colors">{note.t}</div>
                  <div className="text-[11px] text-[#a1a1aa]">{note.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
};
