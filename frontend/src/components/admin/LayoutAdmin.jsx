// src/components/admin/LayoutAdmin.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const LayoutAdmin = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64 overflow-y-auto">
        <Header />
        <main className="p-6 space-y-6">{children}</main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
