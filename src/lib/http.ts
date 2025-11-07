import axios from "axios";
import { router } from "expo-router";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  "https://online-shop-production-db95.up.railway.app";

let AUTH_TOKEN: string | null = null;
export function setAuthToken(token: string | null) {
  AUTH_TOKEN = token;
}

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  // Accept only 2xx/3xx; others go to the response interceptor as errors.
  validateStatus: (status) => status >= 200 && status < 400,
});

// REQUEST: attach Authorization if we have a token
http.interceptors.request.use((config) => {
  if (AUTH_TOKEN) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${AUTH_TOKEN}`;
  }
  // Force JSON
  (config.headers as any)["Content-Type"] = "application/json";
  return config;
});

// RESPONSE: normalize errors + handle 401
http.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err?.response?.status;
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Request failed";

    // If unauthorized, clear token and send to sign-in
    if (status === 401) {
      // Optional: you could show a toast here
      try {
        // soft redirect; don’t throw another error if already on auth
        router.replace("/auth/signin");
      } catch {}
    }

    // Reject with a clean Error object
    return Promise.reject(new Error(message));
  }
);
