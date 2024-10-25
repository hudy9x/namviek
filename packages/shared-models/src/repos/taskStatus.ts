// import { StatusType, TaskStatus } from '@prisma/client'
// import { taskStatusModel } from './_prisma'
import { taskStatusModel, StatusType, ITaskStatusField, castToObjectId } from "../schema";

export const mdTaskStatusGetByProjectId = async (projectId: string) => {
  return taskStatusModel.find({
    projectId: castToObjectId(projectId)
  })
}

export const mdTaskCounterByProject = async (projectId: string) => {
  return taskStatusModel.countDocuments({
    projectId: castToObjectId(projectId)
  })
}

interface ITaskStatusQuery {
  projectIds: string[]
  types?: StatusType[]
}

export const mdTaskStatusWithDoneType = async (projectId: string) => {
  return taskStatusModel.findOne({
    projectId: castToObjectId(projectId),
    type: StatusType.DONE
  })
}

export const mdTaskStatusWithTodoType = async (projectId: string) => {
  return taskStatusModel.findOne({
    projectId: castToObjectId(projectId),
    type: StatusType.TODO
  })
}

export const mdTaskStatusGetById = async (id: string) => {
  return taskStatusModel.findOne({
    where: {
      id
    }
  })
}

export const mdTaskStatusQuery = async ({
  projectIds,
  types
}: ITaskStatusQuery) => {
  const where: { [k: string]: unknown } = {}
  if (projectIds && projectIds.length && !projectIds.includes('ALL')) {
    where.projectId = {
      $in: projectIds.map(castToObjectId)
    }
  }

  if (types && types.length) {
    where.type = {
      $in: types
    }
  }

  return taskStatusModel.find({
    where
  })
}

export const mdTaskStatusAdd = async (data: Omit<ITaskStatusField, 'id'>) => {
  return taskStatusModel.create(data)
}

export const mdTaskStatusUpdate = async (data: Partial<ITaskStatusField>) => {
  const { id, ...newTaskStatus } = data
  return taskStatusModel.findByIdAndUpdate(id, newTaskStatus)
}

export const mdTaskStatusDel = async (id: string) => {
  return taskStatusModel.findByIdAndDelete(id)
}

export const mdTaskStatusAddMany = async (data: Omit<ITaskStatusField, 'id'>[]) => {
  return taskStatusModel.insertMany(data)
}
