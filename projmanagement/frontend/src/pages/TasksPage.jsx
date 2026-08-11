import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, List, Plus, Star, ChevronDown, Clock, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockTasks = {
  todo: [
    { id: 1, title: 'Research user needs', priority: 'High', date: 'May 20', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=A' },
    { id: 2, title: 'Create wireframes', priority: 'Medium', date: 'May 22', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=B' },
    { id: 3, title: 'Design system update', priority: 'Low', date: 'May 25', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=C' },
    { id: 4, title: 'Stakeholder review', priority: 'Medium', date: 'May 28', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=D' },
    { id: 5, title: 'Create style guide', priority: 'Low', date: 'May 30', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=E' },
  ],
  inProgress: [
    { id: 6, title: 'Homepage design', priority: 'High', date: 'May 18', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=F' },
    { id: 7, title: 'Develop landing page', priority: 'Medium', date: 'May 21', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=G' },
    { id: 8, title: 'Mobile responsiveness', priority: 'Medium', date: 'May 23', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=H' },
    { id: 9, title: 'Optimize performance', priority: 'Low', date: 'May 26', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=I' },
  ],
  done: [
    { id: 10, title: 'Project kickoff', priority: 'Low', date: 'May 01', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=J' },
    { id: 11, title: 'Competitor analysis', priority: 'Low', date: 'May 03', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=K' },
    { id: 12, title: 'Information architecture', priority: 'Medium', date: 'May 05', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=L' },
    { id: 13, title: 'Moodboard', priority: 'Low', date: 'May 07', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=M' },
    { id: 14, title: 'Logo concepts', priority: 'Low', date: 'May 09', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=N' },
    { id: 15, title: 'Color palette selection', priority: 'Low', date: 'May 10', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=O' },
  ]
};

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
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 text-[13px]">
        <div className="w-5 h-5 rounded-md bg-[#8b55ff] flex items-center justify-center text-white">
          <User size={12} />
        </div>
        <span className="text-white font-medium">Website Redesign</span>
        <button className="text-[#a1a1aa] hover:text-yellow-400 transition-colors"><Star size={14} /></button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Left Side: Search & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-64 max-md:w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="w-full bg-[#12101b] border border-white/5 rounded-md h-9 pl-9 pr-4 text-[13px] text-white placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
            />
          </div>
          
          {['Status', 'Priority', 'Assignee'].map((filter) => (
            <button key={filter} className="h-9 px-3 bg-[#12101b] border border-white/5 rounded-md text-[13px] text-white/80 hover:bg-white/5 flex items-center gap-2 transition-colors">
              {filter} <ChevronDown size={14} className="text-[#a1a1aa]" />
            </button>
          ))}
          
          <button className="h-9 px-3 text-[13px] text-[#a1a1aa] hover:text-white transition-colors">Clear</button>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 bg-[#12101b] border border-white/5 rounded-md text-[13px] text-white/80 hover:bg-white/5 flex items-center gap-2 transition-colors">
            <Filter size={14} /> Filters
          </button>
          <button className="h-9 px-3 bg-[#12101b] border border-white/5 rounded-md text-[13px] text-white/80 hover:bg-white/5 flex items-center gap-2 transition-colors">
            <List size={14} /> List View
          </button>
          <Link to="/dashboard/tasks/new" className="h-9 px-4 bg-[#8b55ff] hover:bg-[#7a4be0] rounded-md text-[13px] text-white font-medium flex items-center gap-2 transition-colors">
            <Plus size={16} /> Create Task
          </Link>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <Column title="Todo" count={5} tasks={mockTasks.todo} borderColor="bg-white/20" />
        <Column title="In Progress" count={4} tasks={mockTasks.inProgress} borderColor="bg-orange-400" />
        <Column title="Done" count={6} tasks={mockTasks.done} borderColor="bg-[#52e7bc]" />
      </div>
    </div>
  );
};
