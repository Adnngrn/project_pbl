import { useEffect, useState } from "react";
import { getEvents } from "../../services/eventService"; 
// import CardMenu from "./CardMenu"; 

const CardMenu = ({ title, status }) => {
  const statusColors = {
    ongoing: "bg-green-100 text-green-700",
    upcoming: "bg-yellow-100 text-yellow-700",
    finished: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-3">
      <span
        className={`w-max px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide 
          ${statusColors[status] || "bg-gray-200 text-gray-700"}`}
      >
        {status}
      </span>
      
      <h4 className="text-lg font-semibold text-gray-800 leading-snug">
        {title}
      </h4>
    </div>

  );
};

const AdminEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data); // sesuai response backend
    } catch (err) {
      console.error("Gagal fetch event:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <section id="event" className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Event / Program</h3>

      {/* tombol tambah event */}

      {loading ? (
        <p className="text-gray-500">Memuat data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.length > 0 ? (
            events.map((event) => (
              <CardMenu
                key={event._id}
                title={event.title}
                status={event.status} // status: ongoing, upcoming, finished
              />
            ))
          ) : (
            <p className="text-gray-500">Belum ada event.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default AdminEvent;
