import { apiClient } from './client';

export const TaskAPI = {
  getTasks: async (projectId, page = 1, limit = 10) => {
    const response = await apiClient.get(`/tasks/${projectId}?page=${page}&limit=${limit}`);
    return response.data;
  },

  getTaskById: async (projectId, taskId) => {
    const response = await apiClient.get(`/tasks/${projectId}/t/${taskId}`);
    return response.data;
  },

  createTask: async (projectId, taskData) => {
    const response = await apiClient.post(`/tasks/${projectId}`, taskData);
    return response.data;
  },

  updateTask: async ({ projectId, taskId, data }) => {
    const response = await apiClient.put(`/tasks/${projectId}/t/${taskId}`, data);
    return response.data;
  },

  deleteTask: async (projectId, taskId) => {
    const response = await apiClient.delete(`/tasks/${projectId}/t/${taskId}`);
    return response.data;
  },

  createSubTask: async ({ projectId, taskId, data }) => {
    const response = await apiClient.post(`/tasks/${projectId}/t/${taskId}/subtasks`, data);
    return response.data;
  },

  updateSubTask: async ({ projectId, subTaskId, data }) => {
    const response = await apiClient.put(`/tasks/${projectId}/st/${subTaskId}`, data);
    return response.data;
  },

  deleteSubTask: async (projectId, subTaskId) => {
    const response = await apiClient.delete(`/tasks/${projectId}/st/${subTaskId}`);
    return response.data;
  }
};
