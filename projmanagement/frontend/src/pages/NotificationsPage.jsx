import React, { useState } from 'react';
import { AtSign, CheckSquare, MessageSquare, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Mentions', 'Tasks', 'Comments', 'System'];

  const notifications = [
    { id: 1, type: 'mention', actor: 'Phoenix Baker', text: 'mentioned you in a comment', target: 'On API Integration', time: '2h ago', unread: true, avatar: 'Phoenix' },
    { id: 2, type: 'task', actor: 'Lana Steiner', text: 'assigned you a task', target: 'Landing Page Redesign', time: '4h ago', unread: true, avatar: 'Lana' },
    { id: 3, type: 'task', actor: 'Demi Wilkinson', text: 'updated the status of a task', target: 'Fix Navigation Bug → In Progress', time: '6h ago', unread: true, avatar: 'Demi' },
    { id: 4, type: 'comment', actor: 'Candice Wu', text: 'commented on Design System Updates', target: '"Check out this feedback on spacing..."', time: '1d ago', unread: false, avatar: 'Candice' },
    { id: 5, type: 'system', actor: 'System update', text: 'Workloom will undergo maintenance on May 20, 2024 at 12:00 AM UTC.', target: '', time: '2d ago', unread: false, icon: Settings },
    { id: 6, type: 'mention', actor: 'Orlando Diggs', text: 'mentioned you in a comment', target: 'On Set up CI/CD Pipeline', time: '2d ago', unread: false, avatar: 'Orlando' },
    { id: 7, type: 'task', actor: 'Natali Craig', text: 'changed the priority of a task', target: 'Fix Navigation Bug → High', time: '3d ago', unread: false, avatar: 'Natali' },
    { id: 8, type: 'task', actor: 'Andi Lane', text: 'created a new task', target: 'Add analytics events', time: '3d ago', unread: false, avatar: 'Andi' },
  ];

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[24px] font-bold text-white font-['Space_Grotesk'] tracking-tight">Notifications</h1>
          <span className="bg-[#8b55ff] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">8 Unread</span>
        </div>
        <button className="text-[#a1a1aa] hover:text-white text-[13px] font-medium transition-colors">
          Mark all as read
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
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={cn(
              "flex items-start gap-4 p-4 rounded-xl border transition-colors group cursor-pointer",
              notif.unread ? "bg-[#12101b] border-white/10" : "bg-transparent border-transparent hover:bg-white/5"
            )}
          >
            {/* Avatar / Icon */}
            <div className="relative shrink-0 mt-0.5">
              {notif.avatar ? (
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${notif.avatar}`} alt={notif.actor} className="w-9 h-9 rounded-full bg-white/10" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#12101b] border border-white/10 flex items-center justify-center text-[#a1a1aa]">
                  {notif.icon && <notif.icon size={16} />}
                </div>
              )}
              {/* Type Badge */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#050608] flex items-center justify-center bg-[#12101b]">
                {notif.type === 'mention' && <AtSign size={8} className="text-[#8b55ff]" />}
                {notif.type === 'task' && <CheckSquare size={8} className="text-[#52e7bc]" />}
                {notif.type === 'comment' && <MessageSquare size={8} className="text-orange-400" />}
                {notif.type === 'system' && <Settings size={8} className="text-[#a1a1aa]" />}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="text-[13px] text-white/90 leading-relaxed">
                <span className="font-semibold text-white">{notif.actor}</span> {notif.text}
              </div>
              {notif.target && (
                <div className="text-[12px] text-[#a1a1aa] mt-1 line-clamp-1">
                  {notif.target}
                </div>
              )}
            </div>

            {/* Meta (Time & Unread Dot) */}
            <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
              <span className="text-[11px] text-[#a1a1aa]">{notif.time}</span>
              {notif.unread && <div className="w-2 h-2 rounded-full bg-[#8b55ff]" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
