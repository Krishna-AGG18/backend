import React from 'react';
import { Filter, ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ActivityAPI } from '@/api/activity.api';
import { formatDistanceToNow } from 'date-fns';

export const ActivityTimelinePage = () => {
  const { projectId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['activities', projectId],
    queryFn: () => ActivityAPI.getProjectActivities(projectId, { limit: 50 }),
    enabled: !!projectId
  });

  const activities = data?.data?.activities || [];

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
                <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider w-1/4">Actor</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider w-1/4">Action</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider w-1/3">Details</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {activities.length > 0 ? activities.map((activity) => (
                <tr key={activity._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={activity.performedBy?.avatar?.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.performedBy?.username}`} alt={activity.performedBy?.username} className="w-8 h-8 rounded-full bg-white/10 object-cover" />
                      <div>
                        <div className="text-[13px] text-white font-medium">{activity.performedBy?.username}</div>
                        <div className="text-[11px] text-[#a1a1aa]">Member</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] text-white/80 capitalize">{activity.action?.replace(/_/g, ' ')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] text-white font-medium">{activity.details}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-[12px] text-[#a1a1aa] whitespace-nowrap">
                      {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-[13px] text-[#a1a1aa]">
                    No activities found for this project yet.
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
