import React, { useEffect, useState } from "react";
import DonationStatusCard from "../../components/member/DonationStatusCard";
import DonationActiveCard from "../../components/member/DonationActiveCard";
import EventCard from "../../components/member/EventCard";
import { getDonations } from "../../services/donationService";
import { getDonationPrograms } from "../../services/donationProgramService";
import { getEvents } from "../../services/eventService";

const DashboardMember = () => {
  const [statusDonasi, setStatusDonasi] = useState([]);
  const [donasiAktif, setDonasiAktif] = useState([]);
  const [eventBerlangsung, setEventBerlangsung] = useState([]);

  useEffect(() => {
    // Donasi user
    const fetchDonations = async () => {
      try {
        const res = await getDonations();
        const mapped = res.data.map((d) => ({
          title: d.program?.title || "Tanpa Program",
          amount: d.amount,
          date: new Date(d.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          status:
            d.status === "pending"
              ? "Pending"
              : d.status === "approved"
              ? "Disetujui"
              : "Ditolak",
        }));
        setStatusDonasi(mapped);
      } catch (err) {
        console.error("Gagal fetch donasi:", err);
      }
    };

    // Program donasi aktif
    const fetchPrograms = async () => {
      try {
        const res = await getDonationPrograms();
        const mapped = res.data
          .filter((p) => p.status === "open")
          .map((p) => ({
            _id: p._id,
            category: "Donasi",
            title: p.title,
            description: p.description,
            collectedAmount: p.collectedAmount || 0,
            targetAmount: p.targetAmount || 0,
            status: p.status,
          }));
        setDonasiAktif(mapped);
      } catch (err) {
        console.error("Gagal fetch program:", err);
      }
    };

    // Event yang sedang berlangsung
    const fetchEvents = async () => {
      try {
        const res = await getEvents();
        const mapped = res.data
          .filter((e) => e.status === "ongoing")
          .map((e) => ({
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
        setEventBerlangsung(mapped);
      } catch (err) {
        console.error("Gagal fetch event:", err);
      }
    };

    fetchDonations();
    fetchPrograms();
    fetchEvents();
  }, []);

  return (
    <div className="pb-20 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mt-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Selamat Datang
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Mari bersama-sama berbuat kebaikan untuk sesama
        </p>
      </div>

      {/* Status Donasi */}
      <h2 className="font-semibold text-amber-600 mb-3 flex items-center gap-2">
        {/* <span className="text-yellow-500">♡</span>  */}
        Status Donasi Anda
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {statusDonasi.length > 0 ? (
          statusDonasi.map((item, idx) => (
            <DonationStatusCard key={idx} {...item} />
          ))
        ) : (
          <p className="text-gray-500">Tidak ada aktifitas anda</p>
        )}
      </div>

      {/* Donasi Aktif */}
      <h2 className="font-semibold text-amber-600 mt-8 mb-3 flex items-center gap-2">
        {/* <span className="text-yellow-500">♡</span> */}
         Donasi Aktif
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {donasiAktif.length > 0 ? (
          donasiAktif.map((item, idx) => (
            <DonationActiveCard key={idx} {...item} />
          ))
        ) : (
          <p className="text-gray-500">Belum ada program donasi yang aktif</p>
        )}
      </div>

      {/* Event Berlangsung */}
      <h2 className="font-semibold text-amber-600 mt-8 mb-3 flex items-center gap-2">
        {/* <span className="text-yellow-500">📅</span>  */}
        Event
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventBerlangsung.length > 0 ? (
          eventBerlangsung.map((item, idx) => (
            <EventCard key={idx} {...item} />
          ))
        ) : (
          <p className="text-gray-500">Belum ada event</p>
        )}
      </div>
    </div>
  );
};

export default DashboardMember;
