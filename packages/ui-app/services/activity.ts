import axios from 'axios'
import { httpDel, httpGet, httpPost } from './_req'

export const activityGetAllByTask = (taskId: string) => {
  return httpGet(`/api/project/task/activity`, {
    params: {
      taskId
    }
  })
}
// export const activityCreatePresignedUrl = ({
//   orgId,
//   projectId,
//   name,
//   type
// }: {
//   orgId: string
//   projectId: string
//   name: string
//   type: string
// }) => {
//   console.log('name:', name, type)
//   return httpPost('/api/activity/create-presigned-url', {
//     orgId,
//     projectId,
//     name,
//     type
//   })
// }
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
