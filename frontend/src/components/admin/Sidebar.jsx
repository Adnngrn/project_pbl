// src/components/admin/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { XMarkIcon} from "@heroicons/react/24/outline";

const SidebarItem = ({ to, label }) => {
  return (
    <li>
      <Link
        to={to}
        className="block px-6 py-2 text-white rounded transition-all duration-200 hover:text-amber-700 hover:bg-amber-100 hover:scale-105 hover:translate-x-1"
      >
        {label}
      </Link>
    </li>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay (hanya muncul di mobile) */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-52 md:w-56 bg-amber-600 shadow-lg transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        <div className="p-6 border-b border-white flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>

          {/* Close button (mobile only) */}
          <button
            className="md:hidden text-white"
            onClick={onClose}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6">
          <ul className="space-y-2 overflow-hidden">
            <SidebarItem to="/admin" label="Dashboard" />
            <SidebarItem to="/admin/manage-member" label="Data Anggota" />
            <SidebarItem to="/admin/donations" label="Data Donasi" />
            <SidebarItem to="/admin/events" label="Event / Program" />
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
