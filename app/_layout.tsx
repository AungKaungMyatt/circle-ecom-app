import { Stack } from "expo-router";
import { ThemeProvider } from "@core/providers/ThemeProvider";
import { useAuth } from "@/core/store/auth";
import { useEffect } from "react";

export default function RootLayout() {

  const hydrate = useAuth((s) => s.hydrate);
  useEffect(() => { hydrate(); }, [hydrate]);
  
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
