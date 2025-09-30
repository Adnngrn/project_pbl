import React from "react";
import { HiOutlineCalendar } from "react-icons/hi"; // Gunakan ikon kalender serupa

const EmptyStateCard = ({ title, message }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 rounded-full p-4">
          <HiOutlineCalendar className="text-gray-500 text-3xl" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyStateCard;
