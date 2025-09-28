import React from "react";

const DonationStatusCard = ({ title, amount, date, status}) => {
  const statusColor =
    status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : status === "Disetujui"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="rounded-lg shadow-md bg-white border p-4 flex justify-between items-start">
  {/* Kiri: Judul dan Tanggal */}
  <div>
    <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
    <p className="text-gray-500 text-sm">{date}</p>
  </div>

  {/* Kanan: Status & Jumlah */}
  <div className="text-right relative">
    {/* Status Badge */}
    <span
      className={`absolute -top-2 right-0 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
    >
      {status}
    </span>

    {/* Harga */}
    <p className="text-gray-800 font-semibold text-base mt-5">
      Rp {amount.toLocaleString("id-ID")}
    </p>
  </div>
</div>


  );
};

export default DonationStatusCard;
