import api from "./api";

// Register
export const register = (data) => api.post("/auth/register", data);

// Login
export const login = (data) => api.post("/auth/login", data);
