import { apiClient } from '@/lib/apiClient'
import { SigninPayload, SignUpPayload } from '../types/auth.request'
import { SigninResponse } from '../types/auth.response'

const AuthService = {
  signIn: async (payload: SigninPayload) => {
    const { data } = await apiClient.post<SigninResponse>('/auth/signin', payload)
    return data
  },
  signUp: async (payload: SignUpPayload) => {
    const { data } = await apiClient.post('/auth/signup', payload)
    return data
  },
}

export default AuthService
