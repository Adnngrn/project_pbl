import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "../components/admin/LayoutAdmin";
import ProtectedRoute from "../components/ProtectedRoute";

// Lazy load pages
const LandingPage = lazy(() => import("../pages/public/LandingPage"));
const LoginPage = lazy(() => import("../pages/public/LoginPage"));
const RegisterPage = lazy(() => import("../pages/public/RegisterPage"));
const AdminDashboard = lazy(() => import("../pages/admin/DashboardAdmin"));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      }
    >
      <Routes>
        {/* bebas diakses */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* admin harus login & role admin */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
                <AdminDashboard/>
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* <Route
          path="/member/*"
          element={
            <ProtectedRoute role="member">
              <LayoutAdmin />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
        </Route> */}

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
