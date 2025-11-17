import { Stack } from 'expo-router'
import { AppQueryProvider } from '@/core/query/react-query'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlayfairRegular: require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
    PlayfairMedium: require('../assets/fonts/PlayfairDisplay-Medium.ttf'),
    PlayfairSemiBold: require('../assets/fonts/PlayfairDisplay-SemiBold.ttf'),
    PlayfairBold: require('../assets/fonts/PlayfairDisplay-Bold.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <AppQueryProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AppQueryProvider>
  )
}
