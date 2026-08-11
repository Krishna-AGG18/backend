import { apiClient } from "./client";

export const DashboardAPI = {
  getDashboardStats: async () => {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  }
};
