import { httpGet } from './_req'

export const meetingGetParticipant = (params: {
  room: string
  username: string
}) => {
  return httpGet('/api/meeting/get-participants', {
    params
  })
}
