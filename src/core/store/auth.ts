import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "@/lib/api";
import { getZustandStorage } from "@/core/store/mmkvStorage";
import { setAuthToken } from "@/lib/http";

type AuthState = {
  token: string;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  hydrate: () => void;
  signout: () => void;
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
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => getZustandStorage()),
      partialize: (s) => ({ token: s.token }),
      onRehydrateStorage: () => (state) => {
        // Run on app start so Axios has the token immediately
        const token = state?.token ?? "";
        setAuthToken(token || null);
      },
    }
  )
);