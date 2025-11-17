import { IUser } from '@/shared/types'

export type SigninResponse = {
  accessToken: string
  refreshToken: string
  user: IUser
}
