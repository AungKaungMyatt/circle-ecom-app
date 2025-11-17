import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Redirect } from 'expo-router'
import { useAuthStore } from '@/core/store/useAuthStore'
import { useTheme } from '@/shared/hooks/useTheme'

export default function Index() {
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { theme: t } = useTheme()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoggedIn(!!user)
      } catch (err) {
        console.log('Auth check failed:', err)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: t.colors.bg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={t.colors.text} size="large" />
      </View>
    )
  }

  if (isLoggedIn) {
    return <Redirect href="/shop" />
  }

  return <Redirect href="/onboarding" />
}
