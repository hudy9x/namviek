import { Activity, ActivityObjectType } from '@prisma/client'
import { activityModel } from './_prisma'

export const mdActivityAdd = (data: Omit<Activity, 'id'>) => {
  return activityModel.create({
    data
  })
}

// export const mdActivityGet = (objectId: string, objectType: string) => {
//   return activityModel.findMany({
//     where: {
//       objectId,
//       objectType
//     }
//   })
// }
//
// export const mdActivityDel = (id: string) => {
//   return activityModel.delete({
//     where: {
//       id
//     }
//   })
// }
//
// export const mdActivityUpdate = (id: string, data: Partial<Activity>) => {
//   return activityModel.update({
//     where: {
//       id
//     },
//     data: data
//   })
// }

export const mdActivityGetAllByTask = (taskId: string) => {
  return activityModel.findMany({
    where: {
      objectId: taskId,
      objectType: ActivityObjectType.TASK
    }
  })
}
