import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getEventById,
  updateEvent,
  deleteEvent,
} from "../../services/eventService";

const EventDetailAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "upcoming",
    category: "",
  });

  const fetchEvent = async () => {
    try {
      const res = await getEventById(id);
      const data = res.data;

      setEvent(data);
      setForm({
        title: data.title,
        description: data.description,
        startDate: data.startDate?.slice(0, 10),
        endDate: data.endDate?.slice(0, 10),
        status: data.status,
        category: data.category,
      });
    } catch (err) {
      console.error("Gagal ambil event:", err);
    }
  };

  const handleDelete = async () => {
    if (confirm("Yakin ingin menghapus event ini?")) {
      try {
        await deleteEvent(id);
        navigate("/admin/events");
      } catch (err) {
        console.error("Gagal hapus:", err);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(id, form);
      setEditing(false);
      fetchEvent(); // refresh detail
    } catch (err) {
      console.error("Gagal update:", err);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (!event) return <p>Memuat data...</p>;

  return (
    <section className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Detail Event</h2>

      {editing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block">Judul</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block">Deskripsi</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block">Tanggal Mulai</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block">Tanggal Selesai</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) =>
                  setForm({ ...form, endDate: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
          <div>
            <label className="block">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="finished">Finished</option>
            </select>
          </div>
          <div>
            <label className="block">Kategori</label>
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <p><strong>Judul:</strong> {event.title}</p>
          <p><strong>Deskripsi:</strong> {event.description}</p>
          <p><strong>Status:</strong> {event.status}</p>
          <p><strong>Tanggal:</strong> {event.startDate?.slice(0, 10)} - {event.endDate?.slice(0, 10)}</p>
          <p><strong>Kategori:</strong> {event.category}</p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Hapus
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventDetailAdmin;
