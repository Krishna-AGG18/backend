import React, { useState } from 'react';
import { ChevronDown, Plus, Trash2, Users, Shield, Edit3, Eye, X, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const RoleBadge = ({ role }) => {
  const styles = {
    Admin: 'text-[#8b55ff] bg-[#8b55ff]/10',
    Editor: 'text-[#52e7bc] bg-[#52e7bc]/10',
    Viewer: 'text-orange-400 bg-orange-400/10'
  };
  return (
    <span className={cn("text-[11px] px-2.5 py-1 rounded-full font-medium", styles[role])}>
      {role}
    </span>
  );
};

export const ProjectMembersPage = () => {
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);

  const members = [
    { id: 1, name: 'Olivia Rhye', email: 'olivia@workloom.com', role: 'Admin', joined: 'Apr 01, 2025', active: 'Today, 10:30 AM', avatar: 'Olivia' },
    { id: 2, name: 'Liam Carter', email: 'liam@workloom.com', role: 'Editor', joined: 'Apr 02, 2025', active: 'Today, 9:15 AM', avatar: 'Liam' },
    { id: 3, name: 'Emma Johnson', email: 'emma@workloom.com', role: 'Editor', joined: 'Apr 03, 2025', active: 'Today, 8:45 AM', avatar: 'Emma' },
    { id: 4, name: 'Noah Williams', email: 'noah@workloom.com', role: 'Viewer', joined: 'Apr 05, 2025', active: 'Yesterday, 6:20 PM', avatar: 'Noah' },
    { id: 5, name: 'Ava Brown', email: 'ava@workloom.com', role: 'Editor', joined: 'Apr 06, 2025', active: 'Yesterday, 4:10 PM', avatar: 'Ava' },
    { id: 6, name: 'James Miller', email: 'james@workloom.com', role: 'Viewer', joined: 'Apr 07, 2025', active: 'May 12, 2025', avatar: 'James' },
  ];

  return (
    <div className="flex h-full w-full relative">
      <div className={cn("flex-1 flex flex-col max-w-5xl transition-all duration-300", isAddPanelOpen ? "lg:pr-[340px]" : "mx-auto")}>
        
        {/* Header & Tabs */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-[24px] font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
              Website Redesign <ChevronDown size={20} className="text-[#a1a1aa] cursor-pointer" />
            </h1>
            <div className="flex items-center gap-6 mt-4 border-b border-white/5 pb-0">
              {['Summary', 'Tasks', 'Members', 'Files', 'Settings'].map((tab) => (
                <button 
                  key={tab} 
                  className={cn(
                    "text-[13px] font-medium pb-3 border-b-2 transition-colors",
                    tab === 'Members' 
                      ? "text-[#8b55ff] border-[#8b55ff]" 
                      : "text-[#a1a1aa] border-transparent hover:text-white"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => setIsAddPanelOpen(true)}
            className="bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[13px] font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={16} /> Add Member
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#12101b] border border-white/5 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[#a1a1aa] font-medium mb-1">Total Members</div>
              <div className="text-[24px] font-bold text-[#8b55ff]">8</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#8b55ff]/10 flex items-center justify-center text-[#8b55ff]">
              <Users size={16} />
            </div>
          </div>
          <div className="bg-[#12101b] border border-white/5 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[#a1a1aa] font-medium mb-1">Admins</div>
              <div className="text-[24px] font-bold text-[#4182ff]">2</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#4182ff]/10 flex items-center justify-center text-[#4182ff]">
              <Shield size={16} />
            </div>
          </div>
          <div className="bg-[#12101b] border border-white/5 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[#a1a1aa] font-medium mb-1">Editors</div>
              <div className="text-[24px] font-bold text-[#52e7bc]">4</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#52e7bc]/10 flex items-center justify-center text-[#52e7bc]">
              <Edit3 size={16} />
            </div>
          </div>
          <div className="bg-[#12101b] border border-white/5 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[#a1a1aa] font-medium mb-1">Viewers</div>
              <div className="text-[24px] font-bold text-orange-400">2</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-400/10 flex items-center justify-center text-orange-400">
              <Eye size={16} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#12101b] border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Member</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Last Active</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatar}`} alt={member.name} className="w-8 h-8 rounded-full bg-white/10" />
                        <div>
                          <div className="text-[13px] text-white font-medium">{member.name}</div>
                          <div className="text-[11px] text-[#a1a1aa]">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><RoleBadge role={member.role} /></td>
                    <td className="px-6 py-4 text-[12px] text-white/80">{member.joined}</td>
                    <td className="px-6 py-4 text-[12px] text-white/80">{member.active}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#a1a1aa] hover:text-red-400 transition-colors p-1.5 rounded hover:bg-white/5">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add Member Slide-over Panel */}
      <div className={cn(
        "fixed lg:absolute top-0 right-0 h-full w-[340px] bg-[#0a0812] border-l border-white/5 p-6 transform transition-transform duration-300 ease-in-out z-30",
        isAddPanelOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[16px] font-semibold text-white">Add Member</h2>
          <button onClick={() => setIsAddPanelOpen(false)} className="text-[#a1a1aa] hover:text-white"><X size={20} /></button>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white">Email Address <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              className="w-full bg-[#12101b] border border-white/5 rounded-lg p-2.5 text-[13px] text-white placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white">Role</label>
            <div className="relative">
              <select className="w-full appearance-none bg-[#12101b] border border-white/5 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 cursor-pointer">
                <option>Editor</option>
                <option>Admin</option>
                <option>Viewer</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-white flex justify-between">Message <span className="text-[#a1a1aa]">(optional)</span></label>
            <textarea 
              placeholder="Invite message..." 
              className="w-full bg-[#12101b] border border-white/5 rounded-lg p-2.5 text-[13px] text-white placeholder:text-[#a1a1aa] resize-none h-[100px] focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
            ></textarea>
            <div className="text-[10px] text-[#a1a1aa] text-right">0 / 200</div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            <button onClick={() => setIsAddPanelOpen(false)} className="flex-1 py-2.5 bg-[#12101b] border border-white/5 rounded-lg text-[13px] font-medium text-white hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button className="flex-1 py-2.5 bg-[#8b55ff] hover:bg-[#7a4be0] rounded-lg text-[13px] font-medium text-white transition-colors">
              Send Invite
            </button>
          </div>

          {/* Role Descriptions */}
          <div className="pt-8 space-y-4">
            <div>
              <div className="text-[13px] font-medium text-white mb-0.5">Admin</div>
              <div className="text-[11px] text-[#a1a1aa]">Full access to project settings and billing</div>
            </div>
            <div>
              <div className="text-[13px] font-medium text-white mb-0.5 flex justify-between">Editor <CheckSquare size={14} className="text-[#8b55ff]" /></div>
              <div className="text-[11px] text-[#a1a1aa]">Can edit tasks and manage files</div>
            </div>
            <div>
              <div className="text-[13px] font-medium text-white mb-0.5">Viewer</div>
              <div className="text-[11px] text-[#a1a1aa]">Can view tasks and files, read-only</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
