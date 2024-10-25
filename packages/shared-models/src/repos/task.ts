// import { Task, TaskPriority } from '@prisma/client'
// import { taskModel, pmClient } from './_prisma'
import { castToObjectId, taskModel, TaskPriority, ITaskField } from '../schema'


export interface ITaskQuery {
  projectId?: string
  projectIds?: string[]
  title?: string
  dueDate?: [Date | string | null, Date | string | null]
  assigneeIds?: string[]
  statusIds?: string[]
  taskPoint?: number
  priority?: TaskPriority
  done?: 'yes' | 'no'
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
  done,
  counter
}: ITaskQuery) => {
  let where: {
    [key: string]: unknown
  } = {}

  take = take ? parseInt(take as unknown as string, 10) : undefined

  // filter task by title
  if (title) {
    where.title = new RegExp(title, 'i')
  }

  if (taskPoint) {
    // convert string to number 
    taskPoint = +taskPoint
    if (taskPoint === 0) {
      taskPoint = undefined
      where = {
        ...where,
        ...{
          $or: [
            { taskPoint: null },
            {
              taskPoint: {
                $exists: false
              }
            }

          ]
        }
      }
    } else {
      where.taskPoint = taskPoint
    }

  }


  if (projectId && projectId !== 'all') {
    where.projectId = castToObjectId(projectId)
  }

  if (projectIds && projectIds.length) {
    if (!projectIds.includes('ALL')) {
      // where.projectId = null
      where.projectId = {
        $in: projectIds.map(castToObjectId)
      }
    }
  }

  // filter done tasks
  if (done && ['yes', 'no'].includes(done)) {
    where.done = done === 'yes'
  }

  if (statusIds) {
    where.taskStatusId = {
      $in: statusIds.map(castToObjectId)
    }
  }

  // clear due date as it's value is undefined
  if (dueDate && dueDate[0] === 'undefined') {
    dueDate[0] = null
  }

  if (dueDate && dueDate[1] === 'undefined') {
    dueDate[1] = null
  }

  // filter tasks that not set dueDate
  let dueDateNotSet = false

  if (dueDate) {
    dueDateNotSet = dueDate.includes('not-set')
  }

  if (dueDateNotSet) {
    where.dueDate = null
  }

  // filter tasks without date range
  let dueDateIsAny = false
  if (dueDate) {
    dueDateIsAny = dueDate.includes('any')
  }

  // filter tasks with date range
  if (
    !dueDateNotSet &&
    !dueDateIsAny &&
    dueDate &&
    (dueDate[0] || dueDate[1])
  ) {
    let [start, end] = dueDate

    if (start && start !== 'null') {
      start = new Date(start)
    } else start = null

    if (end && end !== 'null') {
      end = new Date(end)
    } else end = null

    // today tasks
    if (start === end) {
      where.dueDate = start
    }

    // task in date range
    if (start && end) {
      where.$and = [{ dueDate: { $gte: start } }, { dueDate: { $lte: end } }]
    }

    // upcoming tasks
    if (start && !end) {
      where.dueDate = {
        $gte: start
      }
    }

    // overdue tasks
    if (!start && end) {
      where.dueDate = {
        $lte: end
      }
    }
  }

  // filter task with specified assignees
  if (assigneeIds && assigneeIds.length) {
    if (assigneeIds.includes('null')) {
      where.assigneeIds = {
        $size: 0
      }
    } else {
      where.assigneeIds = {
        $in: assigneeIds.map(castToObjectId)
      }
    }
  }

  if (priority) {
    where.priority = priority
  }

  return where
}

export const mdTaskDelete = (id: string) => {
  return taskModel.findByIdAndDelete(id)
}

export const mdTaskGetAll = (query: ITaskQuery) => {
  let take = query.take
  let skip = query.skip
  const { counter } = query
  const where: Record<string, unknown> = generateConditions(query)

  take = take ? parseInt(take as unknown as string, 10) : undefined
  skip = skip ? parseInt(skip as unknown as string, 10) : undefined

  if (counter) {
    return taskModel.countDocuments({ where })
  }

  console.log('task get all:', take, skip)

  return taskModel.find(where)
    .skip(skip)
    .limit(take)
    .sort({ order: 1 })
}

export const mdTaskExport = (query: ITaskQuery) => {
  const { counter, skip } = query
  const where: {
    [key: string]: unknown
  } = generateConditions(query)
  let take = query.take
  take = take ? parseInt(take as unknown as string, 10) : undefined

  if (counter) {
    return taskModel.countDocuments({ where })
  }

  return taskModel.find(where)
    .skip(skip)
    .limit(take)
}

export const mdTaskGetOne = async (taskId: string) => {
  return taskModel.findById(taskId)
}

export const mdTaskCounter = () => {
  console.log(1)
}

export const mdTaskAdd = async (data: Omit<ITaskField, 'id'>) => {
  return taskModel.create(data)
}

export const mdTaskAddMany = async (data: Omit<ITaskField, 'id'>[]) => {
  return taskModel.insertMany(data)
}

export const mdTaskUpdateMany = async (ids: string[], data: Partial<ITaskField>) => {
  const { id, ...rest } = data
  return taskModel.updateMany({
    _id: { $in: ids.map(castToObjectId) }
  }, rest)
}

export const mdTaskUpdate = async (data: Partial<ITaskField>) => {
  const { id, ...rest } = data
  return taskModel.findByIdAndUpdate(id, rest)
}
