import React from 'react';
import { Link, useNavigate, useParams, Outlet, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProjectAPI } from '@/api/projects.api';
import { cn } from '@/lib/utils';
import { ArrowLeft, Star, Users, Plus } from 'lucide-react';
import { TaskAPI } from '@/api/tasks.api';
import { CreateTaskModal } from './CreateTaskModal';

export const ProjectLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => ProjectAPI.getProjectById(projectId),
    enabled: !!projectId
  });

  const { data: tasksData } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => TaskAPI.getTasks(projectId),
    enabled: !!projectId
  });

  const [isTaskModalOpen, setIsTaskModalOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-[#a1a1aa] flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-[#8b55ff] border-t-transparent rounded-full animate-spin"></div>
          Loading project...
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-400">Failed to load project details.</div>
      </div>
    );
  }

  const project = data.data;

  const tabs = [
    { name: 'Overview', path: `/dashboard/projects/${projectId}` },
    { name: 'Tasks', path: `/dashboard/projects/${projectId}/tasks` },
    { name: 'Timeline', path: `/dashboard/projects/${projectId}/activity` },
    { name: 'Members', path: `/dashboard/projects/${projectId}/members` },
    { name: 'Notes', path: `/dashboard/projects/${projectId}/notes` },
    { name: 'Files', path: `/dashboard/projects/${projectId}/files` },
    { name: 'Settings', path: `/dashboard/projects/${projectId}/settings` },
  ];

  const tasks = tasksData?.data?.tasks || [];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const progressPct = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const isOverdue = project.dueDate && new Date(project.dueDate) < new Date();

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto space-y-8">
      
      {/* Back & Header */}
      <div className="shrink-0 space-y-6">
        <button 
          onClick={() => navigate('/dashboard/projects')}
          className="text-[12px] text-[#a1a1aa] hover:text-white flex items-center gap-2 transition-colors w-fit"
        >
          <ArrowLeft size={14} /> Back to Projects
        </button>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 border border-white/5 flex items-center justify-center text-[24px] font-bold shrink-0 uppercase">
              {project.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-[28px] font-bold text-white font-['Space_Grotesk'] tracking-tight leading-none">
                  {project.name}
                </h1>
                <Star size={20} className="text-[#f59e0b] fill-[#f59e0b] cursor-pointer hover:scale-110 transition-transform" />
              </div>
              <p className="text-[14px] text-[#a1a1aa] mb-4">
                {project.description || "No description provided."}
              </p>
              
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#4182ff]/10 text-[#4182ff] border border-[#4182ff]/20 text-[11px] font-medium px-2.5 py-1 rounded-full uppercase">
                  {project.status || 'unknown'}
                </span>
                <span className="bg-transparent text-red-400 border border-red-500/30 text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 uppercase">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> {project.priority || 'normal'} Priority
                </span>
                <span className={cn("text-[12px] bg-white/5 border px-2.5 py-1 rounded-full", isOverdue ? "text-red-400 border-red-500/30" : "text-[#a1a1aa] border-white/10")}>
                  Due {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Header Stats */}
          <div className="flex items-center gap-10">
            <button 
              onClick={() => setIsTaskModalOpen(true)}
              className="px-4 py-2 bg-[#8b55ff] hover:bg-[#8b55ff]/90 text-white text-[13px] font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus size={16} /> Create Task
            </button>
            <div className="flex flex-col gap-2 min-w-[140px]">
              <div className="flex justify-between text-[12px] font-medium">
                <span className="text-white">Progress</span>
                <span className="text-[#a1a1aa]">{progressPct}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#8b55ff] to-[#4182ff] rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
              </div>
            </div>
            
            <div>
              <div className="text-[12px] text-[#a1a1aa] font-medium mb-2">Members</div>
              <div className="flex -space-x-2">
                {project.members && project.members.slice(0, 4).map((member, i) => (
                  <img 
                    key={i} 
                    src={member.memberId?.avatar?.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.memberId?.username || i}`} 
                    alt={member.memberId?.username || 'Member'} 
                    className="w-8 h-8 rounded-full bg-[#12101b] border-2 border-[#12101b] cursor-pointer hover:z-10 relative object-cover"
                    title={member.memberId?.username}
                  />
                ))}
                {project.members && project.members.length > 4 && (
                  <div className="w-8 h-8 rounded-full bg-white/5 border-2 border-[#12101b] flex items-center justify-center text-[10px] font-medium text-white cursor-pointer hover:bg-white/10 transition-colors z-10">
                    +{project.members.length - 4}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-white/5 shrink-0 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => {
          // Exact match for overview, prefix match for others to keep active state if nested
          const isActive = tab.name === 'Overview' 
            ? location.pathname === tab.path 
            : location.pathname.startsWith(tab.path);

          return (
            <Link 
              key={tab.name}
              to={tab.path}
              className={cn(
                "text-[13px] font-medium pb-4 border-b-2 transition-colors whitespace-nowrap",
                isActive 
                  ? "text-white border-[#8b55ff]" 
                  : "text-[#a1a1aa] border-transparent hover:text-white"
              )}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>

      {/* Grid Content - Outlet injects specific tab view */}
      <div className="flex-1 min-h-0">
        <Outlet context={{ project, setIsTaskModalOpen }} />
      </div>

      <CreateTaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
      />
    </div>
  );
};
