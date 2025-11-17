import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { useTheme } from '@/shared/hooks/useTheme'
import { useThemeStore } from '@core/store/useThemeStore'
import { ThemeMode, ThemePreference } from '@core/theme/types'

export default function ThemeToggle() {
  const { theme: t } = useTheme()
  const mode = useThemeStore((s) => s.preference)
  const setMode = useThemeStore((s) => s.setPreference)

  const modes: (ThemeMode | ThemePreference)[] = ['light', 'dark', 'system']

  return (
    <View style={{ gap: 12, padding: 16, backgroundColor: t.colors.card }}>
      <Text style={{ color: t.colors.text, fontWeight: '700' }}>Theme</Text>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {modes.map((m) => (
          <Pressable key={m} onPress={() => setMode(m)}>
            <Text
              style={{
                color: mode === m ? t.colors.text : t.colors.textSecondary,
              }}
            >
              {m.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}
