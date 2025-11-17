import { useAuthStore } from "@/core/store/useAuthStore";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { router } from "expo-router";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  "https://online-shop-production-3ed7.up.railway.app";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  validateStatus: (status) => status >= 200 && status < 400,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token; // get latest token from store
    if (token) {
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const data = error.response?.data as any;
    const message =
      data?.message || data?.error || error.message || "Request failed";

    // Handle 401: clear token and redirect to sign-in
    if (status === 401) {
      useAuthStore.getState().logout(); // clear token from store
      try {
        router.replace("/auth/signin");
      } catch {}
    }

    return Promise.reject(new Error(message));
  }
);
