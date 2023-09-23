import { TaskAutomation } from '@prisma/client'
import { httpDel, httpGet, httpPost, httpPut } from './_req'

export const automationGet = (projectId: string) => {
  return httpGet(`/api/automation?projectId=${projectId}`)
}

export const automationAdd = (data: Partial<TaskAutomation>) => {
  return httpPost('/api/automation', data)
}

export const automationUpdate = (data: Partial<TaskAutomation>) => {
  return httpPut('/api/automation', data)
}

export const automationDel = (id: string) => {
  return httpDel('/api/automation', {
    params: { id }
  })
}
