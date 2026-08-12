import React from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TaskAPI } from '@/api/tasks.api';
import { FileText, Download, Image as ImageIcon, File as FileIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const ProjectFilesPage = () => {
  const { projectId } = useParams();
  const { project } = useOutletContext();

  const { data: tasksData, isLoading } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => TaskAPI.getTasks(projectId),
    enabled: !!projectId
  });

  if (isLoading) {
    return (
      <div className="flex flex-col h-[calc(100vh-140px)] w-full items-center justify-center text-[#a1a1aa]">
        <div className="w-6 h-6 border-2 border-[#8b55ff] border-t-transparent rounded-full animate-spin mb-3"></div>
        Loading files...
      </div>
    );
  }

  const tasks = tasksData?.data?.tasks || [];
  
  // Extract all attachments from tasks
  const files = [];
  tasks.forEach(task => {
    if (task.attachments && task.attachments.length > 0) {
      task.attachments.forEach(attachment => {
        files.push({
          ...attachment,
          taskId: task._id,
          taskTitle: task.title,
          uploadedAt: task.updatedAt // Approximating upload time as task update time
        });
      });
    }
  });

  const getFileIcon = (mimetype) => {
    if (!mimetype) return <FileIcon size={24} className="text-[#a1a1aa]" />;
    if (mimetype.startsWith('image/')) return <ImageIcon size={24} className="text-blue-400" />;
    if (mimetype.includes('pdf')) return <FileText size={24} className="text-red-400" />;
    return <FileIcon size={24} className="text-[#a1a1aa]" />;
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] w-full">
      <div className="mb-6 shrink-0">
        <h1 className="text-[24px] font-bold text-white font-['Space_Grotesk'] tracking-tight mb-1">Project Files</h1>
        <p className="text-[13px] text-[#a1a1aa]">All files attached to tasks in {project?.name}.</p>
      </div>

      <div className="flex-1 bg-[#12101b] border border-white/5 rounded-xl p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {files.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-[#a1a1aa]">
            <FileIcon size={48} className="mb-4 opacity-20" />
            <p className="text-[14px]">No files found.</p>
            <p className="text-[12px] mt-1">Attachments added to tasks will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file, idx) => (
              <div key={idx} className="bg-[#0a0812] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    {getFileIcon(file.mimetype)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-medium text-white mb-1 truncate" title={file.url?.split('/').pop() || 'Unknown File'}>
                      {file.url?.split('/').pop() || 'Unknown File'}
                    </h3>
                    <div className="text-[11px] text-[#a1a1aa] mb-2">
                      {formatBytes(file.size)} • {formatDistanceToNow(new Date(file.uploadedAt), { addSuffix: true })}
                    </div>
                    <div className="text-[11px] bg-white/5 text-white/80 px-2 py-1 rounded-md truncate inline-block max-w-full">
                      <span className="text-[#8b55ff] font-medium">Task:</span> {file.taskTitle}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                  <a 
                    href={file.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[12px] text-[#a1a1aa] hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Download size={14} /> Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
