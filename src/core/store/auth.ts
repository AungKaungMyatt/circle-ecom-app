import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "@/lib/api";
import { setAuthToken } from "@/lib/http";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
  token: string;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  hydrate: () => void;
  signout: () => void;
  setToken: (token: string) => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      token: "",
      loading: false,

      signin: async (email, password) => {
        set({ loading: true });
        const { accessToken } = await api.signin(email, password);
        set({ token: accessToken, loading: false });
        setAuthToken(accessToken);
      },

      hydrate: () => {
        const token = get().token;
        setAuthToken(token || null);
      },

      signout: () => {
        set({ token: "" });
        setAuthToken(null);
      },

      setToken: (token) => set({ token }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ token: s.token }),
      onRehydrateStorage: () => (state) => {
        // Run on app start so Axios has the token immediately
        const token = state?.token ?? "";
        setAuthToken(token || null);
      },
    }
  )
);
