import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Define getSurgeons API
export const getSurgeons = () => api.get("/api/surgeon/get-surgeons");

export default api;

