import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { useMutation } from '@tanstack/react-query';
import { AuthAPI } from '@/api/auth.api';

export const AccountSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const { user } = useAuthStore();
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const changePasswordMutation = useMutation({
    mutationFn: AuthAPI.changePassword,
    onSuccess: () => {
      setPasswordSuccess('Password updated successfully.');
      setPasswordError('');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordSuccess(''), 3000);
    },
    onError: (err) => {
      setPasswordError(err.response?.data?.message || 'Failed to update password');
      setPasswordSuccess('');
    }
  });

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    changePasswordMutation.mutate({
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword
    });
  };

  const navItems = [
    { id: 'Profile', label: 'Profile' },
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
                  <img src={user?.avatar?.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'User'}`} alt={user?.username} className="w-16 h-16 rounded-full bg-white/10" />
                  <button className="text-[13px] text-[#8b55ff] hover:underline font-medium">Change avatar (Coming soon)</button>
                </div>

                <div className="space-y-4 opacity-70 pointer-events-none">
                  <p className="text-[11px] text-[#a1a1aa] mb-2">Profile editing is temporarily disabled.</p>
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user?.fullName || ''} 
                      readOnly
                      className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Email</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        defaultValue={user?.email || ''} 
                        readOnly
                        className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 pr-20 text-[13px] text-white focus:outline-none"
                      />
                      {user?.isEmailVerified && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#52e7bc] font-medium bg-[#52e7bc]/10 px-2 py-0.5 rounded">Verified</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Role</label>
                    <div>
                      <span className="bg-[#8b55ff]/10 text-[#8b55ff] border border-[#8b55ff]/20 text-[11px] font-medium px-2.5 py-1 rounded-full uppercase">
                        {user?.role || 'Member'}
                      </span>
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
                
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Current Password</label>
                    <input 
                      type="password"
                      required
                      value={passwordData.oldPassword}
                      onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                      className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">New Password</label>
                    <input 
                      type="password"
                      required
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-white">Confirm New Password</label>
                    <input 
                      type="password" 
                      required
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full bg-[#0a0812] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
                    />
                  </div>

                  {passwordError && <p className="text-[12px] text-red-400">{passwordError}</p>}
                  {passwordSuccess && <p className="text-[12px] text-[#52e7bc]">{passwordSuccess}</p>}

                  <button 
                    type="submit"
                    disabled={changePasswordMutation.isPending}
                    className="bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[13px] font-medium py-2.5 px-6 rounded-lg transition-colors mt-2 flex items-center gap-2 disabled:opacity-50"
                  >
                    {changePasswordMutation.isPending && <Loader2 size={14} className="animate-spin" />}
                    Update Password
                  </button>
                </form>
              </section>

              {/* Email Verification */}
              <section className="space-y-6">
                <h2 className="text-[16px] font-semibold text-white border-b border-white/5 pb-2">Email Verification</h2>
                
                <div className="space-y-4">
                  {user?.isEmailVerified ? (
                    <div className="flex items-center gap-2 text-[#52e7bc]">
                      <CheckCircle2 size={16} />
                      <span className="text-[13px] font-medium">Your email is verified.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-yellow-500">
                      <span className="text-[13px] font-medium">Your email is not verified yet.</span>
                    </div>
                  )}
                  <div className="text-[13px] text-white/80">
                    {user?.email}
                  </div>
                  {!user?.isEmailVerified && (
                    <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[13px] font-medium py-2.5 px-6 rounded-lg transition-colors mt-2">
                      Resend Verification Email
                    </button>
                  )}
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
