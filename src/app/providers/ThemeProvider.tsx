import React, { createContext, useContext, PropsWithChildren } from "react";
import { lightTheme, Theme } from "../theme";

const ThemeCtx = createContext<Theme>(lightTheme);

export const useTheme = () => useContext(ThemeCtx);

// For now always light; later you can pick by useColorScheme()
export function ThemeProvider({ children }: PropsWithChildren) {
  return <ThemeCtx.Provider value={lightTheme}>{children}</ThemeCtx.Provider>;
}
