import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Search, Filter, Plus, LayoutGrid, List as ListIcon, 
  Layout, Loader2
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { ProjectAPI } from '../api/projects.api';
import { useProjectStore } from '../stores/project.store';

export const ProjectsListPage = () => {
  const navigate = useNavigate();
  // Zustand store se function le rahe hain
  const setCurrentProjectId = useProjectStore(state => state.setCurrentProjectId);

  // Backend se projects fetch karne ka hook
  const { data, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: () => ProjectAPI.getProjects()
  });

  // API response structure handle kar rahe hain (data.data.data me array aata hai)
  const projectsList = data?.data?.data || [];

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-start shrink-0">
        <div>
          <h1 className="text-[28px] font-bold text-white font-['Space_Grotesk'] tracking-tight mb-1">
            Projects
          </h1>
          <p className="text-[13px] text-[#a1a1aa]">
            Manage and organize all your projects in one place.
          </p>
        </div>
        <Link 
          to="/dashboard/projects/new"
          className="bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[13px] font-medium py-2.5 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(139,85,255,0.3)]"
        >
          <Plus size={16} /> New Project
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-[280px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full bg-[#12101b] border border-white/5 hover:border-white/10 rounded-lg pl-9 pr-4 py-2 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
            />
          </div>
          <button className="bg-[#12101b] border border-white/5 hover:bg-white/5 text-white text-[13px] font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
            <Filter size={14} className="text-[#a1a1aa]" /> Filter
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[13px]">
            <span className="text-[#a1a1aa]">Sort:</span>
            <button className="text-white font-medium hover:text-[#8b55ff] transition-colors">Recently updated</button>
          </div>
          <div className="flex items-center gap-1 bg-[#12101b] border border-white/5 p-1 rounded-lg">
            <button className="p-1.5 bg-white/10 text-white rounded shadow-sm">
              <LayoutGrid size={16} />
            </button>
            <button className="p-1.5 text-[#a1a1aa] hover:text-white transition-colors">
              <ListIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid & States */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-none">
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={32} className="animate-spin text-[#8b55ff]" />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex justify-center items-center py-20 text-red-400">
            Failed to load projects. Please try again.
          </div>
        )}

        {/* Data State */}
        {!isLoading && projectsList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-6">
            {projectsList.map((item) => {
              const project = item.project;
              const progress = 0; // Abhi ke liye 0 (backend me progress column nahi hai)
              const statusColor = project.status === 'completed' ? 'text-green-400' : 'text-[#4182ff]';
              
              return (
                <div 
                  key={project._id} 
                  onClick={() => {
                    setCurrentProjectId(project._id); // Store me ID save ki
                    navigate(`/dashboard/projects/${project._id}`); // Project page par gaye
                  }}
                  className="bg-[#12101b] border border-white/5 hover:border-white/10 rounded-xl p-5 cursor-pointer group transition-all hover:bg-white/[0.02]"
                >
                  
                  {/* Card Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/5 bg-blue-500/20 text-blue-400")}>
                      <Layout size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-semibold text-white truncate group-hover:text-[#8b55ff] transition-colors">
                        {project.name}
                      </h3>
                      <div className="text-[12px] text-[#a1a1aa] capitalize">{project.status || 'Active'}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[13px] text-[#a1a1aa] leading-relaxed mb-6 line-clamp-2 h-[38px]">
                    {project.description || 'No description provided.'}
                  </p>

                  {/* Progress (Mocked for now) */}
                  <div className="mb-6 space-y-2">
                    <div className="flex justify-between items-center text-[12px] font-medium">
                      <span className="text-white">{progress}%</span>
                      <span className={`capitalize ${statusColor}`}>{project.status}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#8b55ff] to-[#52e7bc] rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div className="flex -space-x-2">
                      {project.members && project.members.slice(0, 3).map((memberObj, i) => (
                        <img 
                          key={i} 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${memberObj.user || i}`} 
                          alt="member" 
                          className="w-7 h-7 rounded-full bg-[#12101b] border-2 border-[#12101b]"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#a1a1aa]">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && projectsList.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <h3 className="text-[18px] font-semibold text-white mb-2">No projects found</h3>
            <p className="text-[13px] text-[#a1a1aa] mb-6 max-w-sm">
              Try adjusting your search or filters, or create a new project.
            </p>
            <Link 
              to="/dashboard/projects/new"
              className="bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[13px] font-medium py-2.5 px-6 rounded-lg transition-colors"
            >
              + Create Project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
