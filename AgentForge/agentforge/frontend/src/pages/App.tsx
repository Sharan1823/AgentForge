import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import DashboardPage from "./DashboardPage";
import ChatPage from "./ChatPage";
import AgentCreatorPage from "./AgentCreatorPage";
import AgentsPage from "./AgentsPage";
import BuilderPage from "./BuilderPage";
import AgentDetailPage from "./AgentDetailPage";
import MarketplacePage from "./MarketplacePage";
import SettingsPage from "./SettingsPage";
import { ProtectedRoute } from "../components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agents"
        element={
          <ProtectedRoute>
            <AgentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agent-creator"
        element={
          <ProtectedRoute>
            <AgentCreatorPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/build"
        element={
          <ProtectedRoute>
            <BuilderPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agents/:id"
        element={
          <ProtectedRoute>
            <AgentDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/marketplace"
        element={
          <ProtectedRoute>
            <MarketplacePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

