import { Task, TaskPriority } from '@prisma/client'
import { taskModel, pmClient } from './_prisma'

export interface ITaskQuery {
  projectId?: string
  projectIds?: string[]
  title?: string
  dueDate?: [Date | string, Date | string]
  assigneeIds?: string[]
  statusIds?: string[]
  taskPoint?: number
  priority?: TaskPriority
  take?: number
  skip?: number
  orderBy?: [string, 'asc' | 'desc']
  counter?: boolean
}

const generateConditions = ({
  take,
  skip,
  orderBy,
  priority,
  projectId,
  projectIds,
  title,
  dueDate,
  assigneeIds,
  statusIds,
  taskPoint,
  counter
}: ITaskQuery) => {
  const where: {
    [key: string]: unknown
  } = {}

  take = take ? parseInt(take as unknown as string, 10) : undefined

  if (title) {
    where.title = {
      contains: title,
      mode: 'insensitive'
    }
  }

  if (taskPoint) {
    taskPoint = +taskPoint
    if (taskPoint === 0) {
      taskPoint = null
    }

    where.taskPoint = taskPoint
  }

  if (projectId && projectId !== 'all') {
    where.projectId = projectId
  }

  if (projectIds && projectIds.length) {
    if (!projectIds.includes('ALL')) {
      // where.projectId = null
      where.projectId = {
        in: projectIds
      }
    }
  }

  if (statusIds) {
    where.taskStatusId = {
      in: statusIds
    }
  }

  if (dueDate && dueDate[0] === 'undefined') {
    dueDate[0] = null
  }

  if (dueDate && dueDate[1] === 'undefined') {
    dueDate[1] = null
  }

  let dueDateNotSet = false

  if (dueDate) {
    dueDateNotSet = dueDate.includes('not-set')
  }

  if (dueDateNotSet) {
    where.dueDate = null
  }

  if (!dueDateNotSet && dueDate && (dueDate[0] || dueDate[1])) {
    let [start, end] = dueDate

    if (start) {
      start = new Date(start)
    }

    if (end) {
      end = new Date(end)
    }

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
    if (assigneeIds.includes('null')) {
      where.assigneeIds = {
        isEmpty: true
      }
    } else {
      where.assigneeIds = {
        hasSome: assigneeIds
      }
    }
  }

  if (priority) {
    where.priority = priority
  }

  // console.log('where', where)

  return where
}

export const mdTaskGetAll = (query: ITaskQuery) => {
  let take = query.take
  const { counter, skip } = query
  const where: {
    [key: string]: unknown
  } = generateConditions(query)

  take = take ? parseInt(take as unknown as string, 10) : undefined

  if (counter) {
    return taskModel.count({ where })
  }

  return taskModel.findMany({
    skip,
    take,
    where
  })
}

export const mdTaskExport = (query: ITaskQuery) => {
  const { counter, skip } = query
  const where: {
    [key: string]: unknown
  } = generateConditions(query)
  let take = query.take
  take = take ? parseInt(take as unknown as string, 10) : undefined

  if (counter) {
    return taskModel.count({ where })
  }

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
