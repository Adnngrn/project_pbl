import api from "./api";

// Hanya admin yang bisa akses (karena pakai authorize(['admin']))
export const getDonations = () => api.get("/donations");
export const approveDonation = (id) => api.put(`/donations/${id}/approve`);
export const rejectDonation = (id) => api.put(`/donations/${id}/reject`);

// Kalau user juga boleh submit donasi
export const submitDonation = (data) => api.post("/donations", data);
