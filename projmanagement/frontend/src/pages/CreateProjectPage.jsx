import React from 'react';
import { cn } from '@/lib/utils';
import { Calendar, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CreateProjectPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto space-y-8">
      
      {/* Header & Stepper */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shrink-0 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-[28px] font-bold text-white font-['Space_Grotesk'] tracking-tight mb-2">
            Create New Project
          </h1>
          <p className="text-[13px] text-[#a1a1aa]">
            Add a new project to get your team aligned and moving forward.
          </p>
        </div>
        
        {/* Stepper */}
        <div className="flex items-center gap-2">
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#8b55ff] flex items-center justify-center text-[10px] text-white font-bold">1</div>
            <span className="text-[12px] font-medium text-white">Details</span>
          </div>
          <div className="w-8 h-px bg-white/10" />
          {/* Step 2 */}
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-white font-bold">2</div>
            <span className="text-[12px] font-medium text-white">Team</span>
          </div>
          <div className="w-8 h-px bg-white/10" />
          {/* Step 3 */}
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-white font-bold">3</div>
            <span className="text-[12px] font-medium text-white">Review</span>
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-none pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column */}
          <div className="space-y-6">
            
            {/* Project Name */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-white flex items-center gap-1">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                defaultValue="AI Assistant Platform"
                className="w-full bg-[#0a0812] border border-white/5 hover:border-white/10 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors shadow-inner"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-white">Description</label>
              <div className="relative">
                <textarea 
                  rows={4}
                  defaultValue="Build an AI-powered assistant platform that helps teams automate workflows and improve productivity."
                  className="w-full bg-[#0a0812] border border-white/5 hover:border-white/10 rounded-lg p-2.5 text-[13px] text-white resize-none focus:outline-none focus:border-[#8b55ff]/50 transition-colors shadow-inner"
                />
                <div className="absolute bottom-3 right-3 text-[10px] text-[#a1a1aa]">
                  94 / 500
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-white">Status</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#4182ff]" />
                <select className="w-full appearance-none bg-[#0a0812] border border-white/5 hover:border-white/10 rounded-lg pl-8 pr-10 py-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors shadow-inner cursor-pointer">
                  <option>Planning</option>
                  <option>In Progress</option>
                  <option>On Hold</option>
                  <option>Completed</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Priority */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-white">Priority</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-500" />
                <select className="w-full appearance-none bg-[#0a0812] border border-white/5 hover:border-white/10 rounded-lg pl-8 pr-10 py-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors shadow-inner cursor-pointer">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
              </div>
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-white">Due Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="Jun 30, 2024"
                  className="w-full bg-[#0a0812] border border-white/5 hover:border-white/10 rounded-lg pl-3 pr-10 py-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors shadow-inner"
                />
                <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
              </div>
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-white flex items-center justify-between">
                Add Cover Image <span className="text-[#a1a1aa] font-normal">(optional)</span>
              </label>
              <div className="border border-dashed border-white/10 hover:border-white/20 rounded-xl p-8 bg-[#0a0812]/50 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group h-[140px]">
                <div className="text-[12px] text-white font-medium mb-1 group-hover:text-[#8b55ff] transition-colors">
                  Drag and drop or click to upload
                </div>
                <div className="text-[11px] text-[#a1a1aa]">
                  PNG, JPG or WebP (Max. 5MB)
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-white/5 shrink-0">
        <button 
          onClick={() => navigate('/dashboard/projects')}
          className="bg-transparent border border-white/10 hover:bg-white/5 text-white text-[13px] font-medium py-2.5 px-6 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={() => navigate('/dashboard/projects')}
          className="bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[13px] font-medium py-2.5 px-6 rounded-lg transition-colors shadow-[0_0_15px_rgba(139,85,255,0.3)]"
        >
          Create Project
        </button>
      </div>

    </div>
  );
};
