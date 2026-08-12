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
    description: '',
    status: 'ACTIVE',
    dueDate: ''
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        status: project.status || 'ACTIVE',
        dueDate: project.dueDate ? new Date(project.dueDate).toISOString().split('T')[0] : ''
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

  const addStatusMutation = useMutation({
    mutationFn: (data) => ProjectAPI.addCustomStatus({ projectId: project._id, statusData: data }),
    onSuccess: () => queryClient.invalidateQueries(['project', project._id])
  });

  const deleteStatusMutation = useMutation({
    mutationFn: (name) => ProjectAPI.deleteCustomStatus({ projectId: project._id, statusName: name }),
    onSuccess: () => queryClient.invalidateQueries(['project', project._id])
  });

  const addPriorityMutation = useMutation({
    mutationFn: (data) => ProjectAPI.addCustomPriority({ projectId: project._id, priorityData: data }),
    onSuccess: () => queryClient.invalidateQueries(['project', project._id])
  });

  const deletePriorityMutation = useMutation({
    mutationFn: (name) => ProjectAPI.deleteCustomPriority({ projectId: project._id, priorityName: name }),
    onSuccess: () => queryClient.invalidateQueries(['project', project._id])
  });

  const [newStatus, setNewStatus] = useState({ name: '', category: 'todo', color: '#8b55ff' });
  const [newPriority, setNewPriority] = useState({ name: '', level: 1, color: '#4182ff' });

  const navItems = [
    { id: 'General', label: 'General' },
    { id: 'Statuses', label: 'Statuses' },
    { id: 'Priorities', label: 'Priorities' },
    { id: 'Roles', label: 'Roles & Permissions' },
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
                    <label className="text-[13px] font-medium text-white">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Due Date</label>
                    <input 
                      type="date" 
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
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
              <section className="space-y-6">
                <h2 className="text-[16px] font-semibold text-white border-b border-white/5 pb-2">Custom Statuses</h2>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {project?.taskStatuses?.map((status) => (
                    <div key={status.name} className="bg-[#0a0812] border border-white/10 pl-3 pr-1 py-1.5 rounded-full text-[12px] text-white flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.color || '#ccc' }} />
                      {status.name}
                      <button 
                        onClick={() => {
                          if(window.confirm(`Delete status ${status.name}?`)) {
                            deleteStatusMutation.mutate(status.name);
                          }
                        }}
                        className="w-5 h-5 ml-1 flex items-center justify-center rounded-full hover:bg-red-500/20 text-[#a1a1aa] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <AlertTriangle size={10} className="hidden" />
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-[#0a0812] border border-white/5 p-4 rounded-xl max-w-sm">
                  <h3 className="text-[13px] font-medium text-white mb-3">Add New Status</h3>
                  <div className="space-y-3">
                    <input 
                      type="text"
                      placeholder="Status Name"
                      value={newStatus.name}
                      onChange={(e) => setNewStatus({...newStatus, name: e.target.value})}
                      className="w-full bg-[#12101b] border border-white/5 rounded-lg p-2 text-[12px] text-white focus:outline-none focus:border-[#8b55ff]/50"
                    />
                    <select 
                      value={newStatus.category}
                      onChange={(e) => setNewStatus({...newStatus, category: e.target.value})}
                      className="w-full bg-[#12101b] border border-white/5 rounded-lg p-2 text-[12px] text-white focus:outline-none focus:border-[#8b55ff]/50"
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                    <div className="flex gap-2">
                      <input 
                        type="color"
                        value={newStatus.color}
                        onChange={(e) => setNewStatus({...newStatus, color: e.target.value})}
                        className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
                      />
                      <button 
                        onClick={() => {
                          if (newStatus.name) {
                            addStatusMutation.mutate(newStatus);
                            setNewStatus({ name: '', category: 'todo', color: '#8b55ff' });
                          }
                        }}
                        disabled={addStatusMutation.isPending || !newStatus.name}
                        className="flex-1 bg-white/5 hover:bg-white/10 text-white text-[12px] font-medium rounded-lg transition-colors"
                      >
                        Add Status
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Priorities Section */}
            {activeTab === 'Priorities' && (
              <section className="space-y-6">
                <h2 className="text-[16px] font-semibold text-white border-b border-white/5 pb-2">Custom Priorities</h2>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {project?.taskPriorities?.map((priority) => (
                    <div key={priority.name} className="bg-[#0a0812] border border-white/10 pl-3 pr-1 py-1.5 rounded-full text-[12px] text-white flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: priority.color || '#ccc' }} />
                      {priority.name} (Lvl {priority.level})
                      <button 
                        onClick={() => {
                          if(window.confirm(`Delete priority ${priority.name}?`)) {
                            deletePriorityMutation.mutate(priority.name);
                          }
                        }}
                        className="w-5 h-5 ml-1 flex items-center justify-center rounded-full hover:bg-red-500/20 text-[#a1a1aa] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-[#0a0812] border border-white/5 p-4 rounded-xl max-w-sm">
                  <h3 className="text-[13px] font-medium text-white mb-3">Add New Priority</h3>
                  <div className="space-y-3">
                    <input 
                      type="text"
                      placeholder="Priority Name"
                      value={newPriority.name}
                      onChange={(e) => setNewPriority({...newPriority, name: e.target.value})}
                      className="w-full bg-[#12101b] border border-white/5 rounded-lg p-2 text-[12px] text-white focus:outline-none focus:border-[#8b55ff]/50"
                    />
                    <input 
                      type="number"
                      placeholder="Level (e.g. 1)"
                      value={newPriority.level}
                      onChange={(e) => setNewPriority({...newPriority, level: parseInt(e.target.value)})}
                      className="w-full bg-[#12101b] border border-white/5 rounded-lg p-2 text-[12px] text-white focus:outline-none focus:border-[#8b55ff]/50"
                    />
                    <div className="flex gap-2">
                      <input 
                        type="color"
                        value={newPriority.color}
                        onChange={(e) => setNewPriority({...newPriority, color: e.target.value})}
                        className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
                      />
                      <button 
                        onClick={() => {
                          if (newPriority.name) {
                            addPriorityMutation.mutate(newPriority);
                            setNewPriority({ name: '', level: 1, color: '#4182ff' });
                          }
                        }}
                        disabled={addPriorityMutation.isPending || !newPriority.name}
                        className="flex-1 bg-white/5 hover:bg-white/10 text-white text-[12px] font-medium rounded-lg transition-colors"
                      >
                        Add Priority
                      </button>
                    </div>
                  </div>
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
