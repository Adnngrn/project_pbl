import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex flex-col items-center ${
        isActive ? "text-yellow-500 font-medium" : "text-gray-500"
      }`}
    >
      <span className="text-sm">{label}</span>
    </Link>
  );
};

const NavbarBottom = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 py-2 z-50">
      {/* Wrapper isi navbar */}
      <div className="max-w-md mx-auto flex justify-around items-center">
        <NavItem to="/member" label="Beranda" />
        <NavItem to="/member/program" label="Program" />
        <NavItem to="/member/account" label="Akun" />
      </div>
    </nav>
  );
};

export default NavbarBottom;
