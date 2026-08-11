import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskAPI } from '@/api/tasks.api';
import { useParams } from 'react-router-dom';

export const CreateTaskModal = ({ isOpen, onClose, initialStatus = 'todo' }) => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priority: 'low',
    status: initialStatus
  });

  const [error, setError] = useState(null);

  const createTaskMutation = useMutation({
    mutationFn: (data) => TaskAPI.createTask(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', projectId]);
      setFormData({ name: '', description: '', priority: 'low', status: initialStatus });
      onClose();
    },
    onError: (err) => {
      setError(err.response?.data?.message || err.message || 'Failed to create task');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.name.trim()) return setError('Task name is required');
    createTaskMutation.mutate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#12101b] border border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-semibold text-white font-['Space_Grotesk']">Create New Task</h2>
          <button 
            onClick={onClose}
            className="text-[#a1a1aa] hover:text-white transition-colors p-1 rounded-md hover:bg-white/5"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-[#a1a1aa] mb-1.5">
              Task Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#050608] border border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-white placeholder-[#a1a1aa]/50 focus:outline-none focus:border-[#8b55ff] transition-colors"
              placeholder="e.g., Design landing page..."
              autoFocus
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#a1a1aa] mb-1.5">
              Description <span className="text-[#a1a1aa]/50">(Optional)</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#050608] border border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-white placeholder-[#a1a1aa]/50 focus:outline-none focus:border-[#8b55ff] transition-colors min-h-[100px] resize-y"
              placeholder="Add more details about this task..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-[#a1a1aa] mb-1.5">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full bg-[#050608] border border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-[#8b55ff] transition-colors appearance-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#a1a1aa] mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#050608] border border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-[#8b55ff] transition-colors appearance-none"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="in_review">Review</option>
                <option value="done">Completed</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-[13px] font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createTaskMutation.isPending}
              className="px-5 py-2 rounded-xl text-[13px] font-medium text-white bg-gradient-to-r from-[#8b55ff] to-[#4182ff] hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
            >
              {createTaskMutation.isPending && <Loader2 size={14} className="animate-spin" />}
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
