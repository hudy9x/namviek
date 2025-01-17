import { StatusType, TaskStatus } from '@prisma/client'
import { taskStatusModel } from './_prisma'

export const mdTaskStatusGetByProjectId = async (projectId: string) => {
  return taskStatusModel.findMany({
    where: {
      projectId
    }
  })
}

export const mdTaskCounterByProject = async (projectId: string) => {
  return taskStatusModel.count({
    where: {
      projectId
    }
  })
}

interface ITaskStatusQuery {
  projectIds: string[]
  types?: StatusType[]
}

export const mdTaskStatusWithDoneType = async (projectId: string) => {
  return taskStatusModel.findFirst({
    where: {
      projectId,
      type: StatusType.DONE
    }
  })
}

export const mdTaskStatusWithTodoType = async (projectId: string) => {
  return taskStatusModel.findFirst({
    where: {
      projectId,
      type: StatusType.TODO
    }
  })
}

export const mdTaskStatusGetById = async (id: string) => {
  return taskStatusModel.findFirst({
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
      in: projectIds
    }
  }

  if (types && types.length) {
    where.type = {
      in: types
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

export const mdTaskStatusAddMany = async (data: Omit<TaskStatus, 'id'>[]) => {
  return taskStatusModel.createMany({
    data: data
  })
}
