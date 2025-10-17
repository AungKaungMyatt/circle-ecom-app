import { Appearance, ColorSchemeName } from "react-native";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import mmkvStorage from "./mmkvStorage";
import { lightTheme, darkTheme, type Theme } from "../../app/theme";

function getSmartStorage() {
  // Zustand's StateStorage shape
  type StateStorage = Parameters<
    typeof createJSONStorage
  >[0] extends () => infer S
    ? S
    : never;

  let backend: any;

  try {
    // dynamic require prevents crashes in Expo Go
    const { MMKV } = require("react-native-mmkv");
    const mmkv = new MMKV({ id: "APP_STORE" });
    backend = {
      setItem: (name: string, value: string) => mmkv.set(name, value),
      getItem: (name: string) => mmkv.getString(name) ?? null,
      removeItem: (name: string) => mmkv.delete(name),
    } as StateStorage;
  } catch {
    const AsyncStorage =
      require("@react-native-async-storage/async-storage").default;
    backend = {
      setItem: (name: string, value: string) =>
        AsyncStorage.setItem(name, value),
      getItem: (name: string) => AsyncStorage.getItem(name),
      removeItem: (name: string) => AsyncStorage.removeItem(name),
    } as StateStorage;
  }

  return backend;
}

export type ThemeMode = "light" | "dark" | "system";

type ThemeState = {
  // user-chosen mode
  mode: ThemeMode;
  // current OS scheme (used when mode === 'system')
  systemScheme: ColorSchemeName;

  // actions
  setMode: (mode: ThemeMode) => void;
  toggle: () => void; // quick light<->dark (ignores 'system')

  // derived helper: effective Theme tokens
  getTheme: () => Theme;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "light",
      systemScheme: Appearance.getColorScheme(),

      setMode: (mode) => set({ mode }),

      toggle: () => {
        const cur = get().mode;
        // if currently 'system', flip based on resolved value to be explicit next time
        const resolved = cur === "system" ? get().systemScheme ?? "light" : cur;
        set({ mode: resolved === "dark" ? "light" : "dark" });
      },

      getTheme: () => {
        const { mode, systemScheme } = get();
        const resolved = mode === "system" ? systemScheme ?? "light" : mode;
        return resolved === "dark" ? darkTheme : lightTheme;
      },
    }),
    {
      name: "theme-store",
      // () => mmkvStorage
      storage: createJSONStorage(getSmartStorage),
      // only persist what matters (mode). systemScheme comes from Appearance.
      partialize: (state) => ({ mode: state.mode }),
      version: 1,
    }
  )
);

/** Keep systemScheme in sync if the user flips OS theme while app is running */
Appearance.addChangeListener(({ colorScheme }) => {
  useThemeStore.setState({ systemScheme: colorScheme });
});
