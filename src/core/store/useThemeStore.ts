import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ThemePreference, Theme, ThemeMode } from "../theme/types";
import { makeTheme } from "../theme/index";
import { getZustandStorage } from "./mmkvStorage"; // your existing wrapper

type ThemeState = {
  preference: ThemePreference;         // "light" | "dark" | "system"
  setPreference: (p: ThemePreference) => void;
  toggle: () => void;
  // derived getter used by ThemeProvider
  getTheme: (systemMode?: ThemeMode) => Theme;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      preference: "system",
      setPreference: (p) => set({ preference: p }),
      toggle: () => {
        const cur = get().preference;
        set({ preference: cur === "dark" ? "light" : "dark" });
      },
      getTheme: (systemMode = "light") => {
        const pref = get().preference;
        const mode: ThemeMode = pref === "system" ? systemMode : pref;
        return makeTheme(mode);
      },
    }),
    {
      name: "theme-pref",
      storage: createJSONStorage(getZustandStorage),
      version: 1,
    }
  )
);
