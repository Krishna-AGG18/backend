import { apiClient } from "./client";

export const ProjectAPI = {
  // Get all projects for the logged in user
  getProjects: async (params = { page: 1, limit: 10 }) => {
    const response = await apiClient.get('/projects', { params });
    return response.data;
  },

  // Get a single project details
  getProjectById: async (projectId) => {
    const response = await apiClient.get(`/projects/${projectId}`);
    return response.data;
  },

  // Create a new project
  createProject: async (projectData) => {
    const response = await apiClient.post('/projects', projectData);
    return response.data;
  },

  // Get project members
  getProjectMembers: async (projectId) => {
    const response = await apiClient.get(`/projects/${projectId}/members`);
    return response.data;
  },

  // Add a member to the project
  addMemberToProject: async ({ projectId, email, role }) => {
    const response = await apiClient.post(`/projects/${projectId}/members`, { email, role });
    return response.data;
  },

  // Update member role
  updateMemberRole: async ({ projectId, userId, role }) => {
    const response = await apiClient.put(`/projects/${projectId}/members/${userId}`, { role });
    return response.data;
  },

  // Delete a member from the project
  deleteMember: async ({ projectId, userId }) => {
    const response = await apiClient.delete(`/projects/${projectId}/members/${userId}`);
    return response.data;
  }
};
