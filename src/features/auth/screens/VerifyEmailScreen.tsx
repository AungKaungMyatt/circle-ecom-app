import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@/shared/hooks/useTheme'

type Props = {
  loading: boolean
  email: string
  errors?: { code?: string; root?: string }
  onSubmit: (code: string) => void
  onBack: () => void
  onResend?: () => void
}

export default function VerifyEmailScreen({
  loading,
  email,
  errors,
  onSubmit,
  onBack,
  onResend,
}: Props) {
  const { theme: t } = useTheme()
  const [code, setCode] = useState('')
  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    // autofocus the code input
    const id = setTimeout(() => inputRef.current?.focus(), 100)
    return () => clearTimeout(id)
  }, [])

  const canSubmit = code.trim().length >= 4 && !loading

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.wrap, { backgroundColor: t.colors.bg }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={onBack}
          style={[
            styles.iconBtn,
            {
              backgroundColor: t.colors.card,
              borderColor: t.colors.textSecondary + '22',
            },
          ]}
        >
          <Feather name="arrow-left" size={20} color={t.colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: t.colors.text }]}>Verify email</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Body */}
      <View style={{ paddingHorizontal: 16, width: '100%', gap: 8 }}>
        <Text style={{ color: t.colors.textSecondary }}>We sent a verification code to:</Text>
        <Text style={{ color: t.colors.text, fontWeight: '700', marginBottom: 8 }}>
          {email || 'your email'}
        </Text>

        <Text style={{ color: t.colors.text, fontWeight: '600', marginBottom: 6 }}>
          Enter 4–6 digit code
        </Text>

        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={(v) => setCode(v.replace(/\s/g, ''))}
          placeholder="e.g. 123456"
          placeholderTextColor={t.colors.textSecondary + '88'}
          keyboardType="number-pad"
          returnKeyType="done"
          maxLength={6}
          style={[
            styles.input,
            {
              color: t.colors.text,
              backgroundColor: t.colors.card,
              borderColor: (errors?.code ? '#ff5a5a' : t.colors.textSecondary) + '33',
            },
          ]}
          onSubmitEditing={() => canSubmit && onSubmit(code.trim())}
        />

        {/* inline error(s) */}
        {!!errors?.code && <Text style={{ color: '#ff5a5a', marginTop: 4 }}>{errors.code}</Text>}
        {!!errors?.root && <Text style={{ color: '#ff5a5a', marginTop: 4 }}>{errors.root}</Text>}

        {/* Resend */}
        {onResend && (
          <Pressable style={{ alignSelf: 'flex-start', marginTop: 8 }} onPress={onResend}>
            <Text style={{ color: t.colors.primary, fontWeight: '600' }}>Resend code</Text>
          </Pressable>
        )}
      </View>

      {/* Bottom actions */}
      <View style={{ width: '100%', paddingHorizontal: 16, marginTop: 16 }}>
        <Pressable
          onPress={() => onSubmit(code.trim())}
          disabled={!canSubmit}
          style={({ pressed }) => [
            styles.btn,
            {
              backgroundColor: t.colors.primary,
              opacity: pressed || !canSubmit ? 0.8 : 1,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator color={t.colors.onPrimary ?? '#fff'} />
          ) : (
            <Text
              style={{
                color: t.colors.onPrimary ?? '#fff',
                fontWeight: '700',
              }}
            >
              Verify
            </Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingTop: 50, gap: 16 },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 20, fontWeight: '800', flex: 1 },
  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    letterSpacing: 4,
    fontSize: 18,
    fontWeight: '700',
  },
  btn: {
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
