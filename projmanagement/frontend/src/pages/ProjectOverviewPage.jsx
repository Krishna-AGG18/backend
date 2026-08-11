import React from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TaskAPI } from '@/api/tasks.api';
import { ActivityAPI } from '@/api/activity.api';
import { NotesAPI } from '@/api/notes.api';
import { cn } from '@/lib/utils';
import { FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Card = ({ children, className }) => (
  <div className={cn("bg-[#12101b] border border-white/5 rounded-xl p-6", className)}>
    {children}
  </div>
);

export const ProjectOverviewPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { project } = useOutletContext(); // Inherit project from ProjectLayout

  const { data: tasksData } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => TaskAPI.getTasks(projectId),
    enabled: !!projectId
  });

  const { data: activitiesData } = useQuery({
    queryKey: ['activities', projectId],
    queryFn: () => ActivityAPI.getProjectActivities(projectId, { limit: 3 }),
    enabled: !!projectId
  });

  const { data: notesData } = useQuery({
    queryKey: ['notes', projectId],
    queryFn: () => NotesAPI.getProjectNotes(projectId),
    enabled: !!projectId
  });

  const tasks = tasksData?.data?.tasks || [];
  const activities = activitiesData?.data?.activities || [];
  const notes = notesData?.data || [];

  // Calculate stats for donut
  const totalTasks = tasks.length;
  const todoTasks = tasks.filter(t => t.status === 'todo').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const doneTasks = tasks.filter(t => t.status === 'done').length;
  // Let's assume blocked is not standard in status, maybe just use done, in_progress, todo for the donut.
  // The donut circumference is 238.76 (2 * PI * r where r=38)
  const C = 238.76;
  
  const getOffset = (count, previousTotal) => {
    if (totalTasks === 0) return C;
    // We draw dashes of length (count/total)*C and then a gap of the rest
    // The starting position (offset) is shifted by (previousTotal/total)*C
    // Wait, SVG strokeDasharray can just be `${(count/total)*C} ${C}`
    // But we need to rotate them. The easiest way is strokeDashoffset = - (previousTotal / total) * C
    return - (previousTotal / totalTasks) * C;
  };

  const todoPct = totalTasks ? Math.round((todoTasks / totalTasks) * 100) : 0;
  const inProgressPct = totalTasks ? Math.round((inProgressTasks / totalTasks) * 100) : 0;
  const donePct = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        
        {/* Task Summary Donut */}
        <Card className="col-span-1">
          <h3 className="text-[14px] font-semibold text-white mb-6">Task Summary</h3>
          <div className="flex items-center gap-8">
            {/* Donut SVG */}
            <div className="relative w-[140px] h-[140px] shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" stroke="#1f1d2b" strokeWidth="16" fill="none" />
                
                {/* To Do */}
                {todoTasks > 0 && (
                  <circle cx="50" cy="50" r="38" stroke="#a1a1aa" strokeWidth="16" fill="none" 
                    strokeDasharray={`${(todoTasks / totalTasks) * C} ${C}`} 
                    strokeDashoffset={getOffset(todoTasks, 0)} 
                  />
                )}
                {/* In Progress */}
                {inProgressTasks > 0 && (
                  <circle cx="50" cy="50" r="38" stroke="#4182ff" strokeWidth="16" fill="none" 
                    strokeDasharray={`${(inProgressTasks / totalTasks) * C} ${C}`} 
                    strokeDashoffset={getOffset(inProgressTasks, todoTasks)} 
                  />
                )}
                {/* Completed */}
                {doneTasks > 0 && (
                  <circle cx="50" cy="50" r="38" stroke="#52e7bc" strokeWidth="16" fill="none" 
                    strokeDasharray={`${(doneTasks / totalTasks) * C} ${C}`} 
                    strokeDashoffset={getOffset(doneTasks, todoTasks + inProgressTasks)} 
                    className="drop-shadow-[0_0_8px_rgba(82,231,188,0.4)]" 
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white text-[28px] font-bold leading-none mb-1">{totalTasks}</span>
                <span className="text-[#a1a1aa] text-[10px]">Total</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-3 justify-center flex-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#52e7bc]" />
                <div className="flex justify-between w-full">
                  <span className="text-[11px] text-white/90">Completed</span>
                  <span className="text-[10px] text-[#a1a1aa]">{doneTasks} ({donePct}%)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4182ff]" />
                <div className="flex justify-between w-full">
                  <span className="text-[11px] text-white/90">In Progress</span>
                  <span className="text-[10px] text-[#a1a1aa]">{inProgressTasks} ({inProgressPct}%)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#a1a1aa]" />
                <div className="flex justify-between w-full">
                  <span className="text-[11px] text-white/90">To Do</span>
                  <span className="text-[10px] text-[#a1a1aa]">{todoTasks} ({todoPct}%)</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[14px] font-semibold text-white">Recent Activity</h3>
            <button onClick={() => navigate('/dashboard/projects/1/activity')} className="text-[11px] text-[#8b55ff] hover:underline font-medium">View all activity</button>
          </div>
          <div className="space-y-5">
            {activities.length > 0 ? activities.map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <img src={act.performedBy?.avatar?.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${act.performedBy?.username}`} alt={act.performedBy?.username} className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-white/90 leading-snug mb-0.5">
                    <span className="font-semibold text-white">{act.performedBy?.username}</span> {act.action}
                  </div>
                  <div className="text-[12px] text-[#a1a1aa] truncate">{act.details}</div>
                </div>
                <div className="text-[11px] text-[#a1a1aa] shrink-0 mt-0.5">
                  {formatDistanceToNow(new Date(act.createdAt), { addSuffix: true })}
                </div>
              </div>
            )) : (
              <div className="text-[13px] text-[#a1a1aa]">No recent activity</div>
            )}
          </div>
        </Card>

        {/* Project Description */}
        <Card className="col-span-1">
          <h3 className="text-[14px] font-semibold text-white mb-4">Project Description</h3>
          <p className="text-[13px] text-[#a1a1aa] leading-relaxed mb-4">
            {project?.description || 'No description provided.'}
          </p>
          <button className="text-[11px] text-[#8b55ff] hover:underline font-medium">View full description</button>
        </Card>

        {/* Notes Preview */}
        <Card className="col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[14px] font-semibold text-white">Notes Preview</h3>
            <button onClick={() => navigate(`/dashboard/projects/${projectId}/notes`)} className="text-[11px] text-[#8b55ff] hover:underline font-medium">View all notes</button>
          </div>
          <div className="space-y-4">
            {notes.length > 0 ? notes.slice(0, 3).map((note, i) => (
              <div key={i} onClick={() => navigate(`/dashboard/projects/${projectId}/notes`)} className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#8b55ff]/10 group-hover:text-[#8b55ff] transition-colors">
                  <FileText size={14} className="text-[#a1a1aa] group-hover:text-[#8b55ff] transition-colors" />
                </div>
                <div>
                  {/* Extract plain text from rich HTML text safely using regex or just showing "Note" if title isn't stored separately. Actually notes in backend have content. We will strip html tags for preview */}
                  <div className="text-[13px] font-medium text-white mb-0.5 group-hover:text-[#8b55ff] transition-colors line-clamp-1">
                    {note.content?.replace(/<[^>]+>/g, '').substring(0, 50) || 'Untitled Note'}
                  </div>
                  <div className="text-[11px] text-[#a1a1aa]">Updated {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}</div>
                </div>
              </div>
            )) : (
              <div className="text-[13px] text-[#a1a1aa]">No notes yet</div>
            )}
          </div>
        </Card>

    </div>
  );
};
