import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  LandingPage, LoginPage, SignupPage, ForgotPasswordPage, 
  ResetPasswordPage, VerifyEmailPage, DashboardPage,
  TasksPage, CreateTaskPage, TaskDetailPage, ProjectMembersPage
} from "./pages/index.js";
import { DashboardLayout } from "./components/ui/DashboardLayout.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:resetToken" element={<ResetPasswordPage />} />
        <Route path="/verify-email/:verificationToken" element={<VerifyEmailPage />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="tasks/new" element={<CreateTaskPage />} />
          <Route path="tasks/:taskId" element={<TaskDetailPage />} />
          <Route path="projects/:projectId/members" element={<ProjectMembersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
