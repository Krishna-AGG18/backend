import React, { useState } from 'react';
import { Search, Plus, Edit2, MoreHorizontal, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export const NotesPage = () => {
  const [activeNote, setActiveNote] = useState(1);

  const notesList = [
    { id: 1, title: 'Design System Updates', time: 'Edited 2h ago', active: true },
    { id: 2, title: 'Client Feedback Summary', time: 'Edited 1d ago' },
    { id: 3, title: 'Sprint Planning - May', time: 'Edited 2d ago' },
    { id: 4, title: 'API Integration Notes', time: 'Edited 3d ago' },
    { id: 5, title: 'Onboarding Flow Ideas', time: 'Edited 1w ago' },
    { id: 6, title: 'Performance Targets', time: 'Edited 1w ago' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-[24px] font-bold text-white font-['Space_Grotesk'] tracking-tight">Notes</h1>
          <p className="text-[13px] text-[#a1a1aa]">Capture ideas, decisions, and important context.</p>
        </div>
        <button className="bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[13px] font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={16} /> New Note
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 overflow-hidden">
        {/* Left Panel: Notes List */}
        <div className="w-full lg:w-[320px] bg-[#12101b] border border-white/5 rounded-xl flex flex-col shrink-0 overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
              <input 
                type="text" 
                placeholder="Search notes..." 
                className="w-full bg-[#0a0812] border border-white/5 rounded-lg h-9 pl-9 pr-4 text-[13px] text-white placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {notesList.map((note) => (
              <button
                key={note.id}
                onClick={() => setActiveNote(note.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-colors group",
                  activeNote === note.id ? "bg-[#8b55ff]/10 border border-[#8b55ff]/20" : "hover:bg-white/5 border border-transparent"
                )}
              >
                <div className={cn("text-[13px] font-medium mb-1", activeNote === note.id ? "text-white" : "text-white/80 group-hover:text-white")}>
                  {note.title}
                </div>
                <div className="text-[11px] text-[#a1a1aa]">{note.time}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel: Editor */}
        <div className="flex-1 bg-[#12101b] border border-white/5 rounded-xl flex flex-col min-h-0 relative">
          <div className="p-8 pb-4 flex justify-between items-start shrink-0">
            <div>
              <h2 className="text-[24px] font-semibold text-white mb-2">Design System Updates</h2>
              <div className="flex items-center gap-2 text-[12px] text-[#a1a1aa]">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia" alt="Olivia Rhye" className="w-5 h-5 rounded-full bg-white/10" />
                <span className="font-medium text-white/80">Olivia Rhye</span>
                <span>•</span>
                <span>May 18, 2024 at 10:24 AM</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 bg-[#8b55ff]/10 text-[#8b55ff] border border-[#8b55ff]/20 hover:bg-[#8b55ff]/20 rounded-md text-[13px] font-medium transition-colors">
                Edit
              </button>
              <button className="h-8 w-8 flex items-center justify-center bg-white/5 border border-white/5 rounded-md text-[#a1a1aa] hover:text-white hover:bg-white/10 transition-colors">
                <MoreHorizontal size={14} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 pt-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="prose prose-invert prose-sm max-w-none">
              <h3 className="text-[16px] text-white font-medium mb-2">Typography</h3>
              <ul className="text-[#a1a1aa] text-[13px] mb-6 list-disc pl-4 space-y-1">
                <li>Switched to Inter variable for improved readability.</li>
              </ul>

              <h3 className="text-[16px] text-white font-medium mb-2">Color Palette</h3>
              <ul className="text-[#a1a1aa] text-[13px] mb-6 list-disc pl-4 space-y-1">
                <li>Introduced new semantic colors for status feedback.</li>
              </ul>

              <h3 className="text-[16px] text-white font-medium mb-2">Components</h3>
              <ul className="text-[#a1a1aa] text-[13px] mb-6 list-disc pl-4 space-y-1">
                <li>Updated Button, Input, and Modal components.</li>
              </ul>

              <h3 className="text-[16px] text-white font-medium mb-3">Next Steps</h3>
              <div className="space-y-3">
                {['Update Figma library', 'Sync with frontend team', 'Document in Storybook'].map((task, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded border border-white/20 flex items-center justify-center bg-[#0a0812]" />
                    <span className="text-[13px] text-white/90">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="p-4 border-t border-white/5 flex justify-between items-center text-[11px] text-[#a1a1aa] shrink-0">
            <span className="flex items-center gap-1.5"><Clock size={12} /> Last edited 2 hours ago</span>
            <span>Autosaved</span>
          </div>
        </div>
      </div>
    </div>
  );
};
