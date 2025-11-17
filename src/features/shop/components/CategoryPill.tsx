import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useTheme } from '@/shared/hooks/useTheme'

export default function CategoryPill({ label, iconName }: { label: string; iconName: any }) {
  const { theme: t } = useTheme()
  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={[
          styles.circle,
          {
            backgroundColor: t.colors.card,
            borderColor: t.colors.textSecondary + '22',
          },
        ]}
      >
        <FontAwesome5 name={iconName} size={18} color={t.colors.text} />
      </View>
      <Text style={{ marginTop: 6, color: t.colors.textSecondary, fontSize: 12 }}>{label}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  circle: {
    width: 56,
    height: 56,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
