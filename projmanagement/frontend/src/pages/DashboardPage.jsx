import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, ChevronDown, Plus } from 'lucide-react';

const Card = ({ children, className }) => (
  <div className={cn("bg-[#0a0812]/50 border border-white/5 rounded-[16px] p-[20px] backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)]", className)}>
    {children}
  </div>
);

export const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl">
      
      {/* Header section */}
      <div>
        <h1 className="text-[28px] md:text-[32px] font-bold font-['Space_Grotesk'] text-white tracking-tight mb-2">
          Welcome back, Krishna
        </h1>
        <p className="text-[#a1a1aa] text-[15px]">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Main Grid */}
      <div className="flex flex-col gap-[16px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
          
          {/* Circular Progress */}
          <Card className="flex flex-col">
            <h4 className="text-white text-[14px] font-semibold mb-[24px]">Project Progress</h4>
            <div className="flex items-center gap-[24px]">
              <div className="relative w-[100px] h-[100px] shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#1f1d2b" strokeWidth="12" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="#4182ff" strokeWidth="12" fill="none" strokeDasharray="251.2" strokeDashoffset="45.2" className="drop-shadow-[0_0_10px_rgba(65,130,255,0.6)]" />
                  <circle cx="50" cy="50" r="40" stroke="#52e7bc" strokeWidth="12" fill="none" strokeDasharray="251.2" strokeDashoffset="180" className="drop-shadow-[0_0_10px_rgba(82,231,188,0.6)]" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white text-[20px] font-bold">72%</span>
                  <span className="text-[#a1a1aa] text-[9px]">Completed</span>
                </div>
              </div>
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-2 text-[12px]"><div className="w-2.5 h-2.5 bg-[#52e7bc] rounded-[2px]"/> <span className="text-white">Done</span> <span className="text-[#a1a1aa] ml-auto">72%</span></div>
                <div className="flex items-center gap-2 text-[12px]"><div className="w-2.5 h-2.5 bg-[#4182ff] rounded-[2px]"/> <span className="text-white">In Progress</span> <span className="text-[#a1a1aa] ml-auto">18%</span></div>
                <div className="flex items-center gap-2 text-[12px]"><div className="w-2.5 h-2.5 bg-[#8a8897] rounded-[2px]"/> <span className="text-white">Todo</span> <span className="text-[#a1a1aa] ml-auto">10%</span></div>
              </div>
            </div>
            <div className="mt-[32px] pt-[16px] border-t border-white/5 flex justify-between">
                <div>
                  <div className="text-white text-[13px] font-bold">72 / 100</div>
                  <div className="text-[#a1a1aa] text-[11px]">Tasks</div>
                </div>
                <div className="text-right">
                  <div className="text-[#52e7bc] text-[13px] font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Excellent</div>
                  <div className="text-[#a1a1aa] text-[11px]">On Track</div>
                </div>
            </div>
          </Card>

          {/* Line Chart */}
          <Card className="col-span-1">
            <div className="flex justify-between items-center mb-[24px]">
              <h4 className="text-white text-[14px] font-semibold">Task Completion</h4>
              <div className="bg-white/5 border border-white/5 rounded-md px-2 py-1 text-[11px] text-[#a1a1aa] flex items-center gap-1 cursor-pointer hover:bg-white/10">This Month <ChevronDown size={12}/></div>
            </div>
            <div className="relative h-[120px] w-full flex items-end">
                {/* Y Axis */}
                <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-[#a1a1aa]">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>
                {/* X Axis */}
                <div className="absolute left-8 right-0 bottom-0 flex justify-between text-[10px] text-[#a1a1aa]">
                  <span>Apr 1</span>
                  <span>Apr 15</span>
                  <span>May 1</span>
                  <span>May 15</span>
                  <span>Jun 1</span>
                </div>
                {/* Grid lines */}
                <div className="absolute left-8 right-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
                  <div className="w-full h-[1px] bg-white/5" />
                  <div className="w-full h-[1px] bg-white/5" />
                  <div className="w-full h-[1px] bg-white/5" />
                  <div className="w-full h-[1px] bg-white/5" />
                  <div className="w-full h-[1px] bg-white/5" />
                </div>
                {/* Line SVG */}
                <div className="absolute left-8 right-0 top-1 bottom-6 overflow-visible pointer-events-none">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <polyline points="0,90 20,90 40,60 60,35 80,10 100,10" fill="none" stroke="#52e7bc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Area gradient under line */}
                    <polygon points="0,100 0,90 20,90 40,60 60,35 80,10 100,10 100,100" fill="url(#grad)" opacity="0.15" />
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#52e7bc" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                    <circle cx="80" cy="10" r="3" fill="#0a0812" stroke="#52e7bc" strokeWidth="2" title="72% - May 20" className="cursor-pointer pointer-events-auto hover:scale-150 transition-transform" />
                  </svg>
                </div>
            </div>
          </Card>

          {/* Upcoming */}
          <Card className="flex flex-col">
            <h4 className="text-white text-[14px] font-semibold mb-[24px]">Upcoming</h4>
            <div className="flex flex-col gap-[16px]">
              {[
                { n: 'User Testing', d: 'May 24' },
                { n: 'Content Review', d: 'May 26' },
                { n: 'Performance Test', d: 'May 29' },
                { n: 'Launch Readiness', d: 'Jun 2' }
              ].map((u, i) => (
                <div key={i} className="flex justify-between items-center text-[13px]">
                  <span className="text-white/80">{u.n}</span>
                  <span className="text-[#a1a1aa]">{u.d}</span>
                </div>
              ))}
            </div>
            <button className="text-[#a1a1aa] text-[13px] flex items-center gap-2 mt-auto pt-[16px] border-t border-white/5 cursor-pointer hover:text-white transition-colors">
              <Plus size={14} /> View all tasks
            </button>
          </Card>
        </div>
        
        {/* Horizontal Timeline */}
        <Card className="flex items-center p-[20px] max-md:flex-col max-md:items-start max-md:gap-4 overflow-x-auto overflow-y-hidden hide-scrollbar">
          <h4 className="text-white text-[14px] font-semibold w-[120px] shrink-0">Recent Activity</h4>
          <div className="flex-1 flex items-center min-w-[500px]">
            <div className="w-full h-[2px] bg-white/10 relative flex items-center justify-between">
              <div className="absolute left-0 h-full bg-[#5c82ff] w-[80%]" />
              
              {[
                { t: 'Project created', d: 'Apr 10', done: true },
                { t: 'First task added', d: 'Apr 11', done: true },
                { t: 'Team invited', d: 'Apr 12', done: true },
                { t: '50% completed', d: 'Apr 28', done: true, color: 'text-[#a678ff]' },
                { t: 'On track', d: 'Today', done: false, color: 'text-[#52e7bc]' }
              ].map((s, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div className={`w-[20px] h-[20px] rounded-full border-2 ${s.done ? 'bg-[#0a0812] border-[#5c82ff]' : 'bg-[#0a0812] border-[#52e7bc]'} flex items-center justify-center mb-2`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${s.done ? 'bg-[#5c82ff]' : 'bg-[#52e7bc] shadow-[0_0_8px_#52e7bc]'}`} />
                  </div>
                  <div className="absolute top-[28px] whitespace-nowrap text-center">
                    <div className={`text-[11px] font-medium ${s.color || 'text-white/80'}`}>{s.t}</div>
                    <div className="text-[10px] text-[#a1a1aa]">{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      
    </div>
  );
};
