import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ActivityTimelinePage = () => {
  const activities = [
    { id: 1, actor: 'Olivia Rhye', role: 'Designer', avatar: 'Olivia', action: 'Created a note', details: 'Design System Updates', time: '2h ago' },
    { id: 2, actor: 'Phoenix Baker', role: 'Developer', avatar: 'Phoenix', action: 'Updated task status', details: 'Landing Page Redesign → In Progress', time: '4h ago' },
    { id: 3, actor: 'Lana Steiner', role: 'Product Manager', avatar: 'Lana', action: 'Commented on a task', details: 'API Integration', time: '6h ago' },
    { id: 4, actor: 'Demi Wilkinson', role: 'Developer', avatar: 'Demi', action: 'Pushed 3 commits', details: 'main', time: '1d ago' },
    { id: 5, actor: 'Candice Wu', role: 'Designer', avatar: 'Candice', action: 'Uploaded a file', details: 'brand-guidelines.pdf', time: '1d ago' },
    { id: 6, actor: 'Natali Craig', role: 'QA Engineer', avatar: 'Natali', action: 'Changed priority', details: 'Fix Navigation Bug → High', time: '2d ago' },
    { id: 7, actor: 'Orlando Diggs', role: 'Developer', avatar: 'Orlando', action: 'Closed a task', details: 'Set up CI/CD Pipeline', time: '2d ago' },
    { id: 8, actor: 'Andi Lane', role: 'Developer', avatar: 'Andi', action: 'Created a task', details: 'Add analytics events', time: '3d ago' },
  ];

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 shrink-0">
        <div>
          <h1 className="text-[24px] font-bold text-white font-['Space_Grotesk'] tracking-tight">Activity</h1>
          <p className="text-[13px] text-[#a1a1aa]">A timeline of actions and updates across this project.</p>
        </div>
        <button className="bg-[#12101b] border border-white/5 hover:bg-white/5 text-white text-[13px] font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
          Filter <ChevronDown size={14} className="text-[#a1a1aa]" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#12101b] border border-white/5 rounded-xl overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider w-1/4">Actor</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider w-1/4">Action</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider w-1/3">Details</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {activities.map((activity) => (
                <tr key={activity.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.avatar}`} alt={activity.actor} className="w-8 h-8 rounded-full bg-white/10" />
                      <div>
                        <div className="text-[13px] text-white font-medium">{activity.actor}</div>
                        <div className="text-[11px] text-[#a1a1aa]">{activity.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] text-white/80">{activity.action}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] text-white font-medium">{activity.details}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-[12px] text-[#a1a1aa]">{activity.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
