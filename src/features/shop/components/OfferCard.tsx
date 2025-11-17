import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useTheme } from '@/shared/hooks/useTheme'

export default function OfferCard({
  title,
  subtitle,
  description,
  image,
}: {
  title: string
  subtitle: string
  description: string
  image?: any
}) {
  const { theme: t } = useTheme()
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: t.colors.card, borderColor: t.colors.textSecondary + '22' },
      ]}
    >
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={{ color: t.colors.text, fontSize: 28, fontWeight: '800' }}>{title}</Text>
        <Text style={{ color: t.colors.text, fontWeight: '700' }}>{subtitle}</Text>
        <Text style={{ color: t.colors.textSecondary, fontSize: 12 }}>{description}</Text>
      </View>
      {image ? <Image source={image} style={{ width: 96, height: 96, borderRadius: 12 }} /> : null}
    </View>
  )
}
const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
})
