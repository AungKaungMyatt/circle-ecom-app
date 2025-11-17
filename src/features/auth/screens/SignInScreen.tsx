import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { ArrowBigLeft } from 'lucide-react-native'
import { useTheme } from '@/shared/hooks/useTheme'
import FormTextInput from '@shared/components/FormTextInput'
import Divider from '@shared/components/Divider'
import IconButton from '@shared/components/IconButton'
import { FontAwesome } from '@expo/vector-icons'
import GoogleIcon from '@assets/icons/google.svg'

export type SignInScreenProps = {
  onBack?: () => void
  onSubmit?: (payload: { email: string; password: string }) => void
  onGoSignUp?: () => void
  onFacebook?: () => void
  onGoogle?: () => void
  onApple?: () => void
  loading?: boolean
  errors?: Partial<{ email: string; password: string; root: string }>
}

export default function SignInScreen({
  onBack,
  onSubmit,
  onGoSignUp,
  onFacebook,
  onGoogle,
  onApple,
  loading,
  errors,
}: SignInScreenProps) {
  const { theme: t } = useTheme()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: t.colors.bg }]} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={8}>
          <ArrowBigLeft size={22} color={t.colors.text} strokeWidth={2} />
        </Pressable>
      </View>

      <View style={{ gap: 18, paddingHorizontal: 20, marginTop: 12 }}>
        <Text style={[styles.title, { color: t.colors.text }]}>Sign in</Text>

        <FormTextInput
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          error={errors?.email}
        />

        <FormTextInput
          label="Password"
          secureTextEntry
          secureToggle
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          error={errors?.password}
        />

        {!!errors?.root && <Text style={{ color: t.colors.danger }}>{errors.root}</Text>}

        <Pressable
          disabled={loading}
          onPress={() => onSubmit?.({ email, password })}
          style={[
            styles.cta,
            {
              backgroundColor: t.dark ? t.colors.text : '#111',
              opacity: loading ? 0.7 : 1,
            },
            styles.shadow,
          ]}
        >
          <Text style={[styles.ctaText, { color: t.dark ? t.colors.bg : '#fff' }]}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={{ color: t.colors.textSecondary }}>Don’t have an account? </Text>
          <Pressable hitSlop={6} onPress={onGoSignUp}>
            <Text
              style={{
                color: t.colors.text,
                fontWeight: '700',
                textDecorationLine: 'underline',
              }}
            >
              Sign up
            </Text>
          </Pressable>
        </View>

        <Divider label="or continue with" color={t.colors.textSecondary} />

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12 }}>
          <IconButton
            size={56}
            radius={14}
            variant="subtle"
            onPress={onFacebook}
            icon={<FontAwesome name="facebook" size={22} color="#1877F2" />}
          />
          <IconButton
            size={56}
            radius={14}
            variant="subtle"
            onPress={onGoogle}
            icon={<GoogleIcon width={22} height={22} />}
          />
          <IconButton
            size={56}
            radius={14}
            variant="subtle"
            onPress={onApple}
            icon={<FontAwesome name="apple" size={22} color={t.colors.text} />}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
  title: { fontSize: 28, fontWeight: '800' },
  cta: {
    height: 56,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: { fontSize: 16, fontWeight: '700' },
  footer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
})
