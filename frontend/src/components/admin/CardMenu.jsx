// src/components/admin/Card.jsx
import React from "react";

const CardMenu = ({ title, date }) => {
  return (
    <div className="bg-blue-100 p-4 rounded shadow">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-600">Tanggal: {date}</p>
    </div>
  );
};

export default CardMenu;
