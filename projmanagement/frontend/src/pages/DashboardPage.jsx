import React from 'react';
import { cn } from '@/lib/utils';
import { 
  ChevronDown, ArrowUp, ArrowDown, Layout, CheckSquare, Clock, AlertOctagon, 
  Search, Bell, MoreHorizontal, FileText, CheckCircle2, MessageSquare,
  Users, Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Card = ({ children, className }) => (
  <div className={cn("bg-[#12101b] border border-white/5 rounded-xl p-5", className)}>
    {children}
  </div>
);

export const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-start shrink-0">
        <div>
          <h1 className="text-[28px] font-bold text-white font-['Space_Grotesk'] tracking-tight mb-1">
            Welcome back, Olivia! 👋
          </h1>
          <p className="text-[13px] text-[#a1a1aa]">
            Here's what's happening with your work today.
          </p>
        </div>
        <button className="bg-[#12101b] border border-white/5 hover:bg-white/5 text-white text-[13px] font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
          This Week <ChevronDown size={14} className="text-[#a1a1aa]" />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        {/* Metric 1 */}
        <Card className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#8b55ff]/10 flex items-center justify-center text-[#8b55ff]">
              <Layout size={16} />
            </div>
            <span className="text-[12px] font-medium text-[#a1a1aa]">Active Projects</span>
          </div>
          <div className="text-[32px] font-bold text-white leading-none mb-3">12</div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium">
            <ArrowUp size={12} className="text-[#52e7bc]" />
            <span className="text-[#52e7bc]">2</span>
            <span className="text-[#a1a1aa]">from last week</span>
          </div>
        </Card>

        {/* Metric 2 */}
        <Card className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#52e7bc]/10 flex items-center justify-center text-[#52e7bc]">
              <CheckSquare size={16} />
            </div>
            <span className="text-[12px] font-medium text-[#a1a1aa]">Tasks Completed</span>
          </div>
          <div className="text-[32px] font-bold text-white leading-none mb-3">28</div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium">
            <ArrowUp size={12} className="text-[#52e7bc]" />
            <span className="text-[#52e7bc]">14%</span>
            <span className="text-[#a1a1aa]">from last week</span>
          </div>
        </Card>

        {/* Metric 3 */}
        <Card className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#4182ff]/10 flex items-center justify-center text-[#4182ff]">
              <Clock size={16} />
            </div>
            <span className="text-[12px] font-medium text-[#a1a1aa]">In Progress</span>
          </div>
          <div className="text-[32px] font-bold text-white leading-none mb-3">34</div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium">
            <ArrowUp size={12} className="text-[#52e7bc]" />
            <span className="text-[#52e7bc]">5</span>
            <span className="text-[#a1a1aa]">from last week</span>
          </div>
        </Card>

        {/* Metric 4 */}
        <Card className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
              <AlertOctagon size={16} />
            </div>
            <span className="text-[12px] font-medium text-[#a1a1aa]">Blocked</span>
          </div>
          <div className="text-[32px] font-bold text-white leading-none mb-3">5</div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium">
            <ArrowDown size={12} className="text-red-500" />
            <span className="text-red-500">2</span>
            <span className="text-[#a1a1aa]">from last week</span>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 shrink-0">
        
        {/* Project Progress (Line Chart) */}
        <Card className="col-span-1 flex flex-col h-[280px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[14px] font-semibold text-white">Project Progress</h3>
            <div className="flex items-center gap-1 text-[11px] text-[#a1a1aa] cursor-pointer">
              This Week <ChevronDown size={12} />
            </div>
          </div>
          <div className="relative flex-1 w-full flex items-end pt-2">
            {/* Y Axis */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[9px] text-[#a1a1aa]">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            {/* X Axis */}
            <div className="absolute left-10 right-0 bottom-0 flex justify-between text-[9px] text-[#a1a1aa] px-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
            {/* Grid lines */}
            <div className="absolute left-8 right-0 top-2 bottom-6 flex flex-col justify-between pointer-events-none">
              {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-white/5" />)}
            </div>
            {/* SVG Spline */}
            <div className="absolute left-8 right-0 top-2 bottom-6 overflow-visible">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,80 C20,80 30,50 50,60 C70,70 80,30 100,20" fill="none" stroke="#4182ff" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M0,100 L0,80 C20,80 30,50 50,60 C70,70 80,30 100,20 L100,100 Z" fill="url(#lineGrad)" opacity="0.2" />
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4182ff" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                {/* Tooltip dot */}
                <circle cx="80" cy="30" r="3" fill="#0a0812" stroke="#4182ff" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(65,130,255,0.8)]" />
              </svg>
            </div>
            <div className="absolute top-[30%] right-[15%] bg-[#12101b] border border-white/10 px-2 py-1 rounded text-[10px] text-white shadow-lg pointer-events-none">
              <span className="text-[#a1a1aa] mr-1">Friday</span> 68%
            </div>
          </div>
        </Card>

        {/* Task Status (Donut Chart) */}
        <Card className="col-span-1 flex flex-col h-[280px]">
          <h3 className="text-[14px] font-semibold text-white mb-6">Task Status</h3>
          <div className="flex-1 flex items-center justify-between">
            {/* Donut SVG */}
            <div className="relative w-[140px] h-[140px] shrink-0 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" stroke="#1f1d2b" strokeWidth="16" fill="none" />
                
                {/* To Do (11%) */}
                <circle cx="50" cy="50" r="38" stroke="#a1a1aa" strokeWidth="16" fill="none" strokeDasharray="238.76" strokeDashoffset="0" />
                {/* In Progress (47%) */}
                <circle cx="50" cy="50" r="38" stroke="#4182ff" strokeWidth="16" fill="none" strokeDasharray="238.76" strokeDashoffset="26.26" className="drop-shadow-[0_0_8px_rgba(65,130,255,0.4)]" />
                {/* Completed (38%) */}
                <circle cx="50" cy="50" r="38" stroke="#52e7bc" strokeWidth="16" fill="none" strokeDasharray="238.76" strokeDashoffset="138.48" className="drop-shadow-[0_0_8px_rgba(82,231,188,0.4)]" />
                {/* Blocked (2%) */}
                <circle cx="50" cy="50" r="38" stroke="#ef4444" strokeWidth="16" fill="none" strokeDasharray="238.76" strokeDashoffset="229.21" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white text-[28px] font-bold leading-none mb-1">72</span>
                <span className="text-[#a1a1aa] text-[10px]">Total</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-3 justify-center pl-6 min-w-[110px]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#52e7bc]" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-white/90">Completed</span>
                  <span className="text-[10px] text-[#a1a1aa]">28 (38%)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4182ff]" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-white/90">In Progress</span>
                  <span className="text-[10px] text-[#a1a1aa]">34 (47%)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#a1a1aa]" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-white/90">To Do</span>
                  <span className="text-[10px] text-[#a1a1aa]">8 (11%)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-white/90">Blocked</span>
                  <span className="text-[10px] text-[#a1a1aa]">2 (2%)</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Project Orbit */}
        <Card className="col-span-1 flex flex-col h-[280px]">
          <h3 className="text-[14px] font-semibold text-white mb-2">Project Orbit</h3>
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            {/* SVG Orbit */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 120" className="w-full h-[180px] overflow-visible">
                {/* Orbit 1 */}
                <ellipse cx="100" cy="60" rx="80" ry="30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                {/* Orbit 2 */}
                <ellipse cx="100" cy="60" rx="60" ry="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                {/* Orbit 3 */}
                <ellipse cx="100" cy="60" rx="40" ry="15" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                
                {/* Center star/sun */}
                <circle cx="100" cy="60" r="12" fill="url(#sunGrad)" className="drop-shadow-[0_0_15px_rgba(139,85,255,0.6)]" />
                <defs>
                  <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8b55ff" />
                    <stop offset="100%" stopColor="#4c1d95" />
                  </radialGradient>
                
                </defs>

                {/* Planets */}
                <circle cx="20" cy="60" r="4" fill="#a1a1aa" className="drop-shadow-[0_0_8px_rgba(161,161,170,0.8)]" />
                <circle cx="150" cy="45" r="4.5" fill="#4182ff" className="drop-shadow-[0_0_8px_rgba(65,130,255,0.8)]" />
                <circle cx="70" cy="80" r="3.5" fill="#f59e0b" className="drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                <circle cx="130" cy="72" r="5" fill="#52e7bc" className="drop-shadow-[0_0_8px_rgba(82,231,188,0.8)]" />
              </svg>
            </div>
            {/* Labels overlay */}
            <div className="absolute inset-0 flex items-end justify-center pb-2">
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[9px] text-[#a1a1aa]">
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa]" /> Planning</div>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#4182ff]" /> In Progress</div>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" /> Review</div>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" /> On Hold</div>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#52e7bc]" /> Completed</div>
              </div>
            </div>
          </div>
        </Card>

      </div>

      {/* Bottom Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
        
        {/* Assigned Tasks */}
        <Card className="col-span-1 flex flex-col">
          <div className="flex justify-between items-center mb-4 shrink-0">
            <h3 className="text-[14px] font-semibold text-white">Assigned Tasks</h3>
            <button onClick={() => navigate('/dashboard/tasks')} className="text-[11px] text-[#8b55ff] hover:underline font-medium">View all</button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-none space-y-3">
            {[
              { t: 'Design system updates', p: 'Loom Website Redesign', s: 'In Progress', c: 'text-[#4182ff] bg-[#4182ff]/10', icon: Layout },
              { t: 'User research synthesis', p: 'Customer Portal', s: 'To Do', c: 'text-[#a1a1aa] bg-white/10', icon: FileText },
              { t: 'Dashboard analytics', p: 'Internal Tooling', s: 'In Progress', c: 'text-[#4182ff] bg-[#4182ff]/10', icon: Layout }
            ].map((task, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#0a0812] border border-white/5 rounded-lg group hover:border-white/10 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-[#8b55ff]/10 flex items-center justify-center text-[#8b55ff] shrink-0">
                  <task.icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-white truncate">{task.t}</div>
                  <div className="text-[11px] text-[#a1a1aa] truncate">{task.p}</div>
                </div>
                <div className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0", task.c)}>
                  {task.s}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="col-span-1 flex flex-col">
          <div className="flex justify-between items-center mb-4 shrink-0">
            <h3 className="text-[14px] font-semibold text-white">Upcoming Tasks</h3>
            <button onClick={() => navigate('/dashboard/tasks')} className="text-[11px] text-[#8b55ff] hover:underline font-medium">View all</button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-none space-y-3">
            {[
              { t: 'Prototype review', p: 'Loom Website Redesign', d: 'May 24', icon: Layout },
              { t: 'Stakeholder interview', p: 'Customer Portal', d: 'May 25', icon: Users },
              { t: 'Sprint planning', p: 'Internal Tooling', d: 'May 26', icon: Calendar }
            ].map((task, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#0a0812] border border-white/5 rounded-lg group hover:border-white/10 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-[#8b55ff]/10 flex items-center justify-center text-[#8b55ff] shrink-0">
                  <task.icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-white truncate">{task.t}</div>
                  <div className="text-[11px] text-[#a1a1aa] truncate">{task.p}</div>
                </div>
                <div className="text-[11px] text-[#a1a1aa] shrink-0 font-medium">
                  {task.d}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity */}
        <Card className="col-span-1 flex flex-col">
          <div className="flex justify-between items-center mb-4 shrink-0">
            <h3 className="text-[14px] font-semibold text-white">Activity</h3>
            <button onClick={() => navigate('/dashboard/projects/1/activity')} className="text-[11px] text-[#8b55ff] hover:underline font-medium">View all</button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-none space-y-4">
            {[
              { a: 'Ethan', img: 'Ethan', action: 'updated a task', t: 'Design system updates', time: '2m ago' },
              { a: 'Mia', img: 'Mia', action: 'completed a task', t: 'Homepage wireframe', time: '15m ago' },
              { a: 'Noah', img: 'Noah', action: 'commented', t: 'On Dashboard analytics', time: '1h ago' }
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${act.img}`} alt={act.a} className="w-7 h-7 rounded-full bg-white/10 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-white/90 leading-snug">
                    <span className="font-semibold text-white">{act.a}</span> {act.action}
                  </div>
                  <div className="text-[11px] text-[#a1a1aa] truncate">{act.t}</div>
                </div>
                <div className="text-[10px] text-[#a1a1aa] shrink-0 mt-0.5">
                  {act.time}
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>

    </div>
  );
};
