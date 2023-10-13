import { DashboardComponent, DashboardComponentType } from '@prisma/client'
import { httpDel, httpGet, httpPost } from './_req'

interface IDBoardProps {
  projectId: string
  title: string
  isDefault: boolean
}

export const dboardCreate = ({ projectId, title }: IDBoardProps) => {
  return httpPost(`/api/dboard`, {
    projectId,
    title
  })
}

export const dboardGet = (projectId: string) => {
  console.log('dboard get ', projectId)
  return httpGet('/api/dboard', {
    params: {
      projectId
    }
  })
}

export const dboardGetComponents = (dboardId: string) => {
  return httpGet('/api/dboard/components', {
    params: {
      dboardId
    }
  })
}

export const dboardComponentDel = (componentId: string) => {
  return httpDel('/api/dboard/component', {
    data: {
      componentId
    }
  })
}

export const dboardComponentCreate = (
  data: Partial<Omit<DashboardComponent, 'id'>>
) => {
  console.log('dboard component creaet', data)
  return httpPost('/api/dboard/component', data)
}

type DateOperation = '>' | '>=' | '=' | '<' | '<='
type DateString = 'today' | 'week' | 'month'
type DateWithOperation = [DateOperation, DateString]

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
  dateQuery?: DateWithOperation
}

export const dboardQuerySummary = (query: IDBComponentConfig) => {
  return httpPost('/api/dboard/query-summary', query)
}

export const dboardQueryColumn = (query: IDBComponentConfig) => {
  return httpPost('/api/dboard/query-column', query)
}

export const dboardQueryBurnChart = (query: IDBComponentConfig, type: DashboardComponentType) => {
  return httpPost(`/api/dboard/query-burnchart/${type}`, query)
}
