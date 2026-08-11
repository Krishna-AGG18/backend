import React from "react";
import { ProtectedRoute } from "./components/common/ProtectedRoute.jsx";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
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
import { ProjectLayout } from "./components/projects/ProjectLayout.jsx";
import { TasksBoard } from "./components/projects/TasksBoard.jsx";
import { DashboardLayout } from "./components/ui/DashboardLayout.jsx";
import "./styles.css";

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

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
              
              <Route path="projects/:projectId" element={<ProjectLayout />}>
                <Route index element={<ProjectOverviewPage />} />
                <Route path="tasks" element={<TasksBoard />} />
                <Route path="members" element={<ProjectMembersPage />} />
                <Route path="notes" element={<NotesPage />} />
                <Route path="activity" element={<ActivityTimelinePage />} />
                <Route path="settings" element={<ProjectSettingsPage />} />
                <Route path="files" element={<div className="flex items-center justify-center text-[#a1a1aa] h-40">Files tab under construction</div>} />
              </Route>

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
    </QueryClientProvider>

  </React.StrictMode>,
);
