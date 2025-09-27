// src/pages/admin/DashboardAdmin.jsx
import React from "react";
import LayoutAdmin from "../../components/admin/LayoutAdmin";
import { Outlet } from "react-router-dom";

const DashboardAdmin = () => {
  return (
    <LayoutAdmin>
      <Outlet />
    </LayoutAdmin>
  );
};

export default DashboardAdmin;
