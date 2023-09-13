import { httpGet, httpPost } from './_req'

export const favGet = () => {
  return httpGet(`/api/favorite`)
}

export const favPost = () => {
  return httpPost('/api/favorite')
}
