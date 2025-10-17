import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useSyncExternalStore,
} from "react";
import type { Theme } from "../theme";
import { useThemeStore } from "../store/useThemeStore";

const ThemeCtx = createContext<Theme | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export function ThemeProvider({ children }: PropsWithChildren) {
  // subscribe to Zustand with minimal re-renders
  const subscribe = useThemeStore.subscribe;
  const theme = useSyncExternalStore(
    (cb) => subscribe(cb),
    () => useThemeStore.getState().getTheme(),
    () => useThemeStore.getState().getTheme()
  );

  return <ThemeCtx.Provider value={theme}>{children}</ThemeCtx.Provider>;
}
