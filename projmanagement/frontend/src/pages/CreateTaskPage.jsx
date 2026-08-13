import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Bold, Italic, Underline, List, Link as LinkIcon, Paperclip, UploadCloud, X, Calendar, ChevronDown, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ProjectAPI } from '@/api/projects.api';
import { TaskAPI } from '@/api/tasks.api';

export const CreateTaskPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectId: '',
    title: '',
    description: '',
    assignedTo: '',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0]
  });
  
  const [attachments, setAttachments] = useState([]);
  const [error, setError] = useState('');

  // Fetch projects
  const { data: projectsData, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => ProjectAPI.getProjects()
  });
  const projects = projectsData?.data?.data || [];

  // Derived state for the selected project
  const selectedProject = projects.find(p => p.project._id === formData.projectId)?.project;

  // Fetch project members if a project is selected
  const { data: membersData, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['project-members', formData.projectId],
    queryFn: () => ProjectAPI.getProjectMembers(formData.projectId),
    enabled: !!formData.projectId
  });
  const members = membersData?.data || [];

  const createTaskMutation = useMutation({
    mutationFn: (data) => TaskAPI.createTask(formData.projectId, data),
    onSuccess: () => {
      navigate('/dashboard/tasks');
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.projectId) {
      setError('Please select a project');
      return;
    }
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    if (formData.description) data.append('description', formData.description);
    if (formData.assignedTo) data.append('assignedTo', formData.assignedTo);
    if (formData.status) data.append('status', formData.status);
    if (formData.priority) data.append('priority', formData.priority);
    if (formData.dueDate) data.append('dueDate', new Date(formData.dueDate).toISOString());

    attachments.forEach(file => {
      data.append('attachments', file);
    });

    createTaskMutation.mutate(data);
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

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
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-[13px]">
              {error}
            </div>
          )}

          {/* Project Selection */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white flex items-center gap-1">
              Project <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select 
                value={formData.projectId}
                onChange={(e) => setFormData({...formData, projectId: e.target.value, assignedTo: '', status: 'todo', priority: 'medium'})}
                className="w-full appearance-none bg-[#12101b] border border-white/5 rounded-lg p-3 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 cursor-pointer"
              >
                <option value="">Select a project</option>
                {projects.map(p => (
                  <option key={p.project._id} value={p.project._id}>{p.project.name}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white flex items-center gap-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. Design homepage hero section" 
              className="w-full bg-[#12101b] border border-white/5 rounded-lg p-3 text-[14px] text-white placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white">Description</label>
            <div className="bg-[#12101b] border border-white/5 rounded-lg overflow-hidden focus-within:border-[#8b55ff]/50 transition-colors">
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Add task description..." 
                className="w-full bg-transparent p-4 text-[14px] text-white placeholder:text-[#a1a1aa] resize-none h-[150px] focus:outline-none"
              ></textarea>
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white">Attachments</label>
            
            <label className="border border-dashed border-white/10 rounded-lg bg-[#12101b] hover:bg-white/5 transition-colors p-8 flex flex-col items-center justify-center gap-2 cursor-pointer mb-4">
              <input type="file" multiple className="hidden" onChange={handleFileChange} />
              <UploadCloud size={24} className="text-[#8b55ff]" />
              <div className="text-[13px] text-white text-center">
                Drag and drop files here or click to upload
              </div>
              <div className="text-[11px] text-[#a1a1aa]">Max file size: 25MB</div>
            </label>

            {/* Attached Files List */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-[#12101b] border border-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] text-white">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] text-[#a1a1aa]">{formatBytes(file.size)}</span>
                      <button type="button" onClick={() => removeAttachment(idx)} className="text-[#a1a1aa] hover:text-white"><X size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Sidebar Settings */}
        <div className="w-full lg:w-[320px] space-y-6">
          
          {/* Assignee */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white">Assignee</label>
            <div className="relative">
              <select 
                disabled={!formData.projectId || isLoadingMembers}
                value={formData.assignedTo}
                onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                className="w-full appearance-none bg-[#12101b] border border-white/5 rounded-lg p-3 pl-9 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 cursor-pointer disabled:opacity-50"
              >
                <option value="">Unassigned</option>
                {members.map(m => (
                  <option key={m.user._id} value={m.user._id}>{m.user.username}</option>
                ))}
              </select>
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white">Status</label>
            <div className="relative">
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                disabled={!formData.projectId}
                className="w-full appearance-none bg-[#12101b] border border-white/5 rounded-lg p-3 pl-9 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 cursor-pointer disabled:opacity-50"
              >
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
                {selectedProject?.taskStatuses?.map(s => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 pointer-events-none" />
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white">Priority</label>
            <div className="relative">
              <select 
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                disabled={!formData.projectId}
                className="w-full appearance-none bg-[#12101b] border border-white/5 rounded-lg p-3 pl-9 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 cursor-pointer disabled:opacity-50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                {selectedProject?.taskPriorities?.map(p => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
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
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                className="w-full appearance-none bg-[#12101b] border border-white/5 rounded-lg p-3 pl-9 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 cursor-pointer [color-scheme:dark]"
              />
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 flex items-center justify-end gap-4 border-t border-white/5">
            <Link to="/dashboard/tasks" className="text-[13px] text-white font-medium hover:text-white/80 transition-colors">
              Cancel
            </Link>
            <button 
              onClick={handleSubmit}
              disabled={createTaskMutation.isPending}
              className="bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[13px] font-medium py-2.5 px-6 rounded-lg transition-colors shadow-[0_0_15px_rgba(139,85,255,0.4)] flex items-center gap-2 disabled:opacity-50"
            >
              {createTaskMutation.isPending && <Loader2 size={14} className="animate-spin" />}
              Create Task
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
