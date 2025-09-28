import React from "react";

const EventCard = ({ title, description, startDate, endDate, status }) => {
  // Mapping status agar lebih user-friendly
  const getStatusLabel = (status) => {
    if (status === "ongoing") return "Berlangsung";
    if (status === "upcoming") return "Akan Datang";
    if (status === "finished") return "Berakhir";
    return status;
  };

  const getStatusColor = (status) => {
    if (status === "ongoing") return "bg-green-100 text-green-700";
    if (status === "upcoming") return "bg-blue-100 text-blue-700";
    if (status === "finished") return "bg-gray-200 text-gray-600";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 relative">
      {/* Status */}
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
          status
        )}`}
      >
        {getStatusLabel(status)}
      </span>

      <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm mb-3">{description}</p>

      {/* Tanggal Event */}
      <div className="text-sm text-gray-700 space-y-1">
        <p>
          Mulai:{" "}
          <span className="font-medium">
            {startDate}
          </span>
        </p>
        <p>
          Berakhir:{" "}
          <span className="font-medium">
            {endDate}
          </span>
        </p>
      </div>
    </div>
  );
};

export default EventCard;
