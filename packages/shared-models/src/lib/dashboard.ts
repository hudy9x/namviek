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

interface IDBComponentConfig {
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
    const start = startDate
    const end = endDate
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

  if (projectIds && projectIds.length) {
    where.projectId = {
      in: projectIds
    }
  }

  if (statusIds && statusIds.length) {
    where.taskStatusId = {
      in: statusIds
    }
  }

  if (points && points.length) {
    where.taskPoint = {
      in: points
    }
  }

  if (priority && priority.length) {
    where.priority = {
      in: priority
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
