import axios from 'axios'
import { httpDel, httpGet, httpPost, httpPut } from './_req'
import { Activity } from '@prisma/client'

export const activityGetAllByTask = (taskId: string) => {
  return httpGet(`/api/project/task/activity`, {
    params: {
      objectId: taskId
    }
  })
}

export const activityCreate = (
  objectId: string,
  activity: Partial<Activity>
) => {
  return httpPost('/api/project/task/activity', activity, {
    params: { objectId }
  })
}

export const activityUpdate = (activity: Activity) => {
  return httpPut('/api/project/task/activity', activity)
}
//
// export const activityDelFile = (id: string, projectId: string) => {
//   return httpDel('/api/activity/del-file', {
//     params: { id, projectId }
//   })
// }
//
// export const activityPutFile = (presignedUrl: string, data: File) => {
//   return axios.put(presignedUrl, data)
// }
//
// export const activitySaveToDrive = (data: Partial<Fileactivity>) => {
//   return httpPost('/api/activity/save-to-drive', data)
// }
//
// export const activityDeleteFile = (name: string) => {
//   return httpDel('/api/activity/delete-object', {
//     params: {
//       name
//     }
//   })
// }
//
// export const activityGetObjectUrl = (name: string) => {
//   return httpGet('/api/activity/get-object-url', {
//     params: { name }
//   })
// }
