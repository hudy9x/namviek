import { httpDel, httpGet, httpPost } from './_req'

export const meetingGetParticipant = (params: {
  room: string
  username: string
}) => {
  return httpGet('/api/meeting/get-participants', {
    params
  })
}

export const meetingService = {
  getRooms: () => {
    return httpGet('/api/meeting/rooms')
  },
  createRoom: (name: string) => {
    return httpPost('/api/meeting/room', {
      name
    })
  },
  deleteRoom: (name: string) => {
    return httpDel(`/api/meeting/room/${name}`)
  }
}
