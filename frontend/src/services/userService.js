import api from "./api";

// === Untuk member mengelola akunnya sendiri ===

export const getUserProfile = () => api.get("/profile");

export const updateUserProfile = (data) => api.patch("/profile", data);

export const changePassword = ({ currentPassword, newPassword }) =>
  api.patch("/profile/password", { currentPassword, newPassword });


// === Untuk admin mengelola semua user ===

export const getUsers = () => api.get("/users");
export const getUser = (id) => api.get(`/users/${id}`);
export const approveUser = (id) => api.put(`/users/${id}/approve`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const updateUserStatus = (id, status) =>
  api.patch(`/users/${id}/status`, { status });
