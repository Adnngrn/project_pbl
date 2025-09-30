// src/components/admin/LayoutAdmin.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const LayoutAdmin = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 md:p-6 space-y-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
