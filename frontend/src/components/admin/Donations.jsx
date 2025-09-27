import { useEffect, useState } from "react";
import { getDonations } from "../../services/donationService";

export default function Donations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await getDonations();
        setDonations(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDonations();
  }, []);

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Data Donasi</h3>
      {donations.length === 0 ? (
        <p className="text-gray-600">Belum ada data donasi.</p>
      ) : (
        <ul>
          {donations.map((d) => (
            <li key={d._id}>
              {d.user?.name} - Rp {d.amount.toLocaleString("id-ID")} ({d.status})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
