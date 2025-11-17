import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useAuthStore } from '@/core/store/useAuthStore'
import { useTheme } from '@/shared/hooks/useTheme'

const avatar = require('@features/home/assets/images/profile.png')

export default function ProfileScreen() {
  const router = useRouter()
  const { theme: t, toggleTheme, mode } = useTheme()
  const { logout } = useAuthStore()
  const isDark = mode === 'dark'

  const onLogout = async () => {
    try {
      logout()
      router.replace('/auth/sign-in')
    } catch {
      Alert.alert('Logout failed', 'Please try again.')
    }
  }

  const Row = ({
    icon,
    label,
    onPress,
    right,
    danger = false,
  }: {
    icon: React.ReactNode
    label: string
    onPress?: () => void
    right?: React.ReactNode
    danger?: boolean
  }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.row, { borderBottomColor: t.colors.border }]}
    >
      <View style={styles.rowLeft}>
        {icon}
        <Text style={[styles.rowLabel, { color: danger ? t.colors.danger : t.colors.text }]}>
          {label}
        </Text>
      </View>
      <View style={styles.rowRight}>
        {right ?? <Ionicons name="chevron-forward" size={18} color={t.colors.textSecondary} />}
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.colors.bg }]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: t.colors.text }]}>Profile</Text>
          <TouchableOpacity>
            <Feather name="more-horizontal" size={22} color={t.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Image source={avatar} style={styles.avatar} />
            <View style={[styles.editBadge, { backgroundColor: t.colors.text }]}>
              <Feather name="edit-2" size={12} color={t.colors.bg} />
            </View>
          </View>
          <Text style={[styles.name, { color: t.colors.text }]}>Andrew Ainsley</Text>
          <Text style={[styles.phone, { color: t.colors.textSecondary }]}>+1 111 467 378 399</Text>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: t.colors.border }]} />

        {/* Menu */}
        <View style={styles.menu}>
          <Row
            icon={<Feather name="user" size={18} color={t.colors.text} />}
            label="Edit Profile"
            onPress={() => router.push('/profile/edit')}
          />
          <Row
            icon={<Feather name="map-pin" size={18} color={t.colors.text} />}
            label="Address"
            onPress={() => router.push('/profile/address')}
          />
          <Row
            icon={<Feather name="bell" size={18} color={t.colors.text} />}
            label="Notification"
            onPress={() => router.push('/profile/notifications')}
          />
          <Row
            icon={<Feather name="credit-card" size={18} color={t.colors.text} />}
            label="Payment"
            onPress={() => router.push('/profile/payment')}
          />
          <Row
            icon={<MaterialCommunityIcons name="shield-outline" size={18} color={t.colors.text} />}
            label="Security"
            onPress={() => router.push('/profile/security')}
          />

          {/* Language with trailing value */}
          <Row
            icon={<Feather name="globe" size={18} color={t.colors.text} />}
            label="Language"
            right={
              <View style={styles.trailing}>
                <Text style={{ color: t.colors.textSecondary }}>English (US)</Text>
                <Ionicons name="chevron-forward" size={18} color={t.colors.textSecondary} />
              </View>
            }
            onPress={() => router.push('/profile/language')}
          />

          {/* Dark Mode with switch */}
          <Row
            icon={<Feather name="eye" size={18} color={t.colors.text} />}
            label="Dark Mode"
            right={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: t.colors.card, true: t.colors.text }}
                thumbColor={t.colors.bg}
              />
            }
          />

          <Row
            icon={<Feather name="lock" size={18} color={t.colors.text} />}
            label="Privacy Policy"
            onPress={() => router.push('/profile/privacy')}
          />
          <Row
            icon={<Feather name="help-circle" size={18} color={t.colors.text} />}
            label="Help Center"
            onPress={() => router.push('/profile/help')}
          />
          <Row
            icon={<Feather name="users" size={18} color={t.colors.text} />}
            label="Invite Friends"
            onPress={() => router.push('/profile/invite')}
          />

          {/* Logout */}
          <Row
            icon={<Feather name="log-out" size={18} color={t.colors.danger} />}
            label="Logout"
            danger
            onPress={onLogout}
            right={<Ionicons name="chevron-forward" size={18} color={t.colors.danger + '66'} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { paddingHorizontal: 16, paddingBottom: 24 },
  header: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 20, fontWeight: '700' },

  profileCard: { alignItems: 'center', marginTop: 12 },
  avatarWrap: { width: 88, height: 88, borderRadius: 44, overflow: 'hidden' },
  avatar: { width: '100%', height: '100%' },
  editBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { marginTop: 10, fontSize: 18, fontWeight: '700' },
  phone: { marginTop: 2 },

  divider: { height: 1, marginVertical: 16 },

  menu: { gap: 2 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'space-between',
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowLabel: { fontSize: 15 },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: 8 },
})
