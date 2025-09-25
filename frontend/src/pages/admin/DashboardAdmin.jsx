// src/pages/admin/DashboardAdmin.jsx
import React from "react";
import LayoutAdmin from "../../components/admin/LayoutAdmin";
import CardMenu from "../../components/admin/CardMenu";
import PendingUsers from "../../components/admin/PendingUsers";

const DashboardAdmin = () => {
  return (
    <LayoutAdmin>
      {/* Data Anggota */}
      <PendingUsers jml={5}/>   

      {/* Data Iuran */}
      <section id="iuran" className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Data Iuran</h3>
        <p className="text-gray-600">Daftar iuran anggota akan ditampilkan di sini.</p>
      </section>

      {/* Event */}
      <section id="event" className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Event / Program</h3>
        <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Tambah Event
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardMenu title="Bakti Sosial" date="12 Okt 2025" />
          <CardMenu title="Penggalangan Dana" date="20 Nov 2025" />
        </div>
      </section>
    </LayoutAdmin>
  );
};

export default DashboardAdmin;
