// src/layouts/LayoutMember.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavbarMember from "./NavbarBottom";

const LayoutMember = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      {/* Wrapper konten dengan responsive width */}
      <div className="w-full max-w-5xl mx-auto min-h-screen flex flex-col bg-white">
        <div className="pb-20 px-4 md:px-8">
          <Outlet />
        </div>
        <NavbarMember />
      </div>
    </div>
  );
};

export default LayoutMember;
