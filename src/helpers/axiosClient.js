import axios from "axios";
import { API_BASE_URL } from "../config/constants";
import { useAuthStore } from "../zustand/AuthUsers"

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor: agrega token automáticamente
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;





