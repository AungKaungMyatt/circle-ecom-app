import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getZustandStorage } from "../store/mmkvStorage";
import { Appearance } from "react-native";

// If you already have these in app/theme, use them:
import type { Theme } from "../theme";
import { lightTheme, darkTheme } from "../theme";

export type ThemeMode = "light" | "dark" | "system";

type ThemeState = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  getTheme: () => Theme;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "system",
      setMode: (m) => set({ mode: m }),
      getTheme: () => {
        const mode = get().mode;
        const sys = Appearance.getColorScheme() ?? "light";
        const effective: "light" | "dark" =
          mode === "system" ? (sys === "dark" ? "dark" : "light") : mode;

        return effective === "dark" ? darkTheme : lightTheme;
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => getZustandStorage() as any),
    }
  )
);
