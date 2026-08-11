import React, { useState } from 'react';
import { Plus, Trash2, Users, Shield, Edit3, Eye, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useParams, useOutletContext } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectAPI } from '@/api/projects.api';

const RoleBadge = ({ role }) => {
  const styles = {
    admin: 'text-[#8b55ff] bg-[#8b55ff]/10',
    project_admin: 'text-[#4182ff] bg-[#4182ff]/10',
    editor: 'text-[#52e7bc] bg-[#52e7bc]/10',
    viewer: 'text-orange-400 bg-orange-400/10',
    member: 'text-orange-400 bg-orange-400/10'
  };
  return (
    <span className={cn("text-[11px] px-2.5 py-1 rounded-full font-medium capitalize", styles[role] || styles.member)}>
      {role?.replace('_', ' ')}
    </span>
  );
};

export const ProjectMembersPage = () => {
  const { projectId } = useParams();
  const { project } = useOutletContext();
  const queryClient = useQueryClient();
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [emailToInvite, setEmailToInvite] = useState('');
  const [roleToInvite, setRoleToInvite] = useState('member');
  const [inviteError, setInviteError] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['projectMembers', projectId],
    queryFn: () => ProjectAPI.getProjectMembers(projectId),
    enabled: !!projectId
  });

  const addMemberMutation = useMutation({
    mutationFn: ProjectAPI.addMemberToProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['projectMembers', projectId]);
      setIsAddPanelOpen(false);
      setEmailToInvite('');
      setInviteError(null);
    },
    onError: (err) => {
      setInviteError(err.response?.data?.message || 'Failed to add member');
    }
  });

  const updateRoleMutation = useMutation({
    mutationFn: ProjectAPI.updateMemberRole,
    onSuccess: () => {
      queryClient.invalidateQueries(['projectMembers', projectId]);
    }
  });

  const deleteMemberMutation = useMutation({
    mutationFn: ProjectAPI.deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries(['projectMembers', projectId]);
    }
  });

  const handleAddMember = (e) => {
    e.preventDefault();
    setInviteError(null);
    if (!emailToInvite) return setInviteError("Email is required");
    addMemberMutation.mutate({ projectId, email: emailToInvite, role: roleToInvite });
  };

  if (isLoading) {
    return <div className="text-[#a1a1aa] p-6 text-center">Loading members...</div>;
  }

  const members = data?.data?.members || [];
  
  const adminsCount = members.filter(m => m.role === 'admin' || m.role === 'project_admin').length;
  const membersCount = members.filter(m => m.role === 'member').length;

  return (
    <div className="flex h-full w-full relative">
      <div className={cn("flex-1 flex flex-col transition-all duration-300", isAddPanelOpen ? "lg:pr-[340px]" : "")}>
        
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-[18px] font-semibold text-white">Team Members</h2>
          <button 
            onClick={() => setIsAddPanelOpen(true)}
            className="bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[13px] font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={16} /> Add Member
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#12101b] border border-white/5 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[#a1a1aa] font-medium mb-1">Total Members</div>
              <div className="text-[24px] font-bold text-[#8b55ff]">{members.length}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#8b55ff]/10 flex items-center justify-center text-[#8b55ff]">
              <Users size={16} />
            </div>
          </div>
          <div className="bg-[#12101b] border border-white/5 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[#a1a1aa] font-medium mb-1">Admins</div>
              <div className="text-[24px] font-bold text-[#4182ff]">{adminsCount}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#4182ff]/10 flex items-center justify-center text-[#4182ff]">
              <Shield size={16} />
            </div>
          </div>
          <div className="bg-[#12101b] border border-white/5 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[#a1a1aa] font-medium mb-1">Members</div>
              <div className="text-[24px] font-bold text-orange-400">{membersCount}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-400/10 flex items-center justify-center text-orange-400">
              <Eye size={16} />
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-[#12101b] border border-white/5 rounded-xl overflow-hidden flex-1 min-h-0 flex flex-col">
          <div className="overflow-x-auto flex-1 hide-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-4 px-6 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Member</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Role</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Joined</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {members.map((member) => (
                  <tr key={member._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img 
                          src={member.user?.avatar?.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.user?.username}`} 
                          alt={member.user?.username} 
                          className="w-10 h-10 rounded-full bg-[#050608] border border-white/10"
                        />
                        <div>
                          <div className="text-[14px] font-medium text-white mb-0.5">{member.user?.username}</div>
                          <div className="text-[12px] text-[#a1a1aa]">{member.user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <RoleBadge role={member.role} />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-[13px] text-[#a1a1aa]">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => deleteMemberMutation.mutate({ projectId, userId: member.user?._id })}
                          className="p-2 text-[#a1a1aa] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          title="Remove Member"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Member Sliding Panel */}
      <div className={cn(
        "fixed inset-y-0 right-0 w-[340px] bg-[#12101b] border-l border-white/5 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col",
        isAddPanelOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
          <h2 className="text-[16px] font-semibold text-white">Add New Member</h2>
          <button 
            onClick={() => setIsAddPanelOpen(false)}
            className="text-[#a1a1aa] hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleAddMember} className="p-6 flex-1 overflow-y-auto">
          {inviteError && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px]">
              {inviteError}
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[#a1a1aa]">Email Address</label>
              <input 
                type="email" 
                value={emailToInvite}
                onChange={(e) => setEmailToInvite(e.target.value)}
                placeholder="colleague@company.com"
                className="w-full bg-[#050608] border border-white/5 hover:border-white/10 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#8b55ff]/50 transition-colors shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[#a1a1aa]">Role</label>
              <div className="grid gap-3">
                
                <label className="flex items-start gap-3 p-3 rounded-xl border border-white/5 hover:border-[#8b55ff]/30 bg-white/[0.02] cursor-pointer transition-colors">
                  <input type="radio" name="role" value="admin" checked={roleToInvite === 'admin'} onChange={(e) => setRoleToInvite(e.target.value)} className="mt-1 accent-[#8b55ff]" />
                  <div>
                    <div className="text-[13px] font-medium text-white mb-0.5">Admin</div>
                    <div className="text-[11px] text-[#a1a1aa] leading-relaxed">Full access to project settings, members, and all content.</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-white/5 hover:border-[#8b55ff]/30 bg-white/[0.02] cursor-pointer transition-colors">
                  <input type="radio" name="role" value="member" checked={roleToInvite === 'member'} onChange={(e) => setRoleToInvite(e.target.value)} className="mt-1 accent-[#8b55ff]" />
                  <div>
                    <div className="text-[13px] font-medium text-white mb-0.5">Member</div>
                    <div className="text-[11px] text-[#a1a1aa] leading-relaxed">Can view, create and edit tasks, but cannot manage settings.</div>
                  </div>
                </label>

              </div>
            </div>
          </div>
        </form>

        <div className="p-6 border-t border-white/5 shrink-0">
          <button 
            onClick={handleAddMember}
            disabled={addMemberMutation.isPending}
            className="w-full bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[13px] font-medium py-2.5 rounded-lg transition-colors shadow-[0_0_15px_rgba(139,85,255,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {addMemberMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : 'Send Invite'}
          </button>
        </div>
      </div>
      
      {/* Backdrop for mobile/tablet when panel is open */}
      {isAddPanelOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsAddPanelOpen(false)}
        />
      )}
    </div>
  );
};
