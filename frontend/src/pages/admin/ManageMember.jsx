import React, { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  updateUserStatus,
} from "../../services/userService";
import Pagination from "../../components/common/Pagination";

const ManageMember = ({ jml = 10 }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      const approvedUsers = res.data.filter(
        (u) => u.status === "active" || u.status === "inactive"
      );
      setUsers(approvedUsers);
      setFilteredUsers(approvedUsers);
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

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.address?.toLowerCase().includes(keyword)
    );

    setFilteredUsers(filtered);
    setPage(1); // reset ke halaman pertama
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  const totalPages = Math.ceil(filteredUsers.length / jml);
  const startIndex = (page - 1) * jml;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + jml);

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Data Anggota</h3>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari nama, email, atau alamat..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-500"
        />
      </div>

      {/* Responsive Table */}
      <div className="w-auto overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 text-sm">
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
                  <td className="border border-gray-200 p-2 whitespace-nowrap">
                    {startIndex + index + 1}
                  </td>
                  <td className="border border-gray-200 p-2 whitespace-nowrap">{user.name}</td>
                  <td className="border border-gray-200 p-2 whitespace-nowrap">{user.gender}</td>
                  <td className="border border-gray-200 p-2 max-w-[160px] truncate">{user.address}</td>
                  <td className="border border-gray-200 p-2 whitespace-nowrap">{user.handphone}</td>
                  <td className="border border-gray-200 p-2 max-w-[200px] truncate">{user.email}</td>
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
                  <td className="border border-gray-200 p-2 space-y-1 md:space-x-2">
                    {user.role !== "admin" ? (
                      <>
                        <button
                          onClick={() => handleToggleStatus(user._id, user.status)}
                          className={`px-2 py-1 rounded text-white text-xs ${
                            user.status === "active"
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {user.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                        >
                          Hapus
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500 italic text-xs">Tidak bisa diubah</span>
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
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
};

export default ManageMember;
