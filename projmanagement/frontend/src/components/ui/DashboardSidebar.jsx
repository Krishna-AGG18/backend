import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FolderGit2, 
  Activity, 
  Settings, 
  Search, 
  Bell, 
  LogOut,
  Command,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  KanbanSquare,
  FileText,
  Folder,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth.store';
import { AuthAPI } from '@/api/auth.api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { NotificationsAPI } from '@/api/notifications.api';

export const DashboardSidebar = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setLogout } = useAuthStore();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  // Fetch unread notifications count
  const { data: notifData } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => NotificationsAPI.getUserNotifications({ limit: 1 }),
  });
  
  const unreadCount = notifData?.data?.metadata?.unread || 0;

  const logoutMutation = useMutation({
    mutationFn: AuthAPI.logout,
    onSuccess: () => {
      setLogout();
      navigate('/login');
    },
    onError: () => {
      // Even if API fails, clear local store
      setLogout();
      navigate('/login');
    }
  });

  const handleSearchClick = (e) => {
    e.preventDefault();
    alert("Global Search is coming soon!");
  };

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Tasks', path: '/dashboard/tasks', icon: CheckSquare },
    { name: 'Projects', path: '/dashboard/projects', icon: FolderGit2 },
  ];

  const toolsItems = [
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
    { name: 'Search', path: '#', icon: Search, onClick: handleSearchClick },
    { name: 'Notifications', path: '/dashboard/notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-[260px] bg-[#050608] border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        
        {/* Header / Logo */}
        <div className="h-[72px] px-6 flex items-center shrink-0 border-b border-white/5">
          <Link to="/dashboard" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-[linear-gradient(135deg,#8b55ff,#5b28d9)] flex items-center justify-center text-white shadow-[0_0_15px_rgba(139,85,255,0.4)]">
              <Command size={18} />
            </div>
            <span className="font-['Space_Grotesk'] font-bold text-[18px] tracking-tight">Workloom</span>
          </Link>
        </div>

        {/* Spacer */}
        <div className="pt-6 pb-2" />

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8 scrollbar-none">
          
          {/* Main Menu */}
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all group",
                    isActive 
                      ? "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)]" 
                      : "text-[#a1a1aa] hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={16} className={cn(
                      "transition-colors",
                      isActive ? "text-[#b695ff]" : "text-[#a1a1aa] group-hover:text-white"
                    )} />
                    {item.name}
                  </div>
                  {isActive && <ChevronRight size={14} className="text-[#a1a1aa]" />}
                </Link>
              )
            })}
          </div>

          {/* Tools */}
          <div className="space-y-1">
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-[#a1a1aa] uppercase">
              Tools
            </div>
            {toolsItems.map((item) => {
              if (item.onClick) {
                return (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium text-[#a1a1aa] hover:bg-white/5 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={16} className="text-[#a1a1aa] group-hover:text-white transition-colors" />
                      {item.name}
                    </div>
                  </button>
                );
              }
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium text-[#a1a1aa] hover:bg-white/5 hover:text-white transition-all group"
                >
                <div className="flex items-center gap-3">
                  <item.icon size={16} className="text-[#a1a1aa] group-hover:text-white transition-colors" />
                  {item.name}
                </div>
                {item.shortcut && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#a1a1aa] border border-white/10">
                    {item.shortcut}
                  </span>
                )}
                {item.badge && (
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#8b55ff] text-[10px] text-white font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
              );
            })}
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-white/5 shrink-0 relative">
          
          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#12101b] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 z-50">
              <div className="px-3 py-2 border-b border-white/5 mb-1">
                <p className="text-[12px] text-[#a1a1aa]">Signed in as</p>
                <p className="text-[13px] font-medium text-white truncate">{user?.email}</p>
              </div>
              <button 
                onClick={() => {
                  setShowProfileMenu(false);
                  logoutMutation.mutate();
                }}
                disabled={logoutMutation.isPending}
                className="w-full text-left px-3 py-2 text-[13px] text-red-400 hover:bg-white/5 flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <LogOut size={14} />
                {logoutMutation.isPending ? 'Logging out...' : 'Log out'}
              </button>
            </div>
          )}

          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center justify-between w-full p-2 rounded-xl hover:bg-white/5 transition-colors group text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img 
                  src={user?.avatar?.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'User'}`} 
                  alt="User" 
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/10"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#52e7bc] rounded-full border-[2px] border-[#050608]" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-white leading-none mb-1 truncate">{user?.fullName || user?.username || 'User'}</p>
                <p className="text-[11px] text-[#a1a1aa] leading-none capitalize truncate">{user?.role || 'Member'}</p>
              </div>
            </div>
            <MoreHorizontal size={16} className="text-[#a1a1aa] group-hover:text-white transition-colors shrink-0" />
          </button>
        </div>

      </aside>
    </>
  );
};
