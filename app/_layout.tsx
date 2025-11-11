import { Stack } from "expo-router";
import { ThemeProvider } from "@core/providers/ThemeProvider";
import { useAuth } from "@/core/store/auth";
import { useEffect } from "react";
import { AppQueryProvider } from "@/core/query/react-query";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const hydrate = useAuth((s) => s.hydrate);
  useEffect(() => { hydrate(); }, [hydrate]);

  const [fontsLoaded] = useFonts({
    PlayfairRegular: require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
    PlayfairMedium: require("../assets/fonts/PlayfairDisplay-Medium.ttf"),
    PlayfairSemiBold: require("../assets/fonts/PlayfairDisplay-SemiBold.ttf"),
    PlayfairBold: require("../assets/fonts/PlayfairDisplay-Bold.ttf"),
    PlayfairBlack: require("../assets/fonts/PlayfairDisplay-Black.ttf"),
  });

  // useEffect(() => {
  //   if (fontsLoaded) SplashScreen.hideAsync();
  // }, [fontsLoaded]);

  // if (!fontsLoaded) return null;
  
  return (
    <ThemeProvider>
      <AppQueryProvider>
      <Stack screenOptions={{ headerShown: false }} />
      </AppQueryProvider>
    </ThemeProvider>
  );
}
