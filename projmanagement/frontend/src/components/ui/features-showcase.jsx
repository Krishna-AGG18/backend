import React from 'react';
import { CheckCircle2, MessageSquare, Bell, Clock, Activity, ChevronDown, Plus, LayoutList, Share2, Circle, Check, Shield, Users, ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const IsometricCube = ({ size = 60, color = "#a678ff", className, style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={cn("absolute will-change-transform", className)} style={style}>
    <path d="M50 2 L98 26 L50 50 L2 26 Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
    <path d="M2 26 L50 50 L50 98 L2 74 Z" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1" />
    <path d="M50 50 L98 26 L98 74 L50 98 Z" fill={color} fillOpacity="0.03" stroke={color} strokeWidth="1" />
  </svg>
);

// Avatars helpers
const getAvatar = (seed) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

const SideText = ({ subtitle, title, description, features, color = "text-[#a678ff]" }) => (
  <div className="w-[340px] shrink-0 max-lg:w-full z-10 text-center lg:text-left">
    <h2 className={cn("text-[11px] font-bold tracking-[0.15em] uppercase mb-[16px]", color)}>{subtitle}</h2>
    <h3 className="text-white text-[28px] md:text-[32px] font-medium leading-[1.2] mb-[24px] font-['Space_Grotesk'] tracking-tight">
      {title.split('. ').map((part, i, arr) => (
        <span key={i}>
          {part}{i < arr.length - 1 ? '.' : ''}<br/>
        </span>
      ))}
    </h3>
    <p className="text-[#a1a1aa] text-[15px] leading-[1.6] mb-[32px]">
      {description}
    </p>
    
    {features && (
      <ul className="space-y-[16px] inline-block text-left">
        {features.map((item) => (
          <li key={item} className="flex items-center gap-[12px] text-[#a1a1aa] text-[14px] font-medium">
            <CheckCircle2 size={16} className="text-[#a1a1aa]" />
            {item}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const Card = ({ children, className }) => (
  <div className={cn("bg-[#0a0812]/50 border border-white/5 rounded-[16px] p-[20px] backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)]", className)}>
    {children}
  </div>
);

export function FeaturesShowcase({ onPlayVideo }) {
  return (
    <div className="w-full relative">
      {/* Background Particles and Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Large Ambient Glows (Optimized: No CSS blur, uses radial-gradient) */}
        <div className="absolute top-[5%] left-[-5%] w-[400px] h-[400px] rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(166,120,255,0.08) 0%, transparent 70%)' }} />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(65,130,255,0.08) 0%, transparent 70%)' }} />
        <div className="absolute top-[60%] left-[-10%] w-[450px] h-[450px] rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(82,231,188,0.08) 0%, transparent 70%)' }} />
        <div className="absolute top-[85%] right-[-5%] w-[350px] h-[350px] rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(166,120,255,0.08) 0%, transparent 70%)' }} />

        {/* Floating Orbs (Optimized: Removed box-shadow & blur, added will-change) */}
        <div className="absolute top-[2%] left-[15%] w-[20px] h-[20px] rounded-full will-change-transform" style={{ backgroundImage: 'radial-gradient(circle, #a678ff 0%, transparent 80%)', animation: 'float 7s ease-in-out infinite' }} />
        <div className="absolute top-[12%] right-[25%] w-[18px] h-[18px] rounded-full will-change-transform" style={{ backgroundImage: 'radial-gradient(circle, #4182ff 0%, transparent 80%)', animation: 'float 6s ease-in-out infinite 1s' }} />
        <div className="absolute top-[28%] left-[8%] w-[14px] h-[14px] rounded-full will-change-transform" style={{ backgroundImage: 'radial-gradient(circle, #52e7bc 0%, transparent 80%)', animation: 'float 8s ease-in-out infinite 3s' }} />
        <div className="absolute top-[40%] right-[12%] w-[22px] h-[22px] rounded-full will-change-transform" style={{ backgroundImage: 'radial-gradient(circle, #a678ff 0%, transparent 80%)', animation: 'float 9s ease-in-out infinite 2s' }} />
        <div className="absolute top-[55%] left-[30%] w-[16px] h-[16px] rounded-full will-change-transform" style={{ backgroundImage: 'radial-gradient(circle, #4182ff 0%, transparent 80%)', animation: 'float 7s ease-in-out infinite 1.5s' }} />
        <div className="absolute top-[75%] right-[20%] w-[18px] h-[18px] rounded-full will-change-transform" style={{ backgroundImage: 'radial-gradient(circle, #52e7bc 0%, transparent 80%)', animation: 'float 6s ease-in-out infinite 0.5s' }} />
        <div className="absolute top-[90%] left-[25%] w-[14px] h-[14px] rounded-full will-change-transform" style={{ backgroundImage: 'radial-gradient(circle, #a678ff 0%, transparent 80%)', animation: 'float 8s ease-in-out infinite 2.5s' }} />

        {/* Tiny Stars (Optimized: Simple flat opacity dots) */}
        <div className="absolute top-[5%] right-[40%] w-[4px] h-[4px] bg-white/70 rounded-full will-change-transform" style={{ animation: 'float 5s ease-in-out infinite 1.5s' }} />
        <div className="absolute top-[18%] left-[45%] w-[5px] h-[5px] bg-[#a678ff]/70 rounded-full will-change-transform" style={{ animation: 'float 6s ease-in-out infinite 0.5s' }} />
        <div className="absolute top-[35%] right-[65%] w-[6px] h-[6px] bg-[#41d1ff]/70 rounded-full will-change-transform" style={{ animation: 'float 7s ease-in-out infinite 2.5s' }} />
        <div className="absolute top-[50%] left-[60%] w-[3px] h-[3px] bg-[#52e7bc]/70 rounded-full will-change-transform" style={{ animation: 'float 8s ease-in-out infinite 0.2s' }} />
        <div className="absolute top-[68%] right-[35%] w-[5px] h-[5px] bg-white/70 rounded-full will-change-transform" style={{ animation: 'float 9s ease-in-out infinite 1.5s' }} />
        <div className="absolute top-[82%] left-[40%] w-[4px] h-[4px] bg-[#a678ff]/70 rounded-full will-change-transform" style={{ animation: 'float 6s ease-in-out infinite 3.5s' }} />
        <div className="absolute top-[95%] right-[55%] w-[5px] h-[5px] bg-[#52e7bc]/70 rounded-full will-change-transform" style={{ animation: 'float 7s ease-in-out infinite 1.2s' }} />
      </div>

      <div className="w-[min(1400px,calc(100%-64px))] mx-auto flex flex-col gap-[48px] lg:gap-[80px] mt-[48px] lg:mt-[80px] relative z-10">
      
      {/* 1. TASK MANAGEMENT */}
      <div className="flex justify-between items-center gap-[32px] lg:gap-[64px] max-lg:flex-col">
        <SideText 
          subtitle="YOUR MANAGEMENT"
          title="Turn goals into. clear next steps."
          description="Organize work your way with flexible boards, priorities, and statuses."
          features={["Drag & drop simplicity", "Custom statuses", "Subtasks & checklists", "Due dates & priorities"]}
          color="text-[#a678ff]"
        />
        <div className="flex-1 w-full grid grid-cols-3 gap-[16px] max-md:grid-cols-1">
          {/* Column 1: Todo */}
          <Card className="flex flex-col gap-[16px]">
             <h4 className="text-white text-[14px] font-semibold mb-[8px]">Todo</h4>
             <div className="bg-[#12101b] border border-white/5 rounded-[12px] p-[16px] flex flex-col gap-[16px]">
               <p className="text-white/90 text-[13px] font-medium">Write Product Brief</p>
               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /><span className="text-[#a1a1aa] text-[11px]">High</span></div>
                 <img src={getAvatar('aa')} className="w-6 h-6 rounded-full bg-white/10" alt="avatar"/>
               </div>
             </div>
             <div className="bg-[#12101b] border border-white/5 rounded-[12px] p-[16px] flex flex-col gap-[16px]">
               <p className="text-white/90 text-[13px] font-medium">Create Sitemap</p>
               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /><span className="text-[#a1a1aa] text-[11px]">Medium</span></div>
                 <img src={getAvatar('bb')} className="w-6 h-6 rounded-full bg-white/10" alt="avatar"/>
               </div>
             </div>
             <div className="bg-[#12101b] border border-white/5 rounded-[12px] p-[16px] flex flex-col gap-[16px]">
               <p className="text-white/90 text-[13px] font-medium">Prepare Style Tiles</p>
               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500" /><span className="text-[#a1a1aa] text-[11px]">Low</span></div>
                 <img src={getAvatar('cc')} className="w-6 h-6 rounded-full bg-white/10" alt="avatar"/>
               </div>
             </div>
             <div className="text-[#a1a1aa] text-[13px] flex items-center gap-2 mt-auto pt-2 cursor-pointer hover:text-white"><Plus size={14} /> Add task</div>
          </Card>
          
          {/* Column 2: In Progress */}
          <Card className="flex flex-col gap-[16px] bg-[#121629]/30 border-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.05)]">
             <h4 className="text-[#4182ff] text-[14px] font-semibold mb-[8px]">In Progress</h4>
             <div className="bg-[#171b30] border border-blue-500/20 rounded-[12px] p-[16px] flex flex-col gap-[16px]">
               <p className="text-white/90 text-[13px] font-medium">Landing Page Design</p>
               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /><span className="text-[#a1a1aa] text-[11px]">High</span></div>
                 <img src={getAvatar('dd')} className="w-6 h-6 rounded-full bg-white/10" alt="avatar"/>
               </div>
             </div>
             <div className="bg-[#12101b] border border-white/5 rounded-[12px] p-[16px] flex flex-col gap-[16px]">
               <p className="text-white/90 text-[13px] font-medium">Build Component Library</p>
               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /><span className="text-[#a1a1aa] text-[11px]">Medium</span></div>
                 <img src={getAvatar('ee')} className="w-6 h-6 rounded-full bg-white/10" alt="avatar"/>
               </div>
             </div>
             <div className="bg-[#12101b] border border-white/5 rounded-[12px] p-[16px] flex flex-col gap-[16px]">
               <p className="text-white/90 text-[13px] font-medium">Setup Analytics</p>
               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /><span className="text-[#a1a1aa] text-[11px]">Low</span></div>
                 <img src={getAvatar('ff')} className="w-6 h-6 rounded-full bg-white/10" alt="avatar"/>
               </div>
             </div>
             <div className="text-[#a1a1aa] text-[13px] flex items-center gap-2 mt-auto pt-2 cursor-pointer hover:text-white"><Plus size={14} /> Add task</div>
          </Card>

          {/* Column 3: Done */}
          <Card className="flex flex-col gap-[16px]">
             <h4 className="text-[#52e7bc] text-[14px] font-semibold mb-[8px]">Done</h4>
             <div className="bg-[#0e0c15] border border-white/5 rounded-[12px] p-[16px] flex flex-col gap-[16px] opacity-60">
               <p className="text-white/70 text-[13px] font-medium line-through">Brand Guidelines</p>
               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#52e7bc]" /><span className="text-[#52e7bc] text-[11px]">Done</span></div>
                 <img src={getAvatar('gg')} className="w-6 h-6 rounded-full bg-white/10" alt="avatar"/>
               </div>
             </div>
             <div className="bg-[#0e0c15] border border-white/5 rounded-[12px] p-[16px] flex flex-col gap-[16px] opacity-60">
               <p className="text-white/70 text-[13px] font-medium line-through">Logo Design</p>
               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#52e7bc]" /><span className="text-[#52e7bc] text-[11px]">Done</span></div>
                 <img src={getAvatar('hh')} className="w-6 h-6 rounded-full bg-white/10" alt="avatar"/>
               </div>
             </div>
             <div className="bg-[#0e0c15] border border-white/5 rounded-[12px] p-[16px] flex flex-col gap-[16px] opacity-60">
               <p className="text-white/70 text-[13px] font-medium line-through">User Flow</p>
               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#52e7bc]" /><span className="text-[#52e7bc] text-[11px]">Done</span></div>
                 <img src={getAvatar('ii')} className="w-6 h-6 rounded-full bg-white/10" alt="avatar"/>
               </div>
             </div>
             <div className="text-[#a1a1aa] text-[13px] flex items-center gap-2 mt-auto pt-2 cursor-pointer hover:text-white"><Plus size={14} /> Add task</div>
          </Card>
        </div>
      </div>

      {/* 2. TEAM COLLABORATION */}
      <div className="flex justify-between items-center gap-[32px] lg:gap-[64px] max-lg:flex-col">
        <SideText 
          subtitle="TEAM COLLABORATION"
          title="Work together.. Stay aligned."
          description="Empower your team with clarity, permissions, and real-time updates."
          color="text-[#5c82ff]"
        />
        <div className="flex-1 w-full grid grid-cols-3 gap-[16px] max-md:grid-cols-1">
          {/* Team Members */}
          <Card className="flex flex-col">
            <h4 className="text-white text-[15px] font-semibold mb-[24px]">Team Members</h4>
            <div className="flex flex-col gap-[20px]">
              {[
                { name: 'Ava Moore', role: 'Product Designer', badge: 'Owner', color: 'bg-indigo-500/20 text-indigo-300' },
                { name: 'Liam Chen', role: 'Frontend Developer', badge: 'Editor', color: 'bg-green-500/20 text-green-300' },
                { name: 'Maya Patel', role: 'QA Engineer', badge: 'Reviewer', color: 'bg-red-500/20 text-red-300' },
                { name: 'Noah Kim', role: 'Content Strategist', badge: 'Commenter', color: 'bg-emerald-500/20 text-emerald-300' }
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={getAvatar(m.name)} className="w-[32px] h-[32px] rounded-full border border-white/10" alt="avatar"/>
                    <div>
                      <div className="text-white text-[13px] font-medium">{m.name}</div>
                      <div className="text-[#a1a1aa] text-[11px]">{m.role}</div>
                    </div>
                  </div>
                  <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold", m.color)}>{m.badge}</div>
                </div>
              ))}
            </div>
            <div className="text-[#a1a1aa] text-[13px] flex items-center gap-2 mt-[24px] pt-[16px] border-t border-white/5 cursor-pointer hover:text-white"><Plus size={14} /> Invite Member</div>
          </Card>
          
          {/* Activity */}
          <Card className="flex flex-col">
            <h4 className="text-white text-[15px] font-semibold mb-[24px]">Activity</h4>
            <div className="flex flex-col gap-[20px] relative">
              <div className="absolute left-[14px] top-[14px] bottom-0 w-[1px] bg-white/5" />
              {[
                { text: <span><b>Ava</b> updated <b>Homepage Design</b></span>, time: '2m ago', icon: <Share2 size={12}/>, color: 'bg-purple-500 text-white' },
                { text: <span><b>Liam</b> moved <b>API Development</b> to <b>In Progress</b></span>, time: '10m ago', icon: <LayoutList size={12}/>, color: 'bg-blue-500 text-white' },
                { text: <span><b>Maya</b> completed <b>QA Testing</b></span>, time: '1h ago', icon: <Check size={12}/>, color: 'bg-[#52e7bc] text-black' },
                { text: <span><b>Noah</b> commented on <b>Content Review</b></span>, time: '2h ago', icon: <MessageSquare size={12}/>, color: 'bg-emerald-500 text-white' }
              ].map((a, i) => (
                <div key={i} className="flex gap-4 relative z-10">
                  <div className={cn("w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 border border-[#0a0812]", a.color)}>
                    {a.icon}
                  </div>
                  <div>
                    <p className="text-[#a1a1aa] text-[12px] leading-tight mb-1">{a.text}</p>
                    <span className="text-[#a1a1aa] text-[10px]">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[#a1a1aa] text-[13px] text-center mt-[24px] pt-[16px] border-t border-white/5 cursor-pointer hover:text-white">View all activity</div>
          </Card>

          {/* Notifications */}
          <Card className="flex flex-col">
            <h4 className="text-white text-[15px] font-semibold mb-[24px]">Notifications</h4>
            <div className="flex flex-col gap-[20px]">
              {[
                { title: 'You were assigned to Integrations', time: '5m ago', icon: <Bell size={12}/>, bg: 'bg-blue-500/20 text-blue-400' },
                { title: 'Deadline approaching for User Testing', time: '1h ago', icon: <Clock size={12}/>, bg: 'bg-red-500/20 text-red-400' },
                { title: 'Ava mentioned you in a comment', time: '3h ago', icon: <MessageSquare size={12}/>, bg: 'bg-yellow-500/20 text-yellow-400' }
              ].map((n, i) => (
                <div key={i} className="flex gap-4">
                  <div className={cn("w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0", n.bg)}>
                    {n.icon}
                  </div>
                  <div>
                    <p className="text-white/90 text-[13px] leading-tight mb-1">{n.title}</p>
                    <span className="text-[#a1a1aa] text-[11px]">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[#a1a1aa] text-[13px] text-center mt-auto pt-[16px] border-t border-white/5 cursor-pointer hover:text-white">View all notifications</div>
          </Card>
        </div>
      </div>

      {/* 3. PROGRESS & VISIBILITY */}
      <div className="flex justify-between items-start gap-[32px] lg:gap-[64px] max-lg:flex-col">
        <SideText 
          subtitle="PROGRESS & VISIBILITY"
          title="See the big picture.. Act with confidence."
          description="Real-time dashboards help you track progress and make informed decisions."
          color="text-[#5c82ff]"
        />
        <div className="flex-1 w-full flex flex-col gap-[16px]">
           <div className="grid grid-cols-3 gap-[16px] max-md:grid-cols-1">
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
             <Card className="col-span-1 max-md:col-span-1">
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
                        <circle cx="80" cy="10" r="3" fill="#0a0812" stroke="#52e7bc" strokeWidth="2" title="72% - May 20" className="cursor-pointer" />
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
                <div className="text-[#a1a1aa] text-[13px] flex items-center gap-2 mt-auto pt-[16px] border-t border-white/5 cursor-pointer hover:text-white"><Plus size={14} /> View all tasks</div>
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
      
      {/* 4. ROLE-BASED ACCESS */}
      <div className="flex justify-between items-start gap-[32px] lg:gap-[64px] max-lg:flex-col">
        <SideText 
          subtitle="ROLE-BASED ACCESS"
          title="Right access.. Right control."
          description="Secure your workspace with role-based permissions and granular controls."
          color="text-[#a678ff]"
        />
        <div className="flex-1 w-full grid grid-cols-3 gap-[16px] max-md:grid-cols-1">
          {/* Admin */}
          <Card className="flex flex-col gap-[16px] h-full justify-start">
             <div className="flex items-center gap-[12px] mb-[8px]">
                <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center bg-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <Shield size={16} />
                </div>
                <h4 className="text-white text-[15px] font-semibold">Admin</h4>
             </div>
             <ul className="space-y-[12px]">
               {['Full workspace access', 'Manage projects & teams', 'Manage roles & permissions', 'Workspace settings'].map((i) => (
                 <li key={i} className="flex items-center gap-[12px] text-[#a1a1aa] text-[13px] font-medium"><Check size={14} className="text-purple-400" /> {i}</li>
               ))}
             </ul>
          </Card>
          
          {/* Project Admin */}
          <Card className="flex flex-col gap-[16px] h-full justify-start">
             <div className="flex items-center gap-[12px] mb-[8px]">
                <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <Shield size={16} />
                </div>
                <h4 className="text-white text-[15px] font-semibold">Project Admin</h4>
             </div>
             <ul className="space-y-[12px]">
               {['Manage project settings', 'Invite & manage members', 'Create & edit workflows', 'View all project data'].map((i) => (
                 <li key={i} className="flex items-center gap-[12px] text-[#a1a1aa] text-[13px] font-medium"><Check size={14} className="text-blue-400" /> {i}</li>
               ))}
             </ul>
          </Card>

          {/* Member */}
          <Card className="flex flex-col gap-[16px] h-full justify-start">
             <div className="flex items-center gap-[12px] mb-[8px]">
                <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center bg-green-500/20 text-[#52e7bc] shadow-[0_0_15px_rgba(82,231,188,0.3)]">
                  <Users size={16} />
                </div>
                <h4 className="text-white text-[15px] font-semibold">Member</h4>
             </div>
             <ul className="space-y-[12px]">
               {['View & edit assigned tasks', 'Comment & collaborate', 'View project updates', 'Limited project settings'].map((i) => (
                 <li key={i} className="flex items-center gap-[12px] text-[#a1a1aa] text-[13px] font-medium"><Check size={14} className="text-[#52e7bc]" /> {i}</li>
               ))}
             </ul>
          </Card>
        </div>
      </div>

      {/* 5. CTA SECTION */}
      <div className="w-full relative overflow-hidden mt-[80px] pb-[80px] flex flex-col items-center text-center">
         {/* Background Grid */}
         <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:60px_60px] [transform:perspective(500px)_rotateX(60deg)_translateY(-100px)_scale(2.5)]" />
         
         <div className="relative z-10">
           <h2 className="text-white text-[clamp(32px,4vw,42px)] font-bold font-['Space_Grotesk'] tracking-tight mb-[16px]">Ready to build better together?</h2>
           <p className="text-[#a1a1aa] text-[16px] mb-[40px]">Create your workspace in seconds and start shipping.</p>
           
           <div className="flex items-center justify-center gap-[16px] max-sm:flex-col">
             <a href="/login" className="bg-[linear-gradient(135deg,#8b55ff,#5b28d9)] text-white px-[28px] py-[14px] rounded-[12px] font-semibold flex items-center justify-center gap-[8px] hover:-translate-y-[2px] transition-transform shadow-[0_10px_25px_rgba(95,40,214,.3)] max-sm:w-full">
               Create your workspace <ArrowRight size={16}/>
             </a>
             <button onClick={onPlayVideo} className="bg-transparent border border-white/20 text-white/80 px-[28px] py-[14px] rounded-[12px] font-semibold flex items-center justify-center gap-[8px] hover:bg-white/5 transition-colors max-sm:w-full">
               See how it works <Play size={14} fill="currentColor"/>
             </button>
           </div>
         </div>
         
         {/* Decorative Floating Isometric Cubes */}
         <IsometricCube size={90} color="#a678ff" className="left-[8%] top-[25%] max-md:hidden" style={{ animation: 'float 6s ease-in-out infinite' }} />
         <IsometricCube size={60} color="#a678ff" className="left-[18%] top-[55%] max-md:hidden" style={{ animation: 'float 5s ease-in-out infinite 1s' }} />
         <IsometricCube size={30} color="#a678ff" className="left-[12%] bottom-[15%] max-md:hidden" style={{ animation: 'float 7s ease-in-out infinite 0.5s' }} />
         <IsometricCube size={15} color="#5c82ff" className="left-[25%] top-[15%] max-md:hidden" style={{ animation: 'float 8s ease-in-out infinite 2s' }} />
         
         <IsometricCube size={80} color="#5c82ff" className="right-[10%] bottom-[20%] max-md:hidden" style={{ animation: 'float 7s ease-in-out infinite 1.5s' }} />
         <IsometricCube size={50} color="#5c82ff" className="right-[22%] top-[30%] max-md:hidden" style={{ animation: 'float 6s ease-in-out infinite 0.8s' }} />
         <IsometricCube size={20} color="#a678ff" className="right-[5%] top-[40%] max-md:hidden" style={{ animation: 'float 5s ease-in-out infinite 2.5s' }} />
      </div>

      </div>
    </div>
  );
}
