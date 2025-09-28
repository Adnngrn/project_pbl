import React, { useEffect, useState } from "react";
import DonationActiveCard from "../../components/member/DonationActiveCard";
import EventCard from "../../components/member/EventCard";
import { getDonationPrograms } from "../../services/donationProgramService";
import { getEvents } from "../../services/eventService";

const ProgramMember = () => {
  const [donasiProgram, setDonasiProgram] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("donasi");

  useEffect(() => {
    // Ambil semua program donasi
    const fetchPrograms = async () => {
      try {
        const res = await getDonationPrograms();
        const mapped = res.data.map((p) => ({
          _id: p._id,
          category: "Donasi",
          title: p.title,
          description: p.description,
          collectedAmount: p.collectedAmount || 0,
          targetAmount: p.targetAmount || 0,
          status: p.status,
        }));
        setDonasiProgram(mapped);
      } catch (err) {
        console.error("Gagal fetch program donasi:", err);
      }
    };

    // Ambil semua event
    const fetchEvents = async () => {
      try {
        const res = await getEvents();
        const mapped = res.data.map((e) => ({
          _id: e._id,
          title: e.title,
          description: e.description,
          startDate: new Date(e.startDate).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          endDate: new Date(e.endDate).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          status: e.status,
          category: e.category,
        }));
        setEvents(mapped);
      } catch (err) {
        console.error("Gagal fetch event:", err);
      }
    };

    fetchPrograms();
    fetchEvents();
  }, []);

  return (
    <div className="pb-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mt-4">Program</h1>
      <p className="text-gray-600 text-sm mb-4">
        Temukan berbagai program donasi dan kegiatan sosial
      </p>

      {/* Tab */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6 max-w-sm">
        <button
          onClick={() => setActiveTab("event")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${
            activeTab === "event"
              ? "bg-white shadow text-yellow-600"
              : "text-gray-500"
          }`}
        >
          Event
        </button>
        <button
          onClick={() => setActiveTab("donasi")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${
            activeTab === "donasi"
              ? "bg-white shadow text-yellow-600"
              : "text-gray-500"
          }`}
        >
          Donasi
        </button>
      </div>

      {/* Content */}
      {activeTab === "event" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((item) => <EventCard key={item._id} {...item} />)
          ) : (
            <p className="text-gray-500">Belum ada event</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donasiProgram.length > 0 ? (
            donasiProgram.map((item) => (
              <DonationActiveCard key={item._id} {...item} />
            ))
          ) : (
            <p className="text-gray-500">Belum ada program donasi</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgramMember;
