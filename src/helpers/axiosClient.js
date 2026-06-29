import axios from "axios";
import { API_BASE_URL } from "../config/constants";
import { useAuthStore } from "../zustand/AuthUsers";
import { requestSessionAction } from "./sessionExpiredManager";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (
      (status === 401 || status === 403) &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest._skipAuthRefresh
    ) {
      originalRequest._retry = true;

      const action = await requestSessionAction();

      if (action === "stay") {
        try {
          const refreshToken = useAuthStore.getState().refreshToken;

          const response = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            { refreshToken }
          );

          const {
            user,
            token,
            refreshToken: newRefreshToken,
          } = response.data;

          useAuthStore.getState().setSession({
            user,
            token,
            refreshToken: newRefreshToken,
          });

          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${token}`;

          return api(originalRequest);
        } catch (refreshError) {
          useAuthStore.getState().logout();
          window.location.href = "/signin";
          return Promise.reject(refreshError);
        }
      }

      useAuthStore.getState().logout();
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);

export default api;
