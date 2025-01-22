import { ProjectSettingNotification } from '@prisma/client'
import { httpDel, httpGet, httpPost, httpPut } from './_req'

export const projectSettingNotify = {
  update: (data: Partial<ProjectSettingNotification>) => {
    return httpPut('/api/project-setting/notification', data)
  },
  get: (projectId: string, signal: AbortSignal) => {
    return httpGet('/api/project-setting/notification', {
      params: { projectId },
      signal
    })
  }
}
