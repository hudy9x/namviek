import {
  Dashboard,
  DashboardComponent,
  DashboardComponentType
} from '@prisma/client'
import { dboardComponentModal, dboardModel, taskModel } from './_prisma'

export const mdDBoardGetComponents = async (projectId: string) => {
  const dboard = await dboardModel.findFirst({ where: { projectId } })
  return dboardComponentModal.findMany({
    where: {
      dashboardId: dboard.id
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

export interface IDBComponentConfig {
  title?: string
  icon?: string
  projectIds?: string[]
  statusIds?: string[]
  tagIds?: string[]
  assigneeIds?: string[]
  points?: number[]
  priority?: string[]
  startDate?: Date
  endDate?: Date
  take?: number
  skip?: number
}

export const mdDBoardQueryTask = async (
  type: DashboardComponentType,
  {
    projectIds,
    statusIds,
    assigneeIds,
    startDate,
    endDate,
    points,
    priority,
    take,
    skip
  }: IDBComponentConfig
) => {
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
      console.log('date:range')
      where.AND = [{ dueDate: { gte: start } }, { dueDate: { lte: end } }]
    }

    // upcoming tasks
    if (start && !end) {
      console.log('date:upcoming')
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

  console.log('Dboard component:', type)
  if (type === DashboardComponentType.SUMMARY) {
    return taskModel.count({
      skip,
      take,
      where
    })
  }

  return taskModel.findMany({
    skip,
    take,
    where
    // where: {
    //   assigneeIds: {
    //     in
    //   }
    // }
  })
}

export const mdDBoardQuerySum = (query: IDBComponentConfig) => {
  return mdDBoardQueryTask(DashboardComponentType.SUMMARY, query)
}
