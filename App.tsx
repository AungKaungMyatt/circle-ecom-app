import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "./src/app/providers/ThemeProvider";
import OnboardingScreen from "./src/features/screens/OnboardingScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <OnboardingScreen />
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
