import { Stack } from "expo-router";
import { ThemeProvider } from "@core/providers/ThemeProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
