import { User } from '@prisma/client'
import { decode } from 'jsonwebtoken'
import {
  saveGoalieRefreshToken,
  saveGoalieToken,
  saveGoalieUser
} from '../lib/util'
import { httpPost } from './_req'

export const signup = (data: Partial<User>) => {
  return httpPost('/api/auth/sign-up', data)
}

export interface ISignin {
  email: string
  password: string
  provider?: 'GOOGLE' | 'EMAIL_PASSWORD'
}

export const signin = ({
  email,
  password,
  provider = 'EMAIL_PASSWORD'
}: ISignin) => {
  return httpPost('/api/auth/sign-in', { email, password, provider })
    .then(res => {
      const { status, data } = res.data
      const { headers } = res

      console.log('headers', headers)

      if (status !== 200) {
        return Promise.reject('INVALID_INFORMATION')
      }

      const token = headers.authorization
      const refreshToken = headers.refreshtoken

      console.log('cache goalie token')
      saveGoalieToken(token)
      console.log('cache goalie refresh token')
      saveGoalieRefreshToken(refreshToken)

      // const decodeJWT = decode(token) as GoalieUser
      const decodeRefreshToken = decode(refreshToken) as { exp: number }

      console.log('cache goalie user info')
      saveGoalieUser({
        id: data.id,
        email: data.email,
        name: data.name,
        photo: data.photo,
        exp: decodeRefreshToken.exp // it should be `refreshToken expired`
      })

      return Promise.resolve('SUCCESS')
    })
    .catch(error => {
      console.log('error', error)
      return Promise.reject(error)
    })
}

export const resendVerifyEmail = (email: string) => {
  return httpPost('/api/auth/resend-verify-email', { email })
}
