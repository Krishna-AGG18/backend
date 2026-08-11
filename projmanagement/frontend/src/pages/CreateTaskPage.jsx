import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Bold, Italic, Underline, List, Link as LinkIcon, Paperclip, UploadCloud, X, Calendar, ChevronDown, CheckCircle2, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CreateTaskPage = () => {
  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] text-[#a1a1aa] mb-6">
        <Link to="/dashboard/tasks" className="hover:text-white transition-colors">Tasks</Link>
        <ChevronRight size={14} />
        <span className="text-white">Create New Task</span>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[24px] font-semibold text-white">Create New Task</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Form Area */}
        <div className="flex-1 space-y-6">
          
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white flex items-center gap-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              placeholder="e.g. Design homepage hero section" 
              className="w-full bg-[#12101b] border border-white/5 rounded-lg p-3 text-[14px] text-white placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white">Description</label>
            <div className="bg-[#12101b] border border-white/5 rounded-lg overflow-hidden focus-within:border-[#8b55ff]/50 transition-colors">
              {/* Toolbar */}
              <div className="flex items-center gap-1 p-2 border-b border-white/5 bg-[#0a0812]">
                {[Bold, Italic, Underline, List, LinkIcon, Paperclip].map((Icon, idx) => (
                  <button key={idx} className="p-1.5 text-[#a1a1aa] hover:text-white hover:bg-white/5 rounded transition-colors">
                    <Icon size={16} />
                  </button>
                ))}
              </div>
              <textarea 
                placeholder="Add task description..." 
                className="w-full bg-transparent p-4 text-[14px] text-white placeholder:text-[#a1a1aa] resize-none h-[150px] focus:outline-none"
              ></textarea>
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white">Attachments</label>
            
            {/* Drop Zone */}
            <div className="border border-dashed border-white/10 rounded-lg bg-[#12101b] hover:bg-white/5 transition-colors p-8 flex flex-col items-center justify-center gap-2 cursor-pointer mb-4">
              <UploadCloud size={24} className="text-[#8b55ff]" />
              <div className="text-[13px] text-white text-center">
                Drag and drop files here or click to upload
              </div>
              <div className="text-[11px] text-[#a1a1aa]">Max file size: 25MB</div>
            </div>

            {/* Attached Files List */}
            <div className="space-y-2">
              {[
                { name: 'brief.pdf', size: '1.2 MB', icon: '📄', color: 'text-red-400' },
                { name: 'wireframe-home.png', size: '2.4 MB', icon: '🖼️', color: 'text-blue-400' },
                { name: 'homepage-reference.sketch', size: '3.6 MB', icon: '💎', color: 'text-yellow-400' },
              ].map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[#12101b] border border-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span>{file.icon}</span>
                    <span className="text-[13px] text-white">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-[#a1a1aa]">{file.size}</span>
                    <button className="text-[#a1a1aa] hover:text-white"><X size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Settings */}
        <div className="w-full lg:w-[320px] space-y-6">
          
          {/* Assignee */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white">Assignee</label>
            <div className="relative">
              <select className="w-full appearance-none bg-[#12101b] border border-white/5 rounded-lg p-3 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 cursor-pointer">
                <option>Select assignee</option>
                <option>Emma Johnson</option>
                <option>Liam Carter</option>
              </select>
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white">Status</label>
            <div className="relative">
              <select className="w-full appearance-none bg-[#12101b] border border-white/5 rounded-lg p-3 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 cursor-pointer">
                <option>Todo</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 pointer-events-none" />
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white">Priority</label>
            <div className="relative">
              <select className="w-full appearance-none bg-[#12101b] border border-white/5 rounded-lg p-3 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 cursor-pointer">
                <option>Medium</option>
                <option>High</option>
                <option>Low</option>
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-400 pointer-events-none" />
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white">Due Date</label>
            <div className="relative">
              <input 
                type="date" 
                defaultValue="2025-05-24"
                className="w-full appearance-none bg-[#12101b] border border-white/5 rounded-lg p-3 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 cursor-pointer [color-scheme:dark]"
              />
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 flex items-center justify-end gap-4 border-t border-white/5">
            <Link to="/dashboard/tasks" className="text-[13px] text-white font-medium hover:text-white/80 transition-colors">
              Cancel
            </Link>
            <button className="bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[13px] font-medium py-2.5 px-6 rounded-lg transition-colors shadow-[0_0_15px_rgba(139,85,255,0.4)]">
              Create Task
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
