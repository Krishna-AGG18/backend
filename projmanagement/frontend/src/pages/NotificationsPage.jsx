import React, { useState } from 'react';
import { AtSign, CheckSquare, MessageSquare, Settings, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationsAPI } from '@/api/notifications.api';
import { formatDistanceToNow } from 'date-fns';

export const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const queryClient = useQueryClient();

  const tabs = ['All', 'Unread'];

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => NotificationsAPI.getUserNotifications({ limit: 50 })
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id) => NotificationsAPI.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    }
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => NotificationsAPI.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    }
  });

  const rawNotifications = data?.data?.data || [];
  const unreadCount = data?.data?.metadata?.unread || 0;

  const notifications = rawNotifications.filter(notif => {
    if (activeTab === 'Unread') return !notif.isRead;
    return true;
  });

  const handleMarkAsRead = (id) => {
    markAsReadMutation.mutate(id);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[24px] font-bold text-white font-['Space_Grotesk'] tracking-tight">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-[#8b55ff] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadCount} Unread</span>
          )}
        </div>
        <button 
          onClick={() => markAllAsReadMutation.mutate()}
          disabled={unreadCount === 0 || markAllAsReadMutation.isPending}
          className="text-[#a1a1aa] hover:text-white text-[13px] font-medium transition-colors disabled:opacity-50"
        >
          {markAllAsReadMutation.isPending ? 'Marking...' : 'Mark all as read'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-6 border-b border-white/5 pb-0 shrink-0">
        {tabs.map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "text-[13px] font-medium pb-3 border-b-2 transition-colors",
              activeTab === tab 
                ? "text-[#8b55ff] border-[#8b55ff]" 
                : "text-[#a1a1aa] border-transparent hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent space-y-2">
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={32} className="animate-spin text-[#8b55ff]" />
          </div>
        )}
        
        {!isLoading && notifications.length === 0 && (
          <div className="text-center py-20 text-[#a1a1aa] text-[13px]">
            No notifications found.
          </div>
        )}

        {!isLoading && notifications.map((notif) => (
          <div 
            key={notif._id} 
            onClick={() => !notif.isRead && handleMarkAsRead(notif._id)}
            className={cn(
              "flex items-start gap-4 p-4 rounded-xl border transition-colors group cursor-pointer",
              !notif.isRead ? "bg-[#12101b] border-white/10" : "bg-transparent border-transparent hover:bg-white/5"
            )}
          >
            {/* Avatar / Icon */}
            <div className="relative shrink-0 mt-0.5">
              <div className="w-9 h-9 rounded-full bg-[#12101b] border border-white/10 flex items-center justify-center text-[#a1a1aa]">
                <Settings size={16} />
              </div>
              {/* Type Badge */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#050608] flex items-center justify-center bg-[#12101b]">
                <Settings size={8} className="text-[#a1a1aa]" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="text-[13px] text-white/90 leading-relaxed">
                {notif.message}
              </div>
            </div>

            {/* Meta (Time & Unread Dot) */}
            <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
              <span className="text-[11px] text-[#a1a1aa]">{formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}</span>
              {!notif.isRead && <div className="w-2 h-2 rounded-full bg-[#8b55ff]" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

