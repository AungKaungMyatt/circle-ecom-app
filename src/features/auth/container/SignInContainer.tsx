import React from 'react'
import { Alert } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import SignInScreen from '@features/auth/screens/SignInScreen'
import { useSignInMutation } from '@/features/auth/api/useAuthMutation'

export default function SignInContainer() {
  const router = useRouter()
  const { email: initialEmailParam } = useLocalSearchParams<{ email?: string }>()
  const initialEmail = (initialEmailParam ?? '').trim()

  const signin = useSignInMutation()

  const [errors, setErrors] = React.useState<{ email?: string; password?: string; root?: string }>(
    {},
  )

  const onSubmit = async ({ email, password }: { email: string; password: string }) => {
    setErrors({})
    if (!email.includes('@')) return setErrors((e) => ({ ...e, email: 'Enter a valid email' }))
    if (password.length < 6) return setErrors((e) => ({ ...e, password: 'Minimum 6 characters' }))
    signin.mutate({ email: email.trim(), password })
  }

  const social = async (_p: 'facebook' | 'google' | 'apple') =>
    Alert.alert('Coming soon', 'Social sign-in is not implemented yet.')

  return (
    <SignInScreen
      loading={signin.isPending}
      errors={errors} // if your screen supports it
      onBack={() => (router.canGoBack() ? router.back() : router.replace('/auth/let-you-in'))}
      onSubmit={onSubmit}
      onGoSignUp={() => router.push('/auth/sign-up')}
      onFacebook={() => social('facebook')}
      onGoogle={() => social('google')}
      onApple={() => social('apple')}
    />
  )
}
