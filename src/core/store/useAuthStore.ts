import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "@/shared/types";

type AuthState = {
  user: null | IUser;
  token: string | null;
  login: (user: IUser, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (user, token) => {
        set({ user, token });
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // key in AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
