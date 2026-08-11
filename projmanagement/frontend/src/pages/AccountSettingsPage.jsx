import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

export const AccountSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const navItems = [
    { id: 'Profile', label: 'Profile' },
    { id: 'Security', label: 'Security' },
    { id: 'Appearance', label: 'Appearance' },
    { id: 'Notifications', label: 'Notifications' },
    { id: 'Sessions', label: 'Sessions' },
  ];

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8 shrink-0">
        <h1 className="text-[24px] font-bold text-white font-['Space_Grotesk'] tracking-tight mb-1">Account Settings</h1>
        <p className="text-[13px] text-[#a1a1aa]">Manage your personal information and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 flex-1 min-h-0">
        {/* Left Nav */}
        <div className="w-full lg:w-[240px] shrink-0 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-[13px] font-medium transition-colors",
                activeTab === item.id 
                  ? "bg-[#8b55ff]/10 text-[#8b55ff]" 
                  : "text-[#a1a1aa] hover:text-white hover:bg-white/5"
              )}
            >
              {item.label}
              {activeTab === item.id && <ChevronRight size={14} />}
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-[#12101b] border border-white/5 rounded-xl p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          
          <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column in Content */}
            <div className="space-y-10">
              
              {/* Profile Information */}
              <section className="space-y-6">
                <h2 className="text-[16px] font-semibold text-white border-b border-white/5 pb-2">Profile Information</h2>
                
                <div className="flex items-center gap-4">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia" alt="Olivia" className="w-16 h-16 rounded-full bg-white/10" />
                  <button className="text-[13px] text-[#8b55ff] hover:underline font-medium">Change avatar</button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="Olivia Rhye" 
                      className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Email</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        defaultValue="olivia@workloom.com" 
                        className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 pr-20 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#52e7bc] font-medium bg-[#52e7bc]/10 px-2 py-0.5 rounded">Verified</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Role</label>
                    <select className="w-full appearance-none bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 cursor-pointer">
                      <option>Product Designer</option>
                      <option>Developer</option>
                      <option>Product Manager</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Appearance */}
              <section className="space-y-6">
                <h2 className="text-[16px] font-semibold text-white border-b border-white/5 pb-2">Appearance</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Theme</label>
                    <div className="flex gap-4">
                      {['Dark', 'Light', 'System'].map((theme, i) => (
                        <label key={theme} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="theme" defaultChecked={i === 0} className="accent-[#8b55ff]" />
                          <span className="text-[13px] text-white/80">{theme}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Accent Color</label>
                    <div className="flex gap-3">
                      {['bg-[#8b55ff]', 'bg-blue-500', 'bg-cyan-400', 'bg-emerald-400', 'bg-orange-400', 'bg-pink-500'].map((color, i) => (
                        <button key={i} className={cn("w-6 h-6 rounded-full ring-2 ring-offset-2 ring-offset-[#12101b] transition-all", color, i === 0 ? "ring-white/40" : "ring-transparent hover:ring-white/20")} />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column in Content */}
            <div className="space-y-10">
              
              {/* Change Password */}
              <section className="space-y-6">
                <h2 className="text-[16px] font-semibold text-white border-b border-white/5 pb-2">Change Password</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">New Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
                    />
                  </div>

                  <button className="bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[13px] font-medium py-2.5 px-6 rounded-lg transition-colors mt-2">
                    Update Password
                  </button>
                </div>
              </section>

              {/* Email Verification */}
              <section className="space-y-6">
                <h2 className="text-[16px] font-semibold text-white border-b border-white/5 pb-2">Email Verification</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#52e7bc]">
                    <CheckCircle2 size={16} />
                    <span className="text-[13px] font-medium">Your email is verified.</span>
                  </div>
                  <div className="text-[13px] text-white/80">
                    olivia@workloom.com
                  </div>
                  <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[13px] font-medium py-2.5 px-6 rounded-lg transition-colors mt-2">
                    Resend Verification Email
                  </button>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
