import { Favorites } from '@prisma/client'
import { httpDel, httpGet, httpPost } from './_req'

export const favGet = (orgId: string) => {
  return httpGet(`/api/favorite?orgId=${orgId}`)
}

export const favPost = (data: Partial<Favorites>) => {
  return httpPost('/api/favorite', data)
}

export const favDel = (id: string, orgId: string) => {
  return httpDel('/api/favorite', {
    params: { id, orgId }
  })
}
