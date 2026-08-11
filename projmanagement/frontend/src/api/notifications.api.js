import { apiClient } from "./client";

export const NotificationsAPI = {
  // Get all user notifications
  getUserNotifications: async (params = { page: 1, limit: 20 }) => {
    const response = await apiClient.get('/notifications', { params });
    return response.data;
  },

  // Mark a notification as read
  markAsRead: async (notificationId) => {
    const response = await apiClient.patch(`/notifications/${notificationId}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const response = await apiClient.patch('/notifications/read-all');
    return response.data;
  }
};
