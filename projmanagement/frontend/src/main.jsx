import React from "react";
import { ProtectedRoute } from "./components/common/ProtectedRoute.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LandingPage, LoginPage, SignupPage, ForgotPasswordPage,
  ResetPasswordPage, VerifyEmailPage, DashboardPage,
  TasksPage, CreateTaskPage, TaskDetailPage, ProjectMembersPage,
  NotesPage, ActivityTimelinePage, NotificationsPage, ProjectSettingsPage,
  AccountSettingsPage, UnauthorizedPage, OnboardingPage,
  ProjectsListPage, CreateProjectPage, ProjectOverviewPage,
  NotFoundPage
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

        {/* Protected/Private Routes  */}
        <Route element={<ProtectedRoute />}>
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="tasks/new" element={<CreateTaskPage />} />
            <Route path="tasks/:taskId" element={<TaskDetailPage />} />

            <Route path="projects" element={<ProjectsListPage />} />
            <Route path="projects/new" element={<CreateProjectPage />} />
            <Route path="projects/:projectId" element={<ProjectOverviewPage />} />
            <Route path="projects/:projectId/members" element={<ProjectMembersPage />} />
            <Route path="projects/:projectId/notes" element={<NotesPage />} />
            <Route path="projects/:projectId/activity" element={<ActivityTimelinePage />} />
            <Route path="projects/:projectId/settings" element={<ProjectSettingsPage />} />

            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<AccountSettingsPage />} />
          </Route>

          {/* Standalone New Pages */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>


        {/* Catch-all Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
