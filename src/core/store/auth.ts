// src/stores/auth.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "@/lib/api";
import { getZustandStorage } from "../store/mmkvStorage";

type AuthState = {
  token: string;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: "",
      loading: false,
      signin: async (email, password) => {
        set({ loading: true });
        const { accessToken } = await api.signin(email, password);
        set({ token: accessToken, loading: false });
      },
      signout: () => set({ token: "" }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => getZustandStorage()),
      partialize: (s) => ({ token: s.token }),
    }
  )
);
