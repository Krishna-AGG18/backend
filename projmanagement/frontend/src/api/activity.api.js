import { apiClient } from "./client";

export const ActivityAPI = {
  // Get all activities for a project
  getProjectActivities: async (projectId, params = { page: 1, limit: 20 }) => {
    const response = await apiClient.get(`/activities/${projectId}`, { params });
    return response.data;
  }
};
