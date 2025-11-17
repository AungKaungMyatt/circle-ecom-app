import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/shared/hooks/useTheme'

export default function OrdersScreen() {
  const { theme: t } = useTheme()

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.colors.bg }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: t.colors.text }]}>My Orders</Text>
        <Text style={[styles.subtitle, { color: t.colors.textSecondary }]}>
          You haven’t placed any orders yet.
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 15, textAlign: 'center' },
})
