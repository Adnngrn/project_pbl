import React, { useEffect, useState } from "react";
import LogoutMember from "../../components/auth/LogoutMember";
import { getUserProfile, updateUserProfile, changePassword } from "../../services/userService";

const AccountMember = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    handphone: "",
    address: "",
    gender: "",
    joined: "",
    password: "",
    confirmPassword: "",
    oldPassword: "",
  });

  const fetchUserData = async () => {
    try {
      const res = await getUserProfile();
      const user = res.data;

      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        handphone: user.handphone,
        address: user.address,
        gender: user.gender,
        joined: user.createdAt,
      }));
    } catch (err) {
      console.error("Gagal mengambil data user", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // kalau user isi password, validasi dulu
      if (formData.password) {
        if (formData.password !== formData.confirmPassword) {
          alert("Password baru dan konfirmasi tidak cocok!");
          return;
        }

        // ganti password
        await changePassword({
          currentPassword: formData.oldPassword,
          newPassword: formData.password,
        });
        alert("Password berhasil diganti!");
      }

      // update profil biasa
      const dataToUpdate = {
        name: formData.name,
        email: formData.email,
        handphone: formData.handphone,
        address: formData.address,
        gender: formData.gender,
      };

      await updateUserProfile(dataToUpdate);
      alert("Profil berhasil diperbarui!");
      setShowEdit(false);
      fetchUserData(); // refresh data
    } catch (err) {
      alert(err.response?.data?.message || "Gagal memperbarui profil");
    }
  };



  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-gray-800">Akun</h1>
      <p className="text-gray-600 text-sm mb-4">
        Kelola profil dan pengaturan akun Anda
      </p>

      {/* Card Info */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {formData.name}
        </h2>
        <div className="mt-3 space-y-2 text-gray-700 text-sm">
          <p>{formData.email}</p>
          <p>{formData.handphone}</p>
          <p>{formData.address}</p>
          <p>{formData.gender === "male" ? "Pria" : "Wanita"}</p>
          <p>
            Bergabung sejak{" "}
            {formData.joined &&
              new Date(formData.joined).toLocaleString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })}
          </p>

        </div>
      </div>

      {/* Edit Button */}
      <button
        onClick={() => setShowEdit(true)}
        className="w-full border rounded-lg py-2 mb-4 text-gray-700 hover:bg-gray-50"
      >
        ✏️ Edit Profil
      </button>

      {/* Logout */}
      <LogoutMember />

      {/* Modal Edit */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 max-w-md rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Edit Profil
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm"
                placeholder="Nama"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm"
                placeholder="Email"
              />
              <input
                type="text"
                name="handphone"
                value={formData.handphone}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm"
                placeholder="No. HP"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm"
                placeholder="Alamat"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm"
              >
                <option value="">-- Pilih Gender --</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>

              <hr className="my-3" />
              <p className="text-sm font-semibold">Ganti Password</p>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm"
                placeholder="Password Lama"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm"
                placeholder="Password Baru"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm"
                placeholder="Konfirmasi Password"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMember;
