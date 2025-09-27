import api from "./api";

// Semua route ini hanya bisa diakses admin

export const getUsers = () => api.get("/users");
export const getUser = (id) => api.get(`/users/${id}`);
export const approveUser = (id) => api.put(`/users/${id}/approve`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const updateUserStatus = (id, status) => api.patch(`/users/${id}/status`, { status });
