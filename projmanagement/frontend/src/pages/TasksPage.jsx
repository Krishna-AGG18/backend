import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, List, Plus, Star, ChevronDown, Clock, User, CheckSquare, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { DashboardAPI } from '@/api/dashboard.api';
import { formatDistanceToNow } from 'date-fns';

const PriorityBadge = ({ priority }) => {
  const colors = {
    High: 'text-red-400 bg-red-400/10',
    Medium: 'text-orange-400 bg-orange-400/10',
    Low: 'text-[#8b55ff] bg-[#8b55ff]/10'
  };
  
  return (
    <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium", colors[priority])}>
      {priority}
    </span>
  );
};

const TaskCard = ({ task }) => (
  <Link to={`/dashboard/tasks/${task.id}`} className="block bg-[#12101b] border border-white/5 rounded-lg p-3 hover:bg-white/5 transition-colors group cursor-pointer">
    <div className="flex justify-between items-start mb-4">
      <h4 className="text-[13px] text-white/90 font-medium group-hover:text-white transition-colors">{task.title}</h4>
      <PriorityBadge priority={task.priority} />
    </div>
    <div className="flex items-center justify-between mt-auto">
      <img src={task.avatar} alt="Assignee" className="w-5 h-5 rounded-full bg-white/10" />
      <span className="text-[11px] text-[#a1a1aa]">{task.date}</span>
    </div>
  </Link>
);

const Column = ({ title, count, tasks, borderColor }) => (
  <div className="flex flex-col flex-1 min-w-[300px] max-w-[350px] bg-[#0a0812] border border-white/5 rounded-xl overflow-hidden h-[calc(100vh-220px)]">
    {/* Column Header */}
    <div className="flex items-center justify-between p-4 border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className={cn("w-2 h-2 rounded-full", borderColor)} />
        <h3 className="text-[14px] font-semibold text-white">{title}</h3>
        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white/5 text-[11px] text-[#a1a1aa]">
          {count}
        </span>
      </div>
      <button className="text-[#a1a1aa] hover:text-white"><Star size={14} /></button>
    </div>
    
    {/* Task List */}
    <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      {tasks.map(task => <TaskCard key={task.id} task={task} />)}
    </div>
    
    {/* Add Task Button */}
    <div className="p-3 border-t border-white/5">
      <Link to="/dashboard/tasks/new" className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-dashed border-white/10 text-[13px] text-[#a1a1aa] hover:text-white hover:bg-white/5 hover:border-white/20 transition-all">
        <Plus size={14} /> Add Task
      </Link>
    </div>
  </div>
);

export const TasksPage = () => {
  const navigate = useNavigate();
  
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: DashboardAPI.getDashboardStats
  });

  const upcomingTasks = data?.data?.upcomingTasks || [];
  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start shrink-0">
        <div>
          <h1 className="text-[28px] font-bold text-white font-['Space_Grotesk'] tracking-tight mb-1">
            My Tasks
          </h1>
          <p className="text-[13px] text-[#a1a1aa]">
            Tasks assigned to you across all projects.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Left Side: Search */}
        <div className="flex flex-wrap items-center gap-2 w-full max-w-md">
          <div className="relative w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
            <input 
              type="text" 
              placeholder="Search upcoming tasks..." 
              className="w-full bg-[#12101b] border border-white/5 rounded-md h-9 pl-9 pr-4 text-[13px] text-white placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-[#12101b] border border-white/5 rounded-xl overflow-hidden flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-[#12101b]/50 flex items-center justify-center">
            <Loader2 className="animate-spin text-[#8b55ff]" />
          </div>
        )}
        <div className="overflow-y-auto h-full scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Task</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Project</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider text-right">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {upcomingTasks.length > 0 ? upcomingTasks.map((task) => (
                <tr key={task._id} onClick={() => navigate(`/dashboard/projects/${task.project?._id}/tasks/${task._id}`)} className="hover:bg-white/5 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <CheckSquare size={14} className="text-[#a1a1aa] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[13px] text-white font-medium group-hover:text-white transition-colors">{task.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] text-white/80">{task.project?.name || 'Unknown Project'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium inline-block", 
                      task.priority === 'High' ? 'text-red-400 bg-red-400/10' :
                      task.priority === 'Medium' ? 'text-orange-400 bg-orange-400/10' :
                      'text-[#8b55ff] bg-[#8b55ff]/10'
                    )}>
                      {task.priority || 'Normal'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-[12px] text-[#a1a1aa] whitespace-nowrap">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-[13px] text-[#a1a1aa]">
                    You have no upcoming tasks across any projects.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
