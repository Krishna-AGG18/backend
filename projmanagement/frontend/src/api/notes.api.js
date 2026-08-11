import { apiClient } from "./client";

export const NotesAPI = {
  // Get all notes for a project
  getProjectNotes: async (projectId) => {
    const response = await apiClient.get(`/notes/${projectId}`);
    return response.data;
  },

  // Get a single note
  getNoteDetails: async ({ projectId, noteId }) => {
    const response = await apiClient.get(`/notes/${projectId}/n/${noteId}`);
    return response.data;
  },

  // Create a new note
  createNote: async ({ projectId, content }) => {
    const response = await apiClient.post(`/notes/${projectId}`, { content });
    return response.data;
  },

  // Update a note
  updateNote: async ({ projectId, noteId, content }) => {
    const response = await apiClient.put(`/notes/${projectId}/n/${noteId}`, { content });
    return response.data;
  },

  // Delete a note
  deleteNote: async ({ projectId, noteId }) => {
    const response = await apiClient.delete(`/notes/${projectId}/n/${noteId}`);
    return response.data;
  }
};
