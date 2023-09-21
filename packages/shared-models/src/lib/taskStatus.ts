import { TaskStatus } from '@prisma/client'
import { taskStatusModel } from './_prisma'

export const mdTaskStatusGetByProjectId = async (projectId: string) => {
  return taskStatusModel.findMany({
    where: {
      projectId
    }
  })
}

interface ITaskStatusQuery {
  projectIds: string[]
}

export const mdTaskStatusQuery = async ({ projectIds }: ITaskStatusQuery) => {
  const where: { [k: string]: unknown } = {}
  if (projectIds && projectIds.length && !projectIds.includes('ALL')) {
    where.projectId = {
      in: projectIds
    }
  }

  return taskStatusModel.findMany({
    where
  })
}

export const mdTaskStatusAdd = async (data: Omit<TaskStatus, 'id'>) => {
  return taskStatusModel.create({
    data: { ...data }
  })
}

export const mdTaskStatusUpdate = async (data: Partial<TaskStatus>) => {
  const { id, ...newTaskStatus } = data
  return taskStatusModel.update({
    where: {
      id
    },
    data: newTaskStatus
  })
}

export const mdTaskStatusDel = async (id: string) => {
  return taskStatusModel.delete({
    where: {
      id
    }
  })
}
