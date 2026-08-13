import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MoreVertical, Calendar, Download, CheckSquare, Square, Send, Loader2, Plus, Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskAPI } from '@/api/tasks.api';
import { ActivityAPI } from '@/api/activity.api';
import { EditTaskModal } from '@/components/projects/EditTaskModal';

export const TaskDetailPage = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  const { data: taskData, isLoading, isError } = useQuery({
    queryKey: ['task', projectId, taskId],
    queryFn: () => TaskAPI.getTaskById(projectId, taskId),
    enabled: !!projectId && !!taskId
  });

  const { data: activityData } = useQuery({
    queryKey: ['project-activities', projectId],
    queryFn: () => ActivityAPI.getProjectActivities(projectId),
    enabled: !!projectId
  });

  const createSubtaskMutation = useMutation({
    mutationFn: (title) => TaskAPI.createSubTask({ projectId, taskId, data: { title } }),
    onSuccess: () => {
      setNewSubtaskTitle('');
      queryClient.invalidateQueries(['task', projectId, taskId]);
    }
  });

  const updateSubtaskMutation = useMutation({
    mutationFn: ({ subTaskId, isCompleted }) => TaskAPI.updateSubTask({ projectId, subTaskId, data: { isCompleted } }),
    onSuccess: () => {
      queryClient.invalidateQueries(['task', projectId, taskId]);
    }
  });

  const deleteSubtaskMutation = useMutation({
    mutationFn: (subTaskId) => TaskAPI.deleteSubTask(projectId, subTaskId),
    onSuccess: () => {
      queryClient.invalidateQueries(['task', projectId, taskId]);
    }
  });

  if (isLoading) {
    return <div className="flex h-full items-center justify-center text-[#a1a1aa]"><Loader2 className="animate-spin mr-2" /> Loading task details...</div>;
  }
  
  if (isError || !taskData?.data) {
    return <div className="flex h-full items-center justify-center text-red-400">Failed to load task details.</div>;
  }

  const task = taskData.data;
  const subtasks = task.subtasks || [];
  const completedSubtasks = subtasks.filter(st => st.isCompleted).length;
  const subtaskProgress = subtasks.length > 0 ? Math.round((completedSubtasks / subtasks.length) * 100) : 0;

  // Filter activities for this specific task
  const activities = activityData?.data?.activities?.filter(act => act.targetId === taskId) || [];

  const handleCreateSubtask = (e) => {
    e.preventDefault();
    if (newSubtaskTitle.trim()) {
      createSubtaskMutation.mutate(newSubtaskTitle);
    }
  };

  const formatBytes = (bytes) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/5 shrink-0">
        <div>
          <Link to={`/dashboard/projects/${projectId}/tasks`} className="text-[12px] text-[#a1a1aa] hover:text-white flex items-center gap-2 mb-3 w-fit transition-colors">
            <ChevronLeft size={14} /> Back to Tasks
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-[24px] font-bold text-white font-['Space_Grotesk'] tracking-tight">
              {task.title}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="h-9 px-4 flex items-center justify-center gap-2 bg-[#8b55ff] hover:bg-[#8b55ff]/90 text-white rounded-lg transition-colors text-[13px] font-medium"
          >
            <Edit2 size={16} /> Edit Task
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mt-8">
        {/* Left Column: Details, Desc, Attachments, Activity */}
        <div className="flex-1 space-y-8">
          
          {/* Metadata Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-6 border-b border-white/5">
            <div>
              <div className="text-[11px] text-[#a1a1aa] mb-2 font-medium">Assignee</div>
              <div className="flex items-center gap-2">
                {task.assignedTo ? (
                  <>
                    <img src={task.assignedTo?.avatar?.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedTo.username}`} alt="Assignee" className="w-5 h-5 rounded-full bg-white/10" />
                    <span className="text-[13px] text-white font-medium">{task.assignedTo.username}</span>
                  </>
                ) : (
                  <span className="text-[13px] text-[#a1a1aa] font-medium">Unassigned</span>
                )}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#a1a1aa] mb-2 font-medium">Status</div>
              <div className="flex items-center gap-2 bg-blue-500/10 w-fit px-2.5 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-[12px] text-blue-400 font-medium capitalize">{task.status?.replace('_', ' ')}</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#a1a1aa] mb-2 font-medium">Priority</div>
              <div className="flex items-center gap-2 bg-orange-400/10 w-fit px-2.5 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <span className="text-[12px] text-orange-400 font-medium capitalize">{task.priority}</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#a1a1aa] mb-2 font-medium">Due Date</div>
              <div className="flex items-center gap-2 text-[13px] text-white font-medium">
                <Calendar size={14} className="text-[#a1a1aa]" />
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date set'}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-[14px] text-white/80 leading-relaxed whitespace-pre-wrap">
            {task.description || <span className="italic text-white/40">No description provided.</span>}
          </div>

          {/* Attachments */}
          {task.attachments && task.attachments.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-[14px] font-semibold text-white flex items-center gap-2">
                Attachments <span className="text-[#a1a1aa] font-normal text-[12px]">({task.attachments.length})</span>
              </h3>
              <div className="space-y-2">
                {task.attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-[#12101b] border border-white/5 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span>📄</span>
                      <span className="text-[13px] text-white">{file.url.split('/').pop()}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] text-[#a1a1aa]">{formatBytes(file.size)}</span>
                      <a href={file.url} target="_blank" rel="noreferrer" className="text-[#a1a1aa] opacity-0 group-hover:opacity-100 hover:text-white transition-all"><Download size={14} /></a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity */}
          <div className="space-y-4 pt-4">
            <h3 className="text-[14px] font-semibold text-white">Activity</h3>
            {activities.length > 0 ? (
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/5 before:to-transparent">
                {activities.map((log) => (
                  <div key={log._id} className="relative flex items-center gap-4">
                    <img src={log.user?.avatar?.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${log.user?.username}`} alt={log.user?.username} className="w-7 h-7 rounded-full bg-white/10 relative z-10 border border-[#050608]" />
                    <div className="flex-1 flex justify-between items-center text-[13px]">
                      <div>
                        <span className="text-white font-medium">{log.user?.username}</span>
                        <span className="text-[#a1a1aa] mx-1">{log.action}</span>
                      </div>
                      <div className="text-[11px] text-[#a1a1aa]">{new Date(log.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[12px] text-[#a1a1aa]">No recent activity for this task.</p>
            )}
          </div>

        </div>

        {/* Right Column: Subtasks */}
        <div className="w-full lg:w-[320px] space-y-8">
          
          {/* Subtasks */}
          <div className="bg-[#12101b] border border-white/5 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[14px] font-semibold text-white">Subtasks</h3>
              <span className="text-[12px] text-[#a1a1aa]">{completedSubtasks} / {subtasks.length}</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-white/5 rounded-full mb-5 overflow-hidden">
              <div 
                className="h-full bg-[#8b55ff] rounded-full shadow-[0_0_10px_rgba(139,85,255,0.4)] transition-all duration-500" 
                style={{ width: `${subtaskProgress}%` }}
              />
            </div>

            <div className="space-y-3 mb-4">
              {subtasks.map((st) => (
                <div key={st._id} className="flex items-start justify-between group">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <button 
                      onClick={() => updateSubtaskMutation.mutate({ subTaskId: st._id, isCompleted: !st.isCompleted })}
                      className={cn("mt-0.5", st.isCompleted ? "text-[#8b55ff]" : "text-[#a1a1aa] hover:text-white")}
                    >
                      {st.isCompleted ? <CheckSquare size={16} /> : <Square size={16} />}
                    </button>
                    <span className={cn("text-[13px] truncate", st.isCompleted ? "text-[#a1a1aa] line-through" : "text-white/90")}>
                      {st.title}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteSubtaskMutation.mutate(st._id)}
                    className="text-[#a1a1aa] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleCreateSubtask} className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
              <input 
                type="text" 
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                placeholder="Add new subtask..." 
                className="flex-1 bg-transparent text-[13px] text-white placeholder:text-[#a1a1aa] focus:outline-none"
              />
              <button 
                type="submit" 
                disabled={!newSubtaskTitle.trim() || createSubtaskMutation.isPending}
                className="p-1.5 text-[#8b55ff] hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50"
              >
                {createSubtaskMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              </button>
            </form>
          </div>

          {/* Comment Input */}
          <div className="bg-[#12101b] border border-white/5 rounded-xl p-4 flex items-center gap-3 mt-auto sticky bottom-4">
            <input 
              type="text" 
              placeholder="Write a comment... (Coming soon)" 
              disabled
              className="flex-1 bg-transparent text-[13px] text-white placeholder:text-[#a1a1aa] focus:outline-none disabled:opacity-50"
            />
            <button disabled className="p-2 text-[#8b55ff] hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50">
              <Send size={16} />
            </button>
          </div>

        </div>
      </div>
      <EditTaskModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        task={task} 
      />
    </div>
  );
};
