import { DashboardComponent } from '@prisma/client'
import { httpGet, httpPost } from './_req'

interface IDBoardProps {
  projectId: string
  title: string
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

export const dboardComponentCreate = (
  data: Partial<Omit<DashboardComponent, 'id'>>
) => {
  console.log(data)
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
