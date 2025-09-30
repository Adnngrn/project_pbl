import React, { useState, useEffect } from "react";
import { getEvents } from "../../services/eventService";
import { getDonationPrograms } from "../../services/donationProgramService"; // service API donasi
import EmptyStateCard from "../EmptyStateCard";

// mapping warna status event
const statusColors = {
  upcoming: "text-yellow-500 border-yellow-500",
  ongoing: "text-green-500 border-green-500",
  finished: "text-red-500 border-red-500",
};

// card untuk event
const EventCard = ({ category, status, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:-translate-y-1 hover:shadow-lg transition duration-200 cursor-default">
      <div className="flex items-center justify-between mb-4">
        <span className="bg-amber-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
        <span
          className={`${statusColors[status] || "text-gray-400 border-gray-400"} text-xs border font-semibold px-3 py-1 rounded-full capitalize`}
        >
          {status}
        </span>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm md:text-lg">{description}</p>
    </div>
  );
};

// card untuk donasi
const DonationCard = ({ title, description, collected, target }) => {
  const percentage = Math.min((collected / target) * 100, 100);

  return (
    <div className="w-full md:w-[50%] bg-white/50 backdrop-blur-md rounded-xl shadow-md p-6">
      <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-sm md:text-lg text-gray-700 mb-4">{description}</p>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex justify-between text-sm md:text-md text-gray-600 mb-1">
          <span>Terkumpul: Rp{collected.toLocaleString()}</span>
          <span>Target: Rp{target.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-amber-500 h-2 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Button */}
      <a href="/login" className="inline-block bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 transition text-center w-full">
  Donasi Sekarang
</a>

    </div>
  );
};

const Event = () => {
  const [events, setEvents] = useState([]);
  const [donations, setDonations] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const limit = 4;

  // fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  // fetch donations
  useEffect(() => {
    const fetchDonations = async () => {
        try {
        const { data } = await getDonationPrograms();
        console.log("Donation Programs:", data); // cek struktur
        setDonations(data);
        } catch (err) {
        console.error("Error fetching donation programs:", err);
        }
    };
    fetchDonations();
    }, []);

  const displayedEvents = showAll ? events : events.slice(0, limit);
  const activeDonations = donations.filter((donasi) => donasi.status === "open");


  return (
    <section className="py-6 md:py-12 bg-gradient-to-b from-white via-gray-200 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Events */}
        <h2 className="text-3xl md:text-5xl font-bold py-12 text-amber-500">
          Program Kami
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {displayedEvents.length > 0 ? (
            displayedEvents.map((event) => (
              <EventCard
                key={event._id}
                category={event.category}
                status={event.status}
                title={event.title}
                description={event.description}
              />
            ))
          ) : (
            <EmptyStateCard title={'Tidak Ada Program Event'} message={'Program Event baru akan ditampilkan di sini ketika tersedia.'}/>
          )}
        </div>


        {events.length > limit && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-4 py-2 text-xl cursor-pointer text-amber-600 rounded-lg hover:font-semibold transition"
            >
              {showAll ? "Lihat lebih sedikit" : "Lihat lebih banyak"}
            </button>
          </div>
        )}
      </div>

      {/* Section Donasi */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-600 mb-10">
          Program Donasi Aktif
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {activeDonations.length > 0 ? (
            activeDonations.map((donasi) => (
              <DonationCard
                key={donasi._id}
                title={donasi.title}
                description={donasi.description}
                collected={donasi.collectedAmount}
                target={donasi.targetAmount}
              />
            ))
          ) : (
            <EmptyStateCard
              title="Tidak Ada Program Donasi Aktif"
              message="Saat ini tidak ada program donasi yang sedang berlangsung. Program baru akan ditampilkan di sini ketika tersedia."
            />
          )}
        </div>


      </div>
    </section>
  );
};

export default Event;
