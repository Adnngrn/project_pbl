import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents, createEvent } from "../../services/eventService";

// Warna status
const statusColors = {
  ongoing: "bg-green-100 text-green-700",
  upcoming: "bg-yellow-100 text-yellow-700",
  finished: "bg-red-100 text-red-700",
};

// Kartu event
const CardMenu = ({ event, onClick }) => {
  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-3 cursor-pointer hover:shadow-lg transition"
      onClick={() => onClick(event._id)}
    >
      <span
        className={`w-max px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide 
        ${statusColors[event.status] || "bg-gray-200 text-gray-700"}`}
      >
        {event.status}
      </span>
      <h4 className="text-lg font-semibold text-gray-800 leading-snug">
        {event.title}
      </h4>
    </div>
  );
};

// Modal tambah event
const AddEventModal = ({ visible, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "upcoming",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
    onClose();
    // reset form
    setForm({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "upcoming",
      category: "",
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Tambah Event Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Judul</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Deskripsi</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Tanggal Mulai</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Tanggal Selesai</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="finished">Finished</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Kategori</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Pilih Kategori --</option>
              <option value="sosial">Sosial</option>
              <option value="edukasi">Edukasi</option>
              <option value="lingkungan">Lingkungan</option>
              <option value="pelatihan">Pelatihan</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Halaman Admin - Daftar Event
const ManageEventAdmin = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await getEvents();
      setEvents(res.data);
    } catch (err) {
      console.error("Gagal fetch event:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (newEvent) => {
    try {
      await createEvent(newEvent);
      fetchEvents();
    } catch (err) {
      console.error("Gagal tambah event:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Kelola Event / Program</h3>

      {/* Tombol tambah */}
      <button
        onClick={() => setModalVisible(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-600"
      >
        Tambah Event
      </button>

      {/* Modal tambah event */}
      <AddEventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddEvent}
      />

      {/* List event */}
      {loading ? (
        <p className="text-gray-500">Memuat data...</p>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <CardMenu
              key={event._id}
              event={event}
              onClick={(id) => navigate(`/admin/events/${id}`)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Belum ada event.</p>
      )}
    </section>
  );
};

export default ManageEventAdmin;
