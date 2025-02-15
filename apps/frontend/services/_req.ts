import {
  clearAllGoalieToken,
  getGoalieRefreshToken,
  getGoalieToken,
  isSessionExpired,
  saveGoalieRefreshToken,
  saveGoalieToken
} from '@auth-client'
import { messageError } from '@ui-components'
import axios, { AxiosResponse } from 'axios'

console.log('=================================')
console.log('process.env', process.env.NEXT_PUBLIC_BE_GATEWAY)
console.log('=================================')

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_GATEWAY || ''
})

instance.interceptors.request.use(
  function(config) {
    const authorization = getGoalieToken()
    const refreshToken = getGoalieRefreshToken()

    // console.log('auth toke', authorization)
    // console.log('refresh', refreshToken)

    config.headers.setAuthorization(authorization)
    config.headers.set('refreshtoken', refreshToken)
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function(config) {
    const headers = config.headers
    const authorization = headers.authorization
    const refreshtoken = headers.refreshtoken

    // console.log('override token', authorization, refreshtoken)
    if (authorization && refreshtoken) {
      saveGoalieToken(authorization)
      saveGoalieRefreshToken(refreshtoken)
      // console.log('override done')
    }
    return config
  },
  function(error) {
    const { response } = error
    if (response && response.status === 440) {
      if (isSessionExpired()) {
        messageError('Your session is expired. Please login again !')
        clearAllGoalieToken()
        window.location.href = '/sign-in'
        return
      }

      // window.location.href = '/sign-out';

      // console.log('href', pathname)
      // if (pathname.includes('/sign-in') || pathname.includes('/sign-up')) {
      //   return;
      // }
      // window.location.href = `/sign-in?redirectUrl=${window.location.pathname}`;
    }
    console.log('ERRIRIRIR', response)
    return Promise.reject(error)
  }
)

export const req = instance

interface ApiResponse<T> {
  data: T | null
  error: any | null
  response: AxiosResponse
}

export const httpGet = req.get

export const httpGet2 = async <T>(...args: Parameters<typeof req.get>): Promise<ApiResponse<T>> => {
  try {
    const axiosResponse = await req.get(...args)
    const { data } = axiosResponse.data
    return {
      data: data as T,
      error: null,
      response: axiosResponse
    }
  } catch (error) {
    return {
      data: null,
      error,
      response: (error as any)?.response || null
    }
  }
}

export const httpPost = req.post
export const httpPut = req.put
export const httpDel = req.delete
