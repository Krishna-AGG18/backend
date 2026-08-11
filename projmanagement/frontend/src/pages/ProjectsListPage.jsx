import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Search, Filter, Plus, LayoutGrid, List as ListIcon, 
  Layout, LayoutTemplate, Briefcase, Server, Box, Smartphone
} from 'lucide-react';

export const ProjectsListPage = () => {
  const navigate = useNavigate();

  const projects = [
    { 
      id: 1, 
      name: 'Loom Website Redesign', 
      category: 'Website', 
      description: 'Redesigning the marketing website for better engagement and conversions.',
      progress: 68,
      status: 'In Progress',
      statusColor: 'text-[#4182ff]',
      updated: '2h ago',
      members: ['Olivia', 'Phoenix', 'Lana', 'Demi'],
      icon: Layout,
      color: 'bg-blue-500/20 text-blue-400'
    },
    { 
      id: 2, 
      name: 'Customer Portal', 
      category: 'Product', 
      description: 'Building a self-service portal for customers to manage their account and billing.',
      progress: 42,
      status: 'In Progress',
      statusColor: 'text-[#4182ff]',
      updated: '4h ago',
      members: ['Candice', 'Natali', 'Orlando', 'Andi', 'Drew'],
      icon: LayoutTemplate,
      color: 'bg-indigo-500/20 text-indigo-400'
    },
    { 
      id: 3, 
      name: 'Mobile App v2.0', 
      category: 'Mobile', 
      description: 'Enhancing the mobile experience with new features and performance improvements.',
      progress: 25,
      status: 'In Progress',
      statusColor: 'text-[#4182ff]',
      updated: '1d ago',
      members: ['Phoenix', 'Demi', 'Andi'],
      icon: Smartphone,
      color: 'bg-emerald-500/20 text-emerald-400'
    },
    { 
      id: 4, 
      name: 'Internal Tooling', 
      category: 'Internal', 
      description: 'Tools and utilities to improve team productivity and workflows.',
      progress: 75,
      status: 'In Progress',
      statusColor: 'text-[#4182ff]',
      updated: '1d ago',
      members: ['Orlando', 'Lana', 'Candice', 'Phoenix'],
      icon: Server,
      color: 'bg-green-500/20 text-green-400'
    },
    { 
      id: 5, 
      name: 'Brand Identity', 
      category: 'Design', 
      description: 'Developing a new brand identity and guidelines for the company.',
      progress: 90,
      status: 'Review',
      statusColor: 'text-[#f59e0b]',
      updated: '2d ago',
      members: ['Olivia', 'Natali', 'Drew'],
      icon: Briefcase,
      color: 'bg-orange-500/20 text-orange-400'
    },
    { 
      id: 6, 
      name: 'Marketing Campaign', 
      category: 'Marketing', 
      description: 'Q2 campaign for product launch across multiple channels.',
      progress: 10,
      status: 'Planning',
      statusColor: 'text-[#a1a1aa]',
      updated: '3d ago',
      members: ['Lana', 'Candice'],
      icon: Box,
      color: 'bg-pink-500/20 text-pink-400'
    },
  ];

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

      {/* Projects Grid */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => navigate(`/dashboard/projects/${project.id}`)}
              className="bg-[#12101b] border border-white/5 hover:border-white/10 rounded-xl p-5 cursor-pointer group transition-all hover:bg-white/[0.02]"
            >
              
              {/* Card Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/5", project.color)}>
                  <project.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold text-white truncate group-hover:text-[#8b55ff] transition-colors">
                    {project.name}
                  </h3>
                  <div className="text-[12px] text-[#a1a1aa]">{project.category}</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[13px] text-[#a1a1aa] leading-relaxed mb-6 line-clamp-2 h-[38px]">
                {project.description}
              </p>

              {/* Progress */}
              <div className="mb-6 space-y-2">
                <div className="flex justify-between items-center text-[12px] font-medium">
                  <span className="text-white">{project.progress}%</span>
                  <span className={project.statusColor}>{project.status}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#8b55ff] to-[#52e7bc] rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Footer: Members & Updated */}
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div className="flex -space-x-2">
                  {project.members.slice(0, 3).map((member, i) => (
                    <img 
                      key={i} 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member}`} 
                      alt={member} 
                      className="w-7 h-7 rounded-full bg-[#12101b] border-2 border-[#12101b]"
                    />
                  ))}
                  {project.members.length > 3 && (
                    <div className="w-7 h-7 rounded-full bg-white/5 border-2 border-[#12101b] flex items-center justify-center text-[10px] font-medium text-white">
                      +{project.members.length - 3}
                    </div>
                  )}
                </div>
                <span className="text-[11px] text-[#a1a1aa]">{project.updated}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State example (commented out or conditionally rendered) */}
        {/*
        <div className="flex flex-col items-center justify-center h-full text-center py-20">
          <div className="w-48 h-48 mb-6 relative">
             // Isometric Box/Illustration here 
          </div>
          <h3 className="text-[18px] font-semibold text-white mb-2">No projects found</h3>
          <p className="text-[13px] text-[#a1a1aa] mb-6 max-w-sm">
            Try adjusting your search or filters, or create a new project.
          </p>
          <button className="bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[13px] font-medium py-2.5 px-6 rounded-lg transition-colors">
            + Create Project
          </button>
        </div>
        */}
      </div>
    </div>
  );
};
