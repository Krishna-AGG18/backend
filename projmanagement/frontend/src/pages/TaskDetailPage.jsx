import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, MoreVertical, Edit2, Calendar, Download, MoreHorizontal, CheckSquare, Square, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TaskDetailPage = () => {
  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/dashboard/tasks" className="text-[13px] text-[#a1a1aa] hover:text-white transition-colors flex items-center gap-1 w-fit">
          <ChevronLeft size={16} />
          Back to Tasks
        </Link>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-[28px] font-bold text-white font-['Space_Grotesk'] tracking-tight">Design homepage hero section</h1>
        <div className="flex items-center gap-2">
          <button className="h-9 px-4 bg-[#12101b] border border-white/5 rounded-lg text-[13px] text-white hover:bg-white/5 transition-colors">
            Edit Task
          </button>
          <button className="h-9 w-9 flex items-center justify-center bg-[#12101b] border border-white/5 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-white/5 transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Details, Desc, Attachments, Activity */}
        <div className="flex-1 space-y-8">
          
          {/* Metadata Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-6 border-b border-white/5">
            <div>
              <div className="text-[11px] text-[#a1a1aa] mb-2 font-medium">Assignee</div>
              <div className="flex items-center gap-2">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" alt="Emma" className="w-5 h-5 rounded-full bg-white/10" />
                <span className="text-[13px] text-white font-medium">Emma Johnson</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#a1a1aa] mb-2 font-medium">Status</div>
              <div className="flex items-center gap-2 bg-orange-400/10 w-fit px-2.5 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <span className="text-[12px] text-orange-400 font-medium">In Progress</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#a1a1aa] mb-2 font-medium">Priority</div>
              <div className="flex items-center gap-2 bg-red-400/10 w-fit px-2.5 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="text-[12px] text-red-400 font-medium">High</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#a1a1aa] mb-2 font-medium">Due Date</div>
              <div className="flex items-center gap-2 text-[13px] text-white font-medium">
                <Calendar size={14} className="text-[#a1a1aa]" />
                May 18, 2025
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-[14px] text-white/80 leading-relaxed">
            Design a compelling hero section for the homepage that clearly communicates our value proposition and encourages user engagement. Use the new brand guidelines and ensure it's fully responsive.
          </div>

          {/* Attachments */}
          <div className="space-y-4">
            <h3 className="text-[14px] font-semibold text-white flex items-center gap-2">
              Attachments <span className="text-[#a1a1aa] font-normal text-[12px]">(3)</span>
            </h3>
            <div className="space-y-2">
              {[
                { name: 'hero-reference.png', size: '2.3 MB', icon: '🖼️' },
                { name: 'brand-guidelines.pdf', size: '1.8 MB', icon: '📄' },
                { name: 'copy-brief.docx', size: '320 KB', icon: '📝' },
              ].map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[#12101b] border border-white/5 rounded-lg hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-3">
                    <span>{file.icon}</span>
                    <span className="text-[13px] text-white">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-[#a1a1aa]">{file.size}</span>
                    <button className="text-[#a1a1aa] opacity-0 group-hover:opacity-100 hover:text-white transition-all"><Download size={14} /></button>
                    <button className="text-[#a1a1aa] opacity-0 group-hover:opacity-100 hover:text-white transition-all"><MoreHorizontal size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="space-y-4 pt-4">
            <h3 className="text-[14px] font-semibold text-white">Activity</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/5 before:to-transparent">
              
              {[
                { name: 'Emma Johnson', avatar: 'Emma', action: 'updated the status to', target: 'In Progress', time: 'May 15, 2025 at 10:30 AM' },
                { name: 'Liam Carter', avatar: 'Liam', action: 'added attachment', target: 'hero-reference.png', time: 'May 14, 2025 at 4:45 PM' },
                { name: 'Olivia Rhye', avatar: 'Olivia', action: 'created this task', target: '', time: 'May 13, 2025 at 11:20 AM' },
              ].map((log, idx) => (
                <div key={idx} className="relative flex items-center gap-4">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${log.avatar}`} alt={log.name} className="w-7 h-7 rounded-full bg-white/10 relative z-10 border border-[#050608]" />
                  <div className="flex-1 flex justify-between items-center text-[13px]">
                    <div>
                      <span className="text-white font-medium">{log.name}</span>
                      <span className="text-[#a1a1aa] mx-1">{log.action}</span>
                      {log.target && <span className="text-white">{log.target}</span>}
                    </div>
                    <div className="text-[11px] text-[#a1a1aa]">{log.time}</div>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>

        {/* Right Column: Subtasks & Comment Input */}
        <div className="w-full lg:w-[320px] space-y-8">
          
          {/* Subtasks */}
          <div className="bg-[#12101b] border border-white/5 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[14px] font-semibold text-white">Subtasks</h3>
              <span className="text-[12px] text-[#a1a1aa]">3 / 5</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-white/5 rounded-full mb-5 overflow-hidden">
              <div className="h-full bg-[#8b55ff] w-[60%] rounded-full shadow-[0_0_10px_rgba(139,85,255,0.4)]" />
            </div>

            <div className="space-y-3">
              {[
                { title: 'Research & inspiration', done: true },
                { title: 'Create wireframes', done: true },
                { title: 'Design initial concepts', done: true },
                { title: 'Feedback from team', done: false },
                { title: 'Final design delivery', done: false },
              ].map((task, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <button className={cn("mt-0.5", task.done ? "text-[#8b55ff]" : "text-[#a1a1aa]")}>
                    {task.done ? <CheckSquare size={16} /> : <Square size={16} />}
                  </button>
                  <span className={cn("text-[13px]", task.done ? "text-[#a1a1aa] line-through" : "text-white/90")}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Comment Input */}
          <div className="bg-[#12101b] border border-white/5 rounded-xl p-4 flex items-center gap-3 mt-auto sticky bottom-4">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Krishna" alt="You" className="w-8 h-8 rounded-full bg-white/10" />
            <input 
              type="text" 
              placeholder="Write a comment..." 
              className="flex-1 bg-transparent text-[13px] text-white placeholder:text-[#a1a1aa] focus:outline-none"
            />
            <button className="p-2 text-[#8b55ff] hover:bg-white/5 rounded-lg transition-colors">
              <Send size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
