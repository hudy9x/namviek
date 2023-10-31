import { httpGet } from './_req'

export const pushNotice = () => {
  return httpGet(`/api/pusher/test`)
}
