import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useAdminStore from '../store/adminStore';

// User Pages
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Profile } from '../pages/Profile';
import { Alerts } from '../pages/Alerts';
import { Settings } from '../pages/Settings';
import Landing from "../pages/Landing"

// // Admin Pages
import AdminLogin from '../pages/Admin/Login';
import AdminLayout from '../components/Admin/AdminLayout';
import AdminDashboard from '../pages/Admin/Dashboard';
import Tourists from '../pages/Admin/Tourists';
import TouristDetail from '../pages/Admin/TouritsDetails';
import Incidents from '../pages/Admin/Incidents';

// ProtectedRoute for users
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// ProtectedRoute for admin
const AdminProtectedRoute = ({ children }) => {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const isAdminAuthenticated = useAdminStore((state) => state.isAuthenticated);

  return (
    <Routes>
      <Route 
      path = "/"
      element = {<Landing/>}
      />
      {/* User Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/alerts"
        element={
          <ProtectedRoute>
            <Alerts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/login"
        element={
          isAdminAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />
        }
      />
      <Route
        path="/admin/*"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="tourists" element={<Tourists />} />
        <Route path="tourists/:id" element={<TouristDetail />} />
        <Route path="incidents" element={<Incidents />} />
      </Route>

      {/* Fallback */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
