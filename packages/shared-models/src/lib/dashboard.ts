import {
  Dashboard,
  DashboardComponent,
  DashboardComponentType
} from '@prisma/client'
import { dboardComponentModal, dboardModel, taskModel } from './_prisma'

export const mdDBoardGetComponents = async (dboardId: string) => {
  return dboardComponentModal.findMany({
    where: {
      dashboardId: dboardId
    }
  })
}

export const mdDBoardDelComponent = async (componentId: string) => {
  return dboardComponentModal.delete({
    where: {
      id: componentId
    }
  })
}

export const mdDboardGetDefault = async (projectId: string) => {
  return dboardModel.findFirst({
    where: {
      projectId
    }
  })
}

export const mdDBoardCreate = async (data: Omit<Dashboard, 'id'>) => {
  return dboardModel.create({
    data
  })
}

export const mdDBoardAddComponent = async (
  data: Omit<DashboardComponent, 'id'>
) => {
  return dboardComponentModal.create({
    data
  })
}

interface IDBComponentFilter {
  projectIds?: string[]
  statusIds?: string[]
  tagIds?: string[]
  assigneeIds?: string[]
  points?: number[]
  priority?: string[]
  startDate?: Date
  endDate?: Date
}

type IDBComponentColumnFilter = {
  startDate?: Date
  endDate?: Date
  projectIds?: string[]
  xAxis?: {
    assigneeIds?: string[]
  }
  series?: {
    statusIds?: string[]
  }
}

type IDBComponentBase = {
  title?: string
  icon?: string
  take?: number
  skip?: number
}

export type IDBComponentConfig = IDBComponentBase & IDBComponentFilter

export type IDBComponentColumnConfig = IDBComponentBase &
  IDBComponentColumnFilter

// export interface IDBComponentConfig extends IDBcomponentBase {
//   title?: string
//   icon?: string
//   startDate?: Date
//   endDate?: Date
//   take?: number
//   skip?: number
// }
//
const generateQueryCondition = ({
  projectIds,
  statusIds,
  assigneeIds,
  startDate,
  endDate,
  points,
  priority
}: IDBComponentFilter) => {
  const where: {
    [key: string]: unknown
  } = {}

  if (startDate || endDate) {
    const start = startDate ? new Date(startDate) : null
    const end = endDate ? new Date(endDate) : null
    // today tasks
    if (start && end && start.getTime() === end.getTime()) {
      console.log('date:today')
      const startAtZero = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate()
      )
      const nextDay = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate() + 1
      )
      where.AND = [
        { dueDate: { gte: startAtZero } },
        { dueDate: { lt: nextDay } }
      ]
    }

    // task in date range
    if (start && end && start.getTime() !== end.getTime()) {
      console.log('date:range', start, end)
      where.AND = [{ dueDate: { gte: start } }, { dueDate: { lte: end } }]
    }

    // upcoming tasks
    if (start && !end) {
      console.log('date:upcoming', start)
      where.dueDate = {
        gte: start
      }
    }

    // overdue tasks
    if (!start && end) {
      console.log('date:overdue')
      where.dueDate = {
        lte: end
      }
    }
  }

  if (assigneeIds && assigneeIds.length) {
    console.log('assignee', assigneeIds)
    where.assigneeIds = {
      hasSome: assigneeIds
    }
  }

  if (projectIds && projectIds.length) {
    const [operator, ...restProjectIds] = projectIds
    console.log('project', operator, restProjectIds)
    if (operator === 'not_in') {
      where.projectId = {
        notIn: restProjectIds
      }
    }

    if (operator === 'in') {
      where.projectId = {
        in: restProjectIds
      }
    }
  }

  if (statusIds && statusIds.length) {
    const [operator, ...restStatusIds] = statusIds
    console.log('status', operator, restStatusIds)

    if (operator === 'not_in') {
      where.taskStatusId = {
        notIn: restStatusIds
      }
    }

    if (operator === 'in') {
      where.taskStatusId = {
        in: restStatusIds
      }
    }
  }

  if (points && points.length) {
    console.log('points', points)
    where.taskPoint = {
      in: points
    }
  }

  if (priority && priority.length) {
    const [operator, ...rest] = priority
    console.log('priority', operator, rest)

    if (operator === 'not_in') {
      where.priority = {
        notIn: rest
      }
    }

    if (operator === 'in') {
      where.priority = {
        in: rest
      }
    }
  }

  return where
}

export const mdDBoardQueryTask = async (
  type: DashboardComponentType,
  { take, skip, ...restConfig }: IDBComponentConfig
) => {
  const where = generateQueryCondition(restConfig)
  console.log('Dboard component:', type)
  return taskModel.count({
    skip,
    take,
    where
  })
}

export const mdDBoardQuerySum = ({
  take,
  skip,
  ...restConfig
}: IDBComponentConfig) => {
  const where = generateQueryCondition(restConfig)
  console.log('dboard summary')
  return taskModel.count({
    skip,
    take,
    where
  })
}

const generateColumn = ({
  xAxis,
  series
}: Pick<IDBComponentColumnConfig, 'xAxis' | 'series'>) => {
  console.log('a')
  const columns = {}
  const xAxises = []
  if (xAxis.assigneeIds.length) {
    xAxis.assigneeIds.forEach(uid => {
      columns[uid] = {}
      xAxises.push(uid)
      if (series.statusIds.length) {
        series.statusIds.forEach(stt => {
          if (['in', 'not_in'].includes(stt)) return
          columns[uid][stt] = 0
        })
      }
    })
  }

  return [columns, xAxises]
}

export const mdDBoardQueryColumn = async ({
  take,
  skip,
  startDate,
  endDate,
  projectIds,
  xAxis,
  series
}: IDBComponentColumnConfig) => {
  console.log('dboard column ///////////////////////////')

  // normoalize configs
  const config: IDBComponentFilter = {
    assigneeIds: [],
    statusIds: []
  }

  config.startDate = startDate
  config.endDate = endDate

  if (xAxis.assigneeIds) {
    config.assigneeIds = xAxis.assigneeIds
  }

  if (series.statusIds) {
    config.statusIds = series.statusIds
  }

  if (projectIds) {
    config.projectIds = projectIds
  }

  const where = generateQueryCondition(config)

  // find task by query condition
  const tasks = await taskModel.findMany({
    where,
    select: {
      id: true,
      assigneeIds: true,
      taskStatusId: true,
      projectId: true,
      taskPoint: true,
      dueDate: true
    }
  })

  // generate default columns
  const [columns, xAxises] = generateColumn({
    xAxis,
    series
  })

  // mapping returned data to generated columns
  if (tasks.length) {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i]
      const colName = task.assigneeIds[0]

      if (!colName) continue

      if (!columns[colName]) {
        columns[colName] = {}
      }

      const column = columns[colName]
      const type = task.taskStatusId

      if (!column[type]) {
        column[type] = 0
      }

      column[type] += 1
    }
  }

  return {
    xAxis: xAxises,
    columns
  }
}
