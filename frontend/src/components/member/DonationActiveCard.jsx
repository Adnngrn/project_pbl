import React from "react";
import { useNavigate } from "react-router-dom";

const DonationActiveCard = ({
  _id, // ✅ id program
  title,
  description,
  collectedAmount = 0,
  targetAmount = 0,
  status,
}) => {
  const progress = targetAmount > 0 ? Math.min((collectedAmount / targetAmount) * 100, 100) : 0;
  const navigate = useNavigate();

  const handleDonate = () => {
    navigate(`/member/donasi/${_id}/form`); // arahkan ke page form
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 relative">
      {/* Status di kanan atas */}
      <span
        className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
          status === "open" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {status === "open" ? "Open" : "Closed"}
      </span>

      <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
        <span>Terkumpul</span>
        <span>Rp {Number(collectedAmount).toLocaleString()}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="bg-orange-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="text-sm text-gray-600">
        Target: Rp {Number(targetAmount).toLocaleString()}
      </div>

      {status === "open" && (
        <button
          onClick={handleDonate}
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Donasi Sekarang
        </button>
      )}
    </div>
  );
};

export default DonationActiveCard;
