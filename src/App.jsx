import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useOutletContext,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Users from "./pages/Users";

// Shared pages — used by both Admin and Client routes
import Dashboard from "./pages/Dashboard";
import Graph from "./pages/Graph";
import Diagnostics from "./pages/Diagnostics";

// Unified Layout
import AppLayout from "./layouts/AppLayout";

// Redirects to login if not authenticated, or wrong role
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" />;
  if (user.role !== allowedRole)
    return <Navigate to={user.role === "admin" ? "/admin" : "/client"} />;
  return children;
};

// Protects /admin/user/:userId/* — redirects if no user is selected
const SelectedUserGuard = ({ children }) => {
  const { selectedUser } = useOutletContext();
  if (!selectedUser) return <Navigate to="/admin/users" replace />;
  return children;
};

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={user ? <Navigate to={`/${user.role}`} /> : <Login />}
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AppLayout role="admin" />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/users" replace />} />
          <Route path="users" element={<Users />} />

          {/* Per-user routes — guarded, use shared pages */}
          <Route
            path="user/:userId/dashboard"
            element={
              <SelectedUserGuard>
                <Dashboard />
              </SelectedUserGuard>
            }
          />
          <Route
            path="user/:userId/graph"
            element={
              <SelectedUserGuard>
                <Graph />
              </SelectedUserGuard>
            }
          />
          <Route
            path="user/:userId/diagnostics"
            element={
              <SelectedUserGuard>
                <Diagnostics />
              </SelectedUserGuard>
            }
          />
        </Route>

        {/* Client Routes — same shared pages, no guard needed */}
        <Route
          path="/client"
          element={
            <ProtectedRoute allowedRole="client">
              <AppLayout role="client" />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/client/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="graph" element={<Graph />} />
          <Route path="diagnostics" element={<Diagnostics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
