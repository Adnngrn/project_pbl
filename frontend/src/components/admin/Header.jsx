import React from "react";
import { useLocation } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

const Header = () => {
  const location = useLocation();

  // Mapping route to page title
  const getTitle = () => {
    if (location.pathname === "/admin") return "Dashboard";
    if (location.pathname === "/admin/manage-member") return "Data Anggota";
    if (location.pathname === "/admin/donations") return "Data Donasi";
    if (location.pathname === "/admin/manage-event") return "Event / Program";

    return "Admin Panel"; // default
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
      <h2 className="text-xl font-semibold text-gray-800">{getTitle()}</h2>
      <LogoutButton />
    </header>
  );
};

export default Header;
