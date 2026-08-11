import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, MoreHorizontal, Clock, Loader2, Save, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NotesAPI } from '@/api/notes.api';
import { formatDistanceToNow } from 'date-fns';

export const NotesPage = () => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['notes', projectId],
    queryFn: () => NotesAPI.getProjectNotes(projectId),
    enabled: !!projectId
  });

  const notesList = data?.data || [];
  const filteredNotes = notesList.filter(n => n.content?.toLowerCase().includes(searchQuery.toLowerCase()));
  
  const activeNote = notesList.find(n => n._id === activeNoteId);

  // When notes load, select the first one if none selected
  useEffect(() => {
    if (!activeNoteId && notesList.length > 0) {
      setActiveNoteId(notesList[0]._id);
    }
  }, [notesList, activeNoteId]);

  const createNoteMutation = useMutation({
    mutationFn: NotesAPI.createNote,
    onSuccess: (res) => {
      queryClient.invalidateQueries(['notes', projectId]);
      setActiveNoteId(res.data._id);
      setIsEditing(true);
      setEditContent(res.data.content || '');
    }
  });

  const updateNoteMutation = useMutation({
    mutationFn: NotesAPI.updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes', projectId]);
      setIsEditing(false);
    }
  });

  const deleteNoteMutation = useMutation({
    mutationFn: NotesAPI.deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes', projectId]);
      setActiveNoteId(null);
      setIsEditing(false);
    }
  });

  const handleCreateNew = () => {
    createNoteMutation.mutate({ projectId, content: '<h1>New Note</h1><p>Start typing here...</p>' });
  };

  const handleSave = () => {
    if (!activeNoteId) return;
    updateNoteMutation.mutate({ projectId, noteId: activeNoteId, content: editContent });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-[24px] font-bold text-white font-['Space_Grotesk'] tracking-tight">Notes</h1>
          <p className="text-[13px] text-[#a1a1aa]">Capture ideas, decisions, and important context.</p>
        </div>
        <button 
          onClick={handleCreateNew}
          disabled={createNoteMutation.isPending}
          className="bg-[#8b55ff] hover:bg-[#7a4be0] text-white text-[13px] font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {createNoteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          New Note
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 overflow-hidden">
        {/* Left Panel: Notes List */}
        <div className="w-full lg:w-[320px] bg-[#12101b] border border-white/5 rounded-xl flex flex-col shrink-0 overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 bg-[#12101b]/50 flex items-center justify-center">
              <Loader2 className="animate-spin text-[#8b55ff]" />
            </div>
          )}
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..." 
                className="w-full bg-[#0a0812] border border-white/5 rounded-lg h-9 pl-9 pr-4 text-[13px] text-white placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#8b55ff]/50 transition-colors"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {filteredNotes.length > 0 ? filteredNotes.map((note) => {
              // Extract title safely
              const tempDiv = document.createElement("div");
              tempDiv.innerHTML = note.content || '';
              const titleMatch = tempDiv.querySelector('h1, h2, h3, p');
              const title = titleMatch ? titleMatch.innerText.substring(0, 40) : 'Untitled Note';

              return (
                <button
                  key={note._id}
                  onClick={() => {
                    setActiveNoteId(note._id);
                    setIsEditing(false);
                  }}
                  className={cn(
                    "w-full text-left p-3 rounded-lg transition-colors group",
                    activeNoteId === note._id ? "bg-[#8b55ff]/10 border border-[#8b55ff]/20" : "hover:bg-white/5 border border-transparent"
                  )}
                >
                  <div className={cn("text-[13px] font-medium mb-1 truncate", activeNoteId === note._id ? "text-white" : "text-white/80 group-hover:text-white")}>
                    {title || 'Untitled Note'}
                  </div>
                  <div className="text-[11px] text-[#a1a1aa]">
                    Edited {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                  </div>
                </button>
              )
            }) : (
              <div className="p-4 text-center text-[12px] text-[#a1a1aa]">No notes found</div>
            )}
          </div>
        </div>

        {/* Right Panel: Editor */}
        <div className="flex-1 bg-[#12101b] border border-white/5 rounded-xl flex flex-col min-h-0 relative">
          {!activeNote ? (
            <div className="flex-1 flex flex-col items-center justify-center text-[#a1a1aa]">
              <FileText size={48} className="mb-4 opacity-20" />
              <p>Select a note to view or edit</p>
            </div>
          ) : (
            <>
              <div className="p-8 pb-4 flex justify-between items-start shrink-0 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2 text-[12px] text-[#a1a1aa] mb-1">
                    <img src={activeNote.createdBy?.avatar?.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activeNote.createdBy?.username}`} alt="Creator" className="w-5 h-5 rounded-full bg-white/10" />
                    <span className="font-medium text-white/80">{activeNote.createdBy?.username}</span>
                    <span>•</span>
                    <span>{new Date(activeNote.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <button onClick={() => setIsEditing(false)} className="h-8 px-3 text-[#a1a1aa] hover:text-white text-[13px] font-medium transition-colors">
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        disabled={updateNoteMutation.isPending}
                        className="h-8 px-3 bg-[#52e7bc]/10 text-[#52e7bc] border border-[#52e7bc]/20 hover:bg-[#52e7bc]/20 rounded-md text-[13px] font-medium transition-colors flex items-center gap-1"
                      >
                        {updateNoteMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                        Save Note
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => {
                          setEditContent(activeNote.content || '');
                          setIsEditing(true);
                        }}
                        className="h-8 px-3 bg-[#8b55ff]/10 text-[#8b55ff] border border-[#8b55ff]/20 hover:bg-[#8b55ff]/20 rounded-md text-[13px] font-medium transition-colors flex items-center gap-1"
                      >
                        <Edit2 size={14} /> Edit Note
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this note?")) {
                            deleteNoteMutation.mutate({ projectId, noteId: activeNote._id });
                          }
                        }}
                        className="h-8 w-8 flex items-center justify-center bg-white/5 border border-white/5 rounded-md text-[#a1a1aa] hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/20 transition-colors"
                        title="Delete Note"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 pt-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {isEditing ? (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-full min-h-[300px] bg-transparent text-white text-[14px] leading-relaxed resize-none focus:outline-none font-mono"
                    placeholder="Write your note here using HTML..."
                  />
                ) : (
                  <div 
                    className="prose prose-invert prose-sm max-w-none text-[14px] leading-relaxed text-[#a1a1aa]"
                    dangerouslySetInnerHTML={{ __html: activeNote.content || '<p>Empty note</p>' }}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
