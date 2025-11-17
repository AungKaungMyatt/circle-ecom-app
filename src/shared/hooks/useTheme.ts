import { useColorScheme } from 'react-native'
import { useThemeStore } from '@/core/store/useThemeStore'
import { makeTheme } from '@/core/theme'
import type { Theme, ThemeMode } from '@/core/theme'

export type ThemeHookReturn = {
  theme: Theme
  mode: ThemeMode
  toggleTheme: () => void
}

export const useTheme = (): ThemeHookReturn => {
  const systemScheme = useColorScheme() // "light" | "dark" | null
  const { preference, toggle } = useThemeStore()

  // Determine current mode
  const mode: ThemeMode =
    preference === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : preference

  // Get theme object
  const theme = makeTheme(mode)

  // Expose toggle function from store
  const toggleTheme = toggle

  return { theme, mode, toggleTheme }
}
