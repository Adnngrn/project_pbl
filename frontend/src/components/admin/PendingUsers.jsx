import React, { useEffect, useState } from "react";
import { getUsers, approveUser, deleteUser } from "../../services/userService";
import Pagination from "../common/Pagination"; // sesuaikan path

const PendingUsers = ({ jml = 5 }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      const pending = res.data.filter((u) => u.status === "pending");
      setUsers(pending);
    } catch (err) {
      console.error("Gagal mengambil data users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveUser(id);
      alert("User berhasil di-approve");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal approve user");
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

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  // pagination logic
  const totalPages = Math.ceil(users.length / jml);
  const startIndex = (page - 1) * jml;
  const paginatedUsers = users.slice(startIndex, startIndex + jml);

  return (
    <section id="anggota" className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">User Pending Approval</h3>
      <table className="w-full border-collapse border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 p-2 text-left">No</th>
            <th className="border border-gray-200 p-2 text-left">Nama</th>
            <th className="border border-gray-200 p-2 text-left">Email</th>
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
                <td className="border border-gray-200 p-2">{user.email}</td>
                <td className="border border-gray-200 p-2">
                  <button
                    onClick={() => handleApprove(user._id)}
                    className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                Tidak ada user pending
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Reusable Pagination */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
};

export default PendingUsers;
