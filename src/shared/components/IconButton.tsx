import React from 'react'
import { Pressable, ViewStyle, GestureResponderEvent } from 'react-native'
import { useTheme } from '@/shared/hooks/useTheme'

type Props = {
  icon: React.ReactNode
  onPress?: (e: GestureResponderEvent) => void
  size?: number // touch size
  radius?: number
  variant?: 'plain' | 'subtle' | 'filled'
  style?: ViewStyle
}

export default function IconButton({
  icon,
  onPress,
  size = 40,
  radius,
  variant = 'plain',
  style,
}: Props) {
  const { theme: t } = useTheme()

  const bg =
    variant === 'filled'
      ? t.dark
        ? t.colors.text + '11'
        : t.colors.text + '08'
      : variant === 'subtle'
      ? t.colors.textSecondary + '14'
      : 'transparent'

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: t.colors.textSecondary + '22', borderless: true }}
      style={({ pressed }) => [
        {
          width: size,
          height: size,
          borderRadius: radius ?? Math.min(size / 2, t.radius.full ?? 999),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: pressed ? t.colors.textSecondary + '22' : bg,
        },
        style,
      ]}
    >
      {icon}
    </Pressable>
  )
}
