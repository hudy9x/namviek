import { Task, TaskPriority } from '@prisma/client'
import { taskModel, pmClient } from './_prisma'

export interface ITaskQuery {
  projectId?: string
  title?: string
  dueDate?: [Date | null, Date | null]
  assigneeIds?: string[]
  statusIds?: string[]
  taskPoint?: number
  priority?: TaskPriority
  take?: number
  skip?: number
  orderBy?: [string, 'asc' | 'desc']
}

export const mdTaskGetAll = ({
  take,
  skip,
  orderBy,
  priority,
  projectId,
  title,
  dueDate,
  assigneeIds,
  statusIds,
  taskPoint
}: ITaskQuery) => {
  const where: {
    [key: string]: unknown
  } = {}

  console.log('AAAAAA', dueDate)

  if (title) {
    where.title = {
      contains: title,
      mode: 'insensitive'
    }
  }

  if (taskPoint) {
    where.taskPoint = taskPoint
  }

  if (projectId) {
    where.projectId = projectId
  }

  if (statusIds) {
    where.taskStatusId = {
      in: statusIds
    }
  }

  if ((dueDate && dueDate[0]) || dueDate[1]) {
    const [start, end] = dueDate
    // today tasks
    if (start === end) {
      where.dueDate = start
    }

    // task in date range
    if (start && end) {
      where.AND = [{ dueDate: { gte: start } }, { dueDate: { lte: end } }]
    }

    // upcoming tasks
    if (start && !end) {
      where.dueDate = {
        gte: start
      }
    }

    // overdue tasks
    if (!start && end) {
      where.dueDate = {
        lte: end
      }
    }
  }

  if (assigneeIds && assigneeIds.length) {
    where.assigneeIds = {
      hasSome: assigneeIds
    }
  }

  if (priority) {
    where.priority = priority
  }

  console.log('query all', where)

  return taskModel.findMany({
    skip,
    take,
    where
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
