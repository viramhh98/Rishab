import api from "./axios";

export const loginUser = (data) => api.post("/auth/login", data);

export const registerMasterAdmin = (data) => api.post("/auth/register", data);

