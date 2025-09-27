// src/pages/admin/ManageMember.jsx
import React, { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  updateUserStatus, // 👈 tambahkan ini
} from "../../services/userService";
import Pagination from "../../components/common/Pagination";

const ManageMember = ({ jml = 10 }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      const approvedUsers = res.data.filter(
        (u) => u.status === "active" || u.status === "inactive"
      );
      setUsers(approvedUsers);
    } catch (err) {
      console.error("Gagal mengambil data users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus user ini?")) return;
    try {
      await deleteUser(id);
      alert("User berhasil dihapus");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal hapus user");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateUserStatus(id, newStatus);
      alert(`Status berhasil diubah menjadi ${newStatus}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Gagal mengubah status");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  // pagination logic
  const totalPages = Math.ceil(users.length / jml);
  const startIndex = (page - 1) * jml;
  const paginatedUsers = users.slice(startIndex, startIndex + jml);

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Data Anggota</h3>
      <table className="w-full border-collapse border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 p-2 text-left">No</th>
            <th className="border border-gray-200 p-2 text-left">Nama</th>
            <th className="border border-gray-200 p-2 text-left">Gender</th>
            <th className="border border-gray-200 p-2 text-left">Alamat</th>
            <th className="border border-gray-200 p-2 text-left">No. HP</th>
            <th className="border border-gray-200 p-2 text-left">Email</th>
            <th className="border border-gray-200 p-2 text-left">Role</th>
            <th className="border border-gray-200 p-2 text-left">Status</th>
            <th className="border border-gray-200 p-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user, index) => (
              <tr key={user._id}>
                <td className="border border-gray-200 p-2">
                  {startIndex + index + 1}
                </td>
                <td className="border border-gray-200 p-2">{user.name}</td>
                <td className="border border-gray-200 p-2">{user.gender}</td>
                <td className="border border-gray-200 p-2">{user.address}</td>
                <td className="border border-gray-200 p-2">{user.handphone}</td>
                <td className="border border-gray-200 p-2">{user.email}</td>
                <td className="border border-gray-200 p-2">{user.role}</td>
                <td className="border border-gray-200 p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="border border-gray-200 p-2 space-x-2">
                    {user.role !== "admin" ? (
                        <>
                        <button
                            onClick={() => handleToggleStatus(user._id, user.status)}
                            className={`px-2 py-1 rounded text-white ${
                            user.status === "active"
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                        >
                            {user.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                        </button>
                        <button
                            onClick={() => handleDelete(user._id)}
                            className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                        >
                            Hapus
                        </button>
                        </>
                    ) : (
                        <span className="text-gray-500 italic">Tidak bisa diubah</span>
                    )}
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center p-4">
                Tidak ada anggota ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
};

export default ManageMember;
