import { httpDel, httpGet, httpPost, httpPut } from './_req'
import { Activity } from '@prisma/client'

export const activityGetAllByTask = (taskId: string) => {
  return httpGet(`/api/activity`, {
    params: {
      objectId: taskId
    }
  })
}

export const activityCreate = (
  objectId: string,
  activity: Partial<Activity>
) => {
  return httpPost('/api/activity', activity, {
    params: { objectId }
  })
}

export const activityUpdate = (activity: Activity) => {
  return httpPut('/api/activity', activity)
}

export const activityDelete = (id: string) => {
  return httpDel('/api/activity', {
    params: {
      id
    }
  })
}
