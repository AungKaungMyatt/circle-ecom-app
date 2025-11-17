import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'
import AuthService from '../services/auth.service'
import { useAuthStore } from '@/core/store/useAuthStore'

export function useSignInMutation() {
  const { login } = useAuthStore()
  return useMutation({
    mutationFn: AuthService.signIn,
    onSuccess: ({ accessToken, user }) => {
      login(user, accessToken)
    },
  })
}

export function useSignUpMutation() {
  return useMutation({
    mutationFn: async (p: {
      firstName: string
      lastName: string
      email: string
      password: string
    }) => {
      return api.signup(p)
    },
  })
}

export function useVerifyEmailMutation() {
  return useMutation({
    mutationFn: async (p: { email: string; code: string }) => {
      return api.verifyEmail(p.email, p.code)
    },
  })
}
