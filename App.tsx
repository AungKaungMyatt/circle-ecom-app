import React from "react";
import { ThemeProvider } from "./src/app/providers/ThemeProvider";
import OnboardingScreen from "./src/features/screens/OnboardingScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <OnboardingScreen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
