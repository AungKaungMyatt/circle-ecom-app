import React, { createContext, useContext, PropsWithChildren, useMemo } from "react";
import { useColorScheme } from "react-native";
import type { Theme } from "../theme/types";
import { makeTheme } from "../theme/index";
import { useThemeStore } from "../store/useThemeStore";

const ThemeCtx = createContext<Theme | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export function ThemeProvider({ children }: PropsWithChildren) {
  const scheme = useColorScheme(); // "light" | "dark" | null
  const pref = useThemeStore((s) => s.preference);

  const mode = useMemo<"light" | "dark">(
    () => (pref === "system" ? (scheme === "dark" ? "dark" : "light") : pref),
    [pref, scheme]
  );

  const theme = useMemo(() => makeTheme(mode), [mode]);

  return <ThemeCtx.Provider value={theme}>{children}</ThemeCtx.Provider>;
}
