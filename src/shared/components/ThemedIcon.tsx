import React from 'react'
import type { LucideIcon } from 'lucide-react-native'
import { useTheme } from '@/shared/hooks/useTheme'

type Props = {
  icon: LucideIcon
  size?: number
  color?: string
  strokeWidth?: number
}

const ThemedIcon = ({ icon: Icon, size, color, strokeWidth }: Props) => {
  const { theme: t } = useTheme()
  return (
    <Icon
      size={size ?? t.icon.size}
      strokeWidth={strokeWidth ?? t.icon.strokeWidth}
      color={color ?? t.colors.text}
    />
  )
}

export default ThemedIcon
