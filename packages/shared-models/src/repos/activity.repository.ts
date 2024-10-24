import { activityModel, IActivityField, ActivityObjectType } from '../schema'

export const mdActivityAdd = (data: Omit<IActivityField, 'id'>) => {
  return activityModel.create(data)
}

export const mdActivityAddMany = (data: Omit<IActivityField, 'id'>[]) => {
  return activityModel.insertMany(data)
}

export const mdActivityDel = (id: string) => {
  return activityModel.findByIdAndDelete(id)
}

export const mdActivityUpdate = (id: string, data: Partial<Omit<IActivityField, 'id'>>) => {
  return activityModel.findByIdAndUpdate(id, data, { new: true })
}

export const mdActivityGetAllByTask = (taskId: string) => {
  return activityModel.find({
    objectId: taskId,
    objectType: ActivityObjectType.TASK
  })
  // .limit(5)
  // .skip(0)
}
