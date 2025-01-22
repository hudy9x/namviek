import { decode } from 'jsonwebtoken'
import { GoalieOrg, GoalieUser } from '../types'

const GOALIE_USER = 'GOALIE_USER'
const GOALIE_JWT_TOKEN = 'GOALIE_JWT_TOKEN'
const GOALIE_REFRESH_TOKEN = 'GOALIE_REFRESH_TOKEN'
const GOALIE_ORG = 'GOALIE_ORG'

export const saveGoalieOrg = (org: GoalieOrg) => {
  localStorage.setItem(GOALIE_ORG, JSON.stringify(org))
}

export const saveGoalieUser = (user: GoalieUser) => {
  try {
    window.localStorage.setItem(GOALIE_USER, JSON.stringify(user))
  } catch (error) {
    return
  }
}

export const clearGoalieUser = () => {
  try {
    window.localStorage.removeItem(GOALIE_USER)
  } catch (error) {
    return
  }
}

export const getGoalieUser = () => {
  try {
    return JSON.parse(window.localStorage.getItem(GOALIE_USER) || '{}') as GoalieUser
  } catch (error) {
    return null
  }
}

export const saveGoalieToken = (token: string) => {
  try {
    localStorage.setItem(GOALIE_JWT_TOKEN, token)
  } catch (error) {
    console.log('jwt token not saved')
  }
}

export const saveGoalieRefreshToken = (token: string) => {
  try {
    localStorage.setItem(GOALIE_REFRESH_TOKEN, token)
  } catch (error) {
    console.log('refresh token not saved')
  }
}

export const isSessionExpired = () => {
  const now = Date.now()
  const decoded = getDecodeRefreshToken()
  const exp = decoded.exp // it is refresh token expired time

  return exp * 1000 < now
}

export const isSessionStillAlive = () => {
  return !isSessionExpired()
}

export const getDecodeRefreshToken = () => {
  try {
    const decoded = decode(
      localStorage.getItem(GOALIE_REFRESH_TOKEN) || ''
    ) as { exp: number }
    return decoded ? decoded : { exp: 0 }
  } catch (error) {
    return { exp: 0 }
  }
}

export const getGoalieToken = () => {
  try {
    return localStorage.getItem(GOALIE_JWT_TOKEN)
  } catch (error) {
    return null
  }
}

export const getGoalieRefreshToken = () => {
  try {
    return localStorage.getItem(GOALIE_REFRESH_TOKEN)
  } catch (error) {
    return null
  }
}

export const clearAllGoalieToken = () => {
  try {
    localStorage.removeItem(GOALIE_REFRESH_TOKEN)
    localStorage.removeItem(GOALIE_JWT_TOKEN)
  } catch (error) {
    return null
  }
}
