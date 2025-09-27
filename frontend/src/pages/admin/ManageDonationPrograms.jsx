import React, { useEffect, useState } from "react";
import {
  getDonationPrograms,
  deleteDonationProgram,
} from "../../services/donationProgramService";
import { Link } from "react-router-dom";

const ManageDonationPrograms = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await getDonationPrograms();
        setPrograms(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrograms();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus program ini?")) return;
    try {
      await deleteDonationProgram(id);
      setPrograms(programs.filter((p) => p._id !== id));
    } catch (err) {
      alert("Gagal menghapus program");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Kelola Program Donasi</h2>
        <Link
          to="/admin/donations/add"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Tambah Program
        </Link>
      </div>

      <table className="w-full text-sm border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2 text-left">Judul</th>
            <th className="border border-gray-300 p-2 text-left">Target</th>
            <th className="border border-gray-300 p-2 text-left">Aksi</th>
          </tr>
        </thead>
            <tbody className="divide-y divide-gray-200">
            {programs.map((program) => (
                <tr key={program._id}>
                <td className="border border-gray-300 p-2">{program.title}</td>
                <td className="border border-gray-300 p-2">
                    Rp {program.targetAmount.toLocaleString("id-ID")}
                </td>

                <td className="border border-gray-300 p-2 space-x-2">
                    <Link
                    to={`/admin/donations/${program._id}`}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                    Detail
                    </Link>
                    <button
                    onClick={() => handleDelete(program._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                    Hapus
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
      </table>
    </div>
  );
};

export default ManageDonationPrograms;
