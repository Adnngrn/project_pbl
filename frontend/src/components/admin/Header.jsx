// src/components/admin/Header.jsx
import React from "react";
import LogoutButton from "../auth/LogoutButton";

const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
      <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      <LogoutButton/>
    </header>
  );
};

export default Header;
