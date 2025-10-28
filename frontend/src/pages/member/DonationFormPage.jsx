import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { submitDonation } from "../../services/donationService";
import { getDonationProgramDetail } from "../../services/donationProgramService";

const DonationFormPage = () => {
  const { id } = useParams(); //route param /donasi/:id/form
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);

  const [amount, setAmount] = useState("");
  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ambil detail program
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await getDonationProgramDetail(id);
        setProgram(res.data);
      } catch (err) {
        console.error("Gagal fetch program:", err);
      }
    };
    fetchProgram();
  }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || !proof) {
            setMessage("Nominal dan bukti wajib diisi");
            return;
        }

        const formData = new FormData();
        formData.append("programId", id);
        formData.append("amount", amount);
        formData.append("proof", proof);

        try {
            setLoading(true);
            await submitDonation(formData);

            // ✅ tampilkan alert
            alert("Donasi berhasil diajukan! Tunggu konfirmasi admin.");

            // ✅ redirect ke /member
            navigate("/member");
        } catch (err) {
            setMessage("Gagal mengirim donasi.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow p-6 rounded-lg">
      {/* Tombol kembali */}
      <button
        onClick={() => navigate("/member")}
        className="mb-4 text-sm text-orange-600 hover:underline"
      >
        ← Kembali ke Dashboard
      </button>

      {/* Card Program */}
      {program && (
        <>
        <div className="mb-6 border rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">
            {program.title}
          </h3>
          <p className="text-sm text-gray-600">{program.description}</p>
          <p className="mt-2 text-sm font-medium text-gray-700">
            Target: Rp {Number(program.targetAmount).toLocaleString()} | 
            Terkumpul: Rp {Number(program.collectedAmount || 0).toLocaleString()}
          </p>

        </div>
        <div className="mb-6 bg-white border rounded p-3">
          <h4 className="font-semibold text-gray-800 mb-1">Rekening Tujuan Donasi</h4>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Nomor Rekening:</span>{" "}
            {program.accountNumber || "Tidak tersedia"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Silakan transfer sesuai nominal donasi Anda, lalu upload bukti transfer di bawah ini.
          </p>
        </div>
        </>
      )}

      {/* Form Donasi */}
      <h2 className="text-xl font-bold mb-4">Form Donasi</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Nominal Donasi</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Upload Bukti</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProof(e.target.files[0])}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {message && <p className="text-sm text-gray-600 mb-2">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
        >
          {loading ? "Mengirim..." : "Kirim Donasi"}
        </button>
      </form>
    </div>
  );
};

export default DonationFormPage;
