// src/components/admin/Sidebar.jsx
import React from "react";

const SidebarItem = ({ href, label }) => {
  return (
    <li>
      <a
        href={href}
        className="block px-6 py-2 text-white rounded transition-all duration-200 hover:text-amber-700 hover:bg-amber-100 hover:scale-105 hover:translate-x-1"
      >
        {label}
      </a>
    </li>
  );
};


const Sidebar = () => {
  return (
    <aside className="w-64 bg-amber-600 shadow-lg fixed h-screen overflow-hidden">
      <div className="p-6 border-b border-white">
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2">
          <SidebarItem href="#anggota" label="Data Anggota" />
          <SidebarItem href="#iuran" label="Data Iuran" />
          <SidebarItem href="#event" label="Event / Program" />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
