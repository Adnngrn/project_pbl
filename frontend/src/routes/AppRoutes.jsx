import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

// Lazy load pages
const LandingPage = lazy(() => import("../pages/public/LandingPage"));
const LoginPage = lazy(() => import("../pages/public/LoginPage"));
const RegisterPage = lazy(() => import("../pages/public/RegisterPage"));
const AdminDashboard = lazy(() => import("../pages/admin/DashboardAdmin"));
const ManageMember = lazy(() => import("../pages/admin/ManageMember"));
const DashboardHome = lazy(() => import("../pages/admin/DashboardHome"));
const ManageDonationPrograms = lazy(() => import("../pages/admin/ManageDonationPrograms"));
const AddDonationProgram = lazy(() => import("../pages/admin/AddDonationProgram"));
const DonationProgramDetail = lazy(() => import("../pages/admin/DonationProgramDetail"));
const ManageEventAdmin = lazy(() => import("../pages/admin/ManageEventAdmin"));
const EventDetailAdmin = lazy(() => import("../pages/admin/EventDetailAdmin"));


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
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          {/* index = tampil saat "/admin" */}
          <Route index element={<DashboardHome />} />
          <Route path="manage-member" element={<ManageMember />} />
          <Route path="donations" element={<ManageDonationPrograms />} />
          <Route path="donations/add" element={<AddDonationProgram />} />
          <Route path="donations/add" element={<AddDonationProgram />} />
          <Route path="donations/:id" element={<DonationProgramDetail />} />
          <Route path="/admin/events" element={<ManageEventAdmin />} />
          <Route path="/admin/events/:id" element={<EventDetailAdmin />} />
                      
          {/* nested routes */}
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
