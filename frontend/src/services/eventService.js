import api from "./api"; // axios instance

// Ambil semua event
export const getEvents = () => api.get("/events");

// Ambil 1 event by id
export const getEventById = (id) => api.get(`/events/${id}`);

// Tambah event (hanya admin)
export const createEvent = (data) => api.post("/events", data);

// Update event (hanya admin)
export const updateEvent = (id, data) => api.put(`/events/${id}`, data);

// Hapus event (hanya admin)
export const deleteEvent = (id) => api.delete(`/events/${id}`);
