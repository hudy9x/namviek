import { httpGet, httpPut } from './_req'

export const projectSettingReport = {
  update: (data: {
    projectId: string
    countMemberTask: boolean
    countProjectTask: boolean
  }) => {
    return httpPut('/api/project-setting/daily-report', data)
  },
  get: (projectId: string, signal: AbortSignal) => {
    return httpGet(`/api/project-setting/daily-report/${projectId}`, {
      signal
    })
  }
}
