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
  }
};
