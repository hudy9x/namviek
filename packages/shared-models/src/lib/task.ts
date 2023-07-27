import { Task, TaskPriority } from '@prisma/client'
import { taskModel, pmClient } from './_prisma'

interface ITaskQuery {
  term?: string
  projectId?: string
  skip?: number
  take?: number
  assignees?: string[]
  priority?: TaskPriority
}
export const mdTaskGetAll = async ({ projectId }: ITaskQuery) => {
  return taskModel.findMany({
    where: {
      projectId
    }
  })
}

export const mdTaskGetOne = async (taskId: string) => {
  return taskModel.findFirst({
    where: {
      id: taskId
    }
  })
}

export const mdTaskAdd = async (data: Omit<Task, 'id'>) => {
  return taskModel.create({
    data
  })
}

export const mdTaskAddMany = async (data: Omit<Task, 'id'>[]) => {
  return taskModel.createMany({
    data
  })
  // return pmClient.$transaction(
  //   data.map(task => taskModel.create({ data: task }))
  // )
}

export const mdTaskUpdate = async (data: Partial<Task>) => {
  const { id, ...rest } = data
  return taskModel.update({
    where: {
      id
    },
    data: rest
  })
}
