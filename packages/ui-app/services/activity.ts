import { httpDel, httpGet, httpPost, httpPut } from './_req'
// import { Activity } from '@prisma/client'
import { IActivityField } from "@shared/models";

export const activityGetAllByTask = (taskId: string) => {
  return httpGet(`/api/activity`, {
    params: {
      objectId: taskId
    }
  })
}

export const activityCreate = (
  objectId: string,
  activity: Partial<IActivityField>
) => {
  return httpPost('/api/activity', activity, {
    params: { objectId }
  })
}

export const activityUpdate = (activity: IActivityField) => {
  return httpPut('/api/activity', activity)
}

export const activityDelete = (id: string) => {
  return httpDel('/api/activity', {
    params: {
      id
    }
  })
}
