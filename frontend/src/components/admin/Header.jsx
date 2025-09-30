// src/components/admin/Header.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Header = ({ onMenuClick }) => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/admin": return "Dashboard";
      case "/admin/manage-member": return "Data Anggota";
      case "/admin/donations": return "Data Donasi";
      case "/admin/manage-event": return "Event / Program";
      default: return "Admin Panel";
    }
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
      {/* Menu icon (mobile only) */}
      <button className="md:hidden text-gray-600 mr-4" onClick={onMenuClick}>
        <Bars3Icon className="h-6 w-6" />
      </button>

      <h2 className="text-xl font-semibold text-gray-800 flex-1">
        {getTitle()}
      </h2>

      <LogoutButton />
    </header>
  );
};

export default Header;
