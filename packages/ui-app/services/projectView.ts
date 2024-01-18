import { ProjectView } from '@prisma/client'
import { httpDel, httpGet, httpPost, httpPut } from './_req'

export const projectView = {
  add: (data: Partial<ProjectView>) => {
    return httpPost('/api/project-view', data)
  },
  update: (data: Partial<ProjectView>) => {
    return httpPut('/api/project-view', data)
  },
  delete: (id: string) => {
    return httpDel('/api/project-view', {
      params: { id }
    })
  },
  get: (projectId: string, signal: AbortSignal) => {
    return httpGet('/api/project-view', {
      params: { projectId },
      signal
    })
  }
}
