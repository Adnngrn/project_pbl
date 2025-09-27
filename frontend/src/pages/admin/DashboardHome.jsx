// src/pages/admin/DashboardHome.jsx
import React from "react";
import PendingUsers from "../../components/admin/PendingUsers";
import Donations from "../../components/admin/Donations";
import AdminEvent from "../../components/admin/AdminEvent";

const DashboardHome = () => {
  return (
    <>
      {/* Data Anggota */}
      <PendingUsers jml={5}/>   

      {/* Data Iuran */}
      {/* <Donations/> */}

      {/* Event */}
      <AdminEvent/>
    </>
  );
};

export default DashboardHome;
