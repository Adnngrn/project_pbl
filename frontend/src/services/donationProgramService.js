import api from "./api";

// CRUD untuk program donasi
export const getDonationPrograms = () => api.get("/donations/program");
export const getDonationProgramDetail = (id) => api.get(`/donations/program/${id}`); // <-- tambah ini
export const createDonationProgram = (data) => api.post("/donations/program", data);
export const updateDonationProgram = (id, data) => api.put(`/donations/program/${id}`, data);
export const deleteDonationProgram = (id) => api.delete(`/donations/program/${id}`);
