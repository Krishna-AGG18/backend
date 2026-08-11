import { apiClient } from "./client";

export const AuthAPI = {
  // --- Unsecure Routes (No Token Required) ---
  
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  verifyEmail: async (verificationToken) => {
    const response = await apiClient.get(`/auth/verify-email/${verificationToken}`);
    return response.data;
  },

  forgotPassword: async (emailData) => {
    const response = await apiClient.post('/auth/forgot-password', emailData);
    return response.data;
  },

  resetPassword: async (resetToken, passwordData) => {
    const response = await apiClient.post(`/auth/reset-password/${resetToken}`, passwordData);
    return response.data;
  },

  // --- Secure Routes (Token Required) ---

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.post('/auth/current-user');
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await apiClient.post('/auth/change-password', passwordData);
    return response.data;
  },

  resendEmailVerification: async () => {
    const response = await apiClient.post('/auth/resend-email-verification');
    return response.data;
  }
};
