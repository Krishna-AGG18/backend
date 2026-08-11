import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Settings, CheckCircle2, ChevronRight, AlertTriangle, Loader2 } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectAPI } from '@/api/projects.api';

export const ProjectSettingsPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { project } = useOutletContext();
  const [activeTab, setActiveTab] = useState('General');

  const [formData, setFormData] = useState({
    name: '',
    key: '',
    description: ''
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        key: project.key || '',
        description: project.description || ''
      });
    }
  }, [project]);

  const updateProjectMutation = useMutation({
    mutationFn: (data) => ProjectAPI.updateProject(project._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      queryClient.invalidateQueries(['project', project._id]);
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: () => ProjectAPI.deleteProject(project._id),
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      navigate('/dashboard/projects');
    }
  });

  const handleUpdateProject = (e) => {
    e.preventDefault();
    updateProjectMutation.mutate(formData);
  };

  const handleDeleteProject = () => {
    if (window.confirm("Are you absolutely sure you want to delete this project? This action cannot be undone.")) {
      deleteProjectMutation.mutate();
    }
  };

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
            {activeTab === 'General' && (
              <section className="space-y-6">
                <h2 className="text-[16px] font-semibold text-white border-b border-white/5 pb-2">Project Details</h2>
                
                <form onSubmit={handleUpdateProject} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Project Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
                    />
                  </div>
                
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Key</label>
                    <input 
                      type="text" 
                      value={formData.key}
                      onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                      className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors uppercase"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Description</label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white resize-none h-[100px] focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={updateProjectMutation.isPending}
                    className="bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[13px] font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {updateProjectMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : null}
                    Save Changes
                  </button>
                </form>
              </section>
            )}

            {/* Statuses Section */}
            {activeTab === 'Statuses' && (
              <section className="space-y-6 relative">
                <div className="absolute inset-0 bg-[#12101b]/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl border border-white/5">
                  <div className="text-center px-4 py-3 bg-[#0a0812] border border-[#8b55ff]/20 rounded-lg shadow-lg">
                    <p className="text-[14px] font-medium text-white mb-1">Coming Soon</p>
                    <p className="text-[12px] text-[#a1a1aa]">Custom statuses are under development.</p>
                  </div>
                </div>
                <h2 className="text-[16px] font-semibold text-white border-b border-white/5 pb-2">Statuses</h2>
                
                <div className="flex flex-wrap gap-3">
                  {['Todo', 'In Progress', 'In Review', 'Done'].map((status) => (
                    <div key={status} className="bg-[#0a0812] border border-white/10 px-3 py-1.5 rounded-full text-[12px] text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      {status}
                    </div>
                  ))}
                  <button disabled className="px-3 py-1.5 rounded-full text-[12px] text-[#8b55ff] hover:bg-[#8b55ff]/10 font-medium transition-colors border border-dashed border-[#8b55ff]/30">
                    + Add Status
                  </button>
                </div>
              </section>
            )}

            {/* Priorities Section */}
            {activeTab === 'Priorities' && (
              <section className="space-y-6 relative">
                <div className="absolute inset-0 bg-[#12101b]/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl border border-white/5">
                  <div className="text-center px-4 py-3 bg-[#0a0812] border border-[#8b55ff]/20 rounded-lg shadow-lg">
                    <p className="text-[14px] font-medium text-white mb-1">Coming Soon</p>
                    <p className="text-[12px] text-[#a1a1aa]">Custom priorities are under development.</p>
                  </div>
                </div>
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
                  <button disabled className="px-3 py-1.5 rounded-full text-[12px] text-[#8b55ff] hover:bg-[#8b55ff]/10 font-medium transition-colors border border-dashed border-[#8b55ff]/30">
                    + Add Priority
                  </button>
                </div>
              </section>
            )}

            {/* Roles & Permissions Section */}
            {activeTab === 'Roles' && (
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
                  <button onClick={() => navigate(`/dashboard/projects/${project._id}/members`)} className="text-[#8b55ff] font-medium hover:underline text-[13px]">
                    Manage Roles
                  </button>
                </div>
              </section>
            )}

            {/* Danger Zone Section */}
            {activeTab === 'Danger' && (
              <section className="space-y-6 pt-4 border-t border-red-500/10">
                <div className="flex items-center gap-2 text-red-400 border-b border-white/5 pb-2">
                  <AlertTriangle size={18} />
                  <h2 className="text-[16px] font-semibold">Danger Zone</h2>
                </div>
                
                <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  <div>
                    <h3 className="text-[14px] font-semibold text-white mb-1">Delete Project</h3>
                    <p className="text-[13px] text-[#a1a1aa]">Once you delete a project, there is no going back. Please be certain.</p>
                  </div>
                  <button 
                    onClick={handleDeleteProject}
                    disabled={deleteProjectMutation.isPending}
                    className="shrink-0 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-[13px] font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {deleteProjectMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : null}
                    Delete Project
                  </button>
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
