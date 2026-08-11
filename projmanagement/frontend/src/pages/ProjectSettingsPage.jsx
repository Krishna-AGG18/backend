import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Settings, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProjectSettingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('General');

  const navItems = [
    { id: 'General', label: 'General' },
    { id: 'Statuses', label: 'Statuses' },
    { id: 'Priorities', label: 'Priorities' },
    { id: 'Roles', label: 'Roles & Permissions' },
    { id: 'Integrations', label: 'Integrations' },
    { id: 'Danger', label: 'Danger Zone', danger: true },
  ];

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8 shrink-0">
        <h1 className="text-[24px] font-bold text-white font-['Space_Grotesk'] tracking-tight mb-1">Project Settings</h1>
        <p className="text-[13px] text-[#a1a1aa]">Manage your project information and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 flex-1 min-h-0">
        {/* Left Nav */}
        <div className="w-full lg:w-[240px] shrink-0 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-[13px] font-medium transition-colors",
                activeTab === item.id 
                  ? "bg-[#8b55ff]/10 text-[#8b55ff]" 
                  : item.danger 
                    ? "text-red-400 hover:bg-red-400/10" 
                    : "text-[#a1a1aa] hover:text-white hover:bg-white/5"
              )}
            >
              {item.label}
              {activeTab === item.id && <ChevronRight size={14} />}
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-[#12101b] border border-white/5 rounded-xl p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          
          <div className="max-w-2xl space-y-12">
            
            {/* Project Details Section */}
            <section className="space-y-6">
              <h2 className="text-[16px] font-semibold text-white border-b border-white/5 pb-2">Project Details</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-white">Project Name</label>
                  <input 
                    type="text" 
                    defaultValue="Astral Redesign" 
                    className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-white">Key</label>
                  <input 
                    type="text" 
                    defaultValue="ASTRAL" 
                    className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors uppercase"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-white">Description</label>
                  <textarea 
                    defaultValue="Redesign of the Astral SaaS platform including marketing site and dashboard."
                    className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white resize-none h-[100px] focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
                  ></textarea>
                </div>

                <button className="bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[13px] font-medium py-2.5 px-6 rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </section>

            {/* Statuses Section */}
            <section className="space-y-6">
              <h2 className="text-[16px] font-semibold text-white border-b border-white/5 pb-2">Statuses</h2>
              
              <div className="flex flex-wrap gap-3">
                {['Todo', 'In Progress', 'In Review', 'Done'].map((status) => (
                  <div key={status} className="bg-[#0a0812] border border-white/10 px-3 py-1.5 rounded-full text-[12px] text-white flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    {status}
                  </div>
                ))}
                <button className="px-3 py-1.5 rounded-full text-[12px] text-[#8b55ff] hover:bg-[#8b55ff]/10 font-medium transition-colors border border-dashed border-[#8b55ff]/30">
                  + Add Status
                </button>
              </div>
            </section>

            {/* Priorities Section */}
            <section className="space-y-6">
              <h2 className="text-[16px] font-semibold text-white border-b border-white/5 pb-2">Priorities</h2>
              
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Low', color: 'bg-blue-400' },
                  { name: 'Medium', color: 'bg-yellow-400' },
                  { name: 'High', color: 'bg-orange-400' },
                  { name: 'Critical', color: 'bg-red-500' }
                ].map((priority) => (
                  <div key={priority.name} className="bg-[#0a0812] border border-white/10 px-3 py-1.5 rounded-full text-[12px] text-white flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${priority.color}`} />
                    {priority.name}
                  </div>
                ))}
                <button className="px-3 py-1.5 rounded-full text-[12px] text-[#8b55ff] hover:bg-[#8b55ff]/10 font-medium transition-colors border border-dashed border-[#8b55ff]/30">
                  + Add Priority
                </button>
              </div>
            </section>

            {/* Roles & Permissions Preview */}
            <section className="space-y-6">
              <h2 className="text-[16px] font-semibold text-white border-b border-white/5 pb-2">Roles & Permissions</h2>
              
              <div className="space-y-4 text-[13px]">
                <div className="flex">
                  <span className="w-24 text-white font-medium">Admin</span>
                  <span className="text-[#a1a1aa]">Full access to all project settings and data.</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-white font-medium">Editor</span>
                  <span className="text-[#a1a1aa]">Can manage tasks and collaborate.</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-white font-medium">Viewer</span>
                  <span className="text-[#a1a1aa]">Can view project data and activities.</span>
                </div>
                <button onClick={() => navigate('/dashboard/projects/1/members')} className="text-[#8b55ff] font-medium hover:underline text-[13px]">
                  Manage Roles
                </button>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="space-y-6 pt-6 border-t border-red-500/20">
              <h2 className="text-[16px] font-semibold text-red-500 flex items-center gap-2">
                <AlertTriangle size={18} /> Danger Zone
              </h2>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-[14px] font-medium text-white mb-1">Delete Project</h3>
                  <p className="text-[12px] text-[#a1a1aa]">This action cannot be undone. All project data will be lost.</p>
                </div>
                <button className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-[13px] font-medium transition-all">
                  Delete Project
                </button>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};
