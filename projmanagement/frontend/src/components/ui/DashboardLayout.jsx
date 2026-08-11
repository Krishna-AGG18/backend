import React, { useState } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, ChevronLeft, Home } from 'lucide-react';
import { DashboardSidebar } from './DashboardSidebar';

export const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    let currentPath = '';

    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      let label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      
      if (!isNaN(path) && paths[index - 1] === 'projects') {
        label = `Project ${path}`;
      } else if (!isNaN(path) && paths[index - 1] === 'tasks') {
        label = `Task ${path}`;
      }
      
      breadcrumbs.push({ label, path: currentPath });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  const currentTitle = breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : 'Dashboard';

  return (
    <div className="flex h-screen w-full bg-[#050608] overflow-hidden text-white font-sans selection:bg-[#8b55ff]/30 selection:text-white">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.15]" style={{ backgroundColor: '#8b55ff' }} />
        <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.1]" style={{ backgroundColor: '#52e7bc' }} />
      </div>

      <DashboardSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 h-full overflow-hidden">
        
        {/* Mobile Topbar */}
        <header className="lg:hidden h-[60px] flex items-center justify-between px-4 border-b border-white/5 shrink-0 bg-[#050608]/80 backdrop-blur-md">
          <button 
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-[#a1a1aa] hover:bg-white/5 hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="font-['Space_Grotesk'] font-bold tracking-tight text-[16px] truncate max-w-[200px]">
            {currentTitle}
          </div>
          <div className="w-9 h-9 rounded-full bg-white/10" /> {/* Placeholder for balance */}
        </header>

        {/* Desktop Topbar */}
        <header className="max-lg:hidden h-[64px] flex items-center justify-between px-6 border-b border-white/5 shrink-0 bg-[#050608]/80 backdrop-blur-md relative z-20">
          
          <div className="flex items-center gap-2 md:gap-3 text-[13px] text-[#a1a1aa] font-medium">
            <button onClick={() => navigate(-1)} className="hover:text-white transition-colors mr-2"><ChevronLeft size={16} /></button>
            <Link to="/dashboard" className="hover:text-white transition-colors"><Home size={15} /></Link>
            
            {breadcrumbs.map((crumb, index) => {
              // Hide 'dashboard' since home icon already handles it
              if (index === 0 && crumb.label.toLowerCase() === 'dashboard') {
                return breadcrumbs.length === 1 ? (
                  <React.Fragment key={crumb.path}>
                    <span className="text-white/20">/</span>
                    <span className="text-white">Overview</span>
                  </React.Fragment>
                ) : null;
              }
              
              return (
                <React.Fragment key={crumb.path}>
                  <span className="text-white/20">/</span>
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-white truncate max-w-[120px]">{crumb.label}</span>
                  ) : (
                    <Link to={crumb.path} className="hover:text-white transition-colors truncate max-w-[120px]">{crumb.label}</Link>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative w-[320px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
              <input 
                type="text" 
                placeholder="Search projects, tasks, people..." 
                className="w-full bg-white/5 border border-white/5 rounded-md h-[32px] pl-9 pr-4 text-[13px] text-white placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
              />
            </div>
            
            <button className="relative text-[#a1a1aa] hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute -top-1.5 -right-1.5 w-[16px] h-[16px] flex items-center justify-center bg-[#8b55ff] rounded-full text-[10px] font-bold text-white border-2 border-[#050608]">3</span>
            </button>
            
            <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Krishna" 
                alt="User" 
                className="w-7 h-7 rounded-full bg-white/10"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-[2px] border-[#050608]" />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <div className="p-4 md:p-8 max-w-[1400px] mx-auto w-full">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};
