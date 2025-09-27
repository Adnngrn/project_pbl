// src/pages/admin/DonationProgramDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDonationProgramDetail,
  updateDonationProgram,
} from "../../services/donationProgramService";
import {
  approveDonation,
  rejectDonation,
} from "../../services/donationService";

const DonationProgramDetail = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  // state untuk modal edit
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: 0,
    status: "open",
  });

  // state untuk modal detail donasi
  const [selectedDonation, setSelectedDonation] = useState(null);

  const fetchProgram = async () => {
    try {
      const res = await getDonationProgramDetail(id);
      setProgram(res.data);
      // isi formData awal
      setFormData({
        title: res.data.title,
        description: res.data.description,
        targetAmount: res.data.targetAmount,
        status: res.data.status,
      });
    } catch (err) {
      console.error("Gagal fetch detail program:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgram();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await updateDonationProgram(id, formData);
      await fetchProgram(); // refresh data
      setIsEditing(false);
    } catch (err) {
      console.error("Gagal update program:", err);
    }
  };

  const handleApprove = async (donationId) => {
    try {
      await approveDonation(donationId);
      await fetchProgram();
    } catch (err) {
      console.error("Gagal approve donasi:", err);
    }
  };

  const handleReject = async (donationId) => {
    try {
      await rejectDonation(donationId);
      await fetchProgram();
    } catch (err) {
      console.error("Gagal reject donasi:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!program) return <p>Program tidak ditemukan.</p>;

  return (
    <div className="p-6 bg-white rounded shadow">
      {/* === Header & Tombol Edit === */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{program.title}</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Program
        </button>
      </div>

      <p className="mb-4 text-gray-700">{program.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p>
            <strong>Target:</strong> Rp{" "}
            {program.targetAmount?.toLocaleString("id-ID") || 0}
          </p>
          <p>
            <strong>Terkumpul:</strong> Rp{" "}
            {program.collectedAmount?.toLocaleString("id-ID") || 0}
          </p>
        </div>
        <div>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                program.status === "open"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {program.status}
            </span>
          </p>
          <p>
            <strong>Dibuat:</strong>{" "}
            {new Date(program.createdAt).toLocaleDateString("id-ID")}
          </p>
        </div>
      </div>

      {/* === Donasi yang Disetujui === */}
      <h3 className="text-lg font-semibold mt-6 mb-2">
        Donasi yang Disetujui
      </h3>
      {program.approvedDonations?.length > 0 ? (
        <table className="w-full border text-sm mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Nama</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Jumlah</th>
              <th className="border border-gray-300 p-2">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {program.approvedDonations.map((donor, idx) => (
              <tr key={idx}>
                <td className="border border-gray-300 p-2">{donor.name}</td>
                <td className="border border-gray-300 p-2">{donor.email}</td>
                <td className="border border-gray-300 p-2">
                  Rp {donor.amount.toLocaleString("id-ID")}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(donor.date).toLocaleDateString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Belum ada donasi yang disetujui.</p>
      )}

      {/* === Donasi Menunggu Persetujuan === */}
      <h3 className="text-lg font-semibold mt-6 mb-2">
        Donasi Menunggu Persetujuan
      </h3>
      {program.pendingDonations?.length > 0 ? (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Nama</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Jumlah</th>
              <th className="border border-gray-300 p-2">Tanggal</th>
              <th className="border border-gray-300 p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {program.pendingDonations.map((donor, idx) => (
              <tr key={idx}>
                <td className="border border-gray-300 p-2">{donor.name}</td>
                <td className="border border-gray-300 p-2">{donor.email}</td>
                <td className="border border-gray-300 p-2">
                  Rp {donor.amount.toLocaleString("id-ID")}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(donor.date).toLocaleDateString("id-ID")}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => setSelectedDonation(donor)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => handleApprove(donor._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(donor._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">
          Tidak ada donasi yang menunggu persetujuan.
        </p>
      )}

      {/* === Modal Edit Program === */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Program</h3>
            <div className="mb-3">
              <label className="block text-sm font-medium">Judul</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium">Deskripsi</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium">Target</label>
              <input
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}


      {/* === Modal Detail Donasi === */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-[500px]">
            <h3 className="text-xl font-bold mb-4">Detail Donasi</h3>
            <p>
              <strong>Nama:</strong> {selectedDonation.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedDonation.email}
            </p>
            <p>
              <strong>Jumlah:</strong> Rp{" "}
              {selectedDonation.amount.toLocaleString("id-ID")}
            </p>
            <p>
              <strong>Tanggal:</strong>{" "}
              {new Date(selectedDonation.date).toLocaleDateString("id-ID")}
              {console.log("proof:", selectedDonation.proof)}

            </p>

            <div className="mt-4">
                <p className="font-semibold mb-2">Bukti Transfer:</p>
                <img
                    src={`${import.meta.env.VITE_UPLOAD_URL}/uploads/${selectedDonation.proof}`}

                    alt="Bukti transfer"
                    className="max-h-80 w-full object-contain border rounded"
                />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setSelectedDonation(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationProgramDetail;
