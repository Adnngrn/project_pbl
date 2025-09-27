// src/pages/admin/AddDonationProgram.jsx
import React, { useState } from "react";
import { createDonationProgram } from "../../services/donationProgramService";
import { useNavigate } from "react-router-dom";

const AddDonationProgram = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    targetAmount: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDonationProgram(form);
      alert("Program berhasil ditambahkan");
      navigate("/admin/donations");
    } catch (err) {
      alert("Gagal menambahkan program");
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Tambah Program Donasi</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Judul</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label>Deskripsi</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label>Target Donasi</label>
          <input
            name="targetAmount"
            type="number"
            value={form.targetAmount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default AddDonationProgram;
