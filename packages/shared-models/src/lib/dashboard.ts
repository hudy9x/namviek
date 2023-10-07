/* eslint-disable no-prototype-builtins */
import {
  Dashboard,
  DashboardComponent,
  DashboardComponentType
} from '@prisma/client'
import { dboardComponentModal, dboardModel, taskModel } from './_prisma'
import { count } from 'console'

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

type IDBComponentLineFilter = {
  startDate?: Date
  endDate?: Date
  projectIds?: string[]
  xAxis?: {
    dates?: string[]
  }
  series?: {
    ideal?: string[]
    actual?: string[]
  }
}

type IDBComponentBase = {
  title?: string
  icon?: string
  take?: number
  skip?: number
}

type Task = {
  id: string
  dueDate: Date | null
  plannedDueDate: Date | null
}


export type IDBComponentConfig = IDBComponentBase & IDBComponentFilter

export type IDBComponentColumnConfig = IDBComponentBase &
  IDBComponentColumnFilter

export type IDBComponentLineConfig = IDBComponentBase &
IDBComponentLineFilter
  

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

type TDateChart = {
  dueDateMax: number
  dueDateMin: number
  planedMinArr: number[]
  planedMaxArr: number[]
  planedDateArr: number[]
  dates: number[]
}

const handleDates = (tasks: Task[]): TDateChart => {
  
  let planeDateMin = Infinity
  let planeDateMax = -Infinity
  let dueDateMin = Infinity
  let dueDateMax = -Infinity
  
  for(const task of tasks) {
    if(task.plannedDueDate) {
      const datePlaned = new Date(task.plannedDueDate).getDate()
      if (datePlaned > planeDateMax) {
        planeDateMax = datePlaned
      }
      if (datePlaned < planeDateMin) {
        planeDateMin = datePlaned
      }
    }

    if(task.dueDate) {
      const datePlaned = new Date(task.dueDate).getDate()
      if (datePlaned > dueDateMax) {
        dueDateMax = datePlaned
      }
      if (datePlaned < dueDateMin) {
        dueDateMin = datePlaned
      }
    }
  }
  
  const planedDateArr = []
  for (let i = planeDateMin; i <= planeDateMax; i++) {
    planedDateArr.push(i)
  }

  const planedMinArr = []
  const planedMaxArr = []
  for(const task of tasks) {
    const dueDate = new Date(task.dueDate).getDate()
    if(dueDate < planeDateMin) {
      planedMinArr.push(dueDate)
    } 

    if(dueDate > planeDateMax) {
      planedMaxArr.push(dueDate)
    }
  }

  planedMinArr.sort((a, b) => a - b)
  planedMaxArr.sort((a, b) => a - b)

  return {
    dueDateMax,
    dueDateMin,
    planedMinArr,
    planedDateArr,
    planedMaxArr,
    dates: [0, ...planedMinArr, ...planedDateArr, ...planedMaxArr]
  }
}

const handleIdeal = (date: TDateChart, tasks: Task[]) => {
  const { planedMinArr, planedDateArr } = date

  const totalTask = tasks.length
  let remainingTask = totalTask
  
  const minIdealArr = Array(planedMinArr.length).fill(totalTask)
  const idealArr = []

  for (const planedDate of planedDateArr) {
    const existPlanedDate = tasks.some((task) => new Date(task.plannedDueDate).getDate() === planedDate)
    if (existPlanedDate) {
      const countTask = tasks.filter((task) => new Date(task.plannedDueDate).getDate() === planedDate).length
      remainingTask = remainingTask - countTask

      idealArr.push(remainingTask)
    } else {
      idealArr.push(remainingTask)
    }
  }

  return [totalTask ,...minIdealArr, ...idealArr]
}

const handleActual = (date: TDateChart, tasks: Task[]) => {
  const { dates, dueDateMin, dueDateMax } = date

  const actual = []
  const index = dates.indexOf(dueDateMax)
  const dateActualArr = dates.slice(0, index + 1);

  for (const dateActual of dateActualArr) {

    const existDueDate = tasks.some((task) => new Date(task.dueDate).getDate() === dateActual)
    if (existDueDate) {
      let countTask = tasks.filter((task) => new Date(task.dueDate).getDate() === dateActual).length
      if (dateActual === dueDateMax) {
        countTask = 0
      }

      actual.push(countTask)
    } else {
      let countTask = tasks.filter((task) => new Date(task.dueDate).getDate() < dateActual).length
      if (dateActual < dueDateMin) {
        countTask = tasks.length
      }

      if (dateActual > dueDateMax) {
        countTask = 0
      }
      actual.push(countTask)
    }
  }

  return actual
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

const convertDate = (date, dates) => {
  if (!Array.isArray(dates) || typeof date !== 'string') {
    throw new Error('Invalid input data');
  }

  return dates.map((day, index) => {
    if (day === 0 && index === 0 ) return 'Day'
    const month = new Date(`${date}`).getMonth() + 1
    return `${day}/${month}`
  })
}

export const mdDBoardQueryLine = async ({
  startDate,
  endDate,
  projectIds
}: IDBComponentLineConfig) => {
  const config: IDBComponentFilter = {
    assigneeIds: [],
    statusIds: []
  }

  config.startDate = startDate
  config.endDate = endDate

  if (projectIds) {
    config.projectIds = projectIds
  }

  const where = generateQueryCondition(config)
  const tasks = await taskModel.findMany({
    where,
    select: {
      id: true,
      dueDate: true,
      plannedDueDate: true,
    },
  });
  
  const dates = handleDates(tasks)
  const ideal = handleIdeal(dates, tasks)
  const actual = handleActual(dates, tasks)
  
  const formatDate = convertDate(endDate, dates.dates)
  return {
    dates: formatDate,
    ideal,
    actual
  }
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
