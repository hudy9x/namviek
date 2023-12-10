import { ProjectSetting } from "@prisma/client"
import { httpGet, httpPut } from "./_req"

export const projectSettingGet = (projectId: string) => {
  return httpGet(`/api/project-setting/notification/${projectId}`)
}

export const projectSettingUpdate = (data: Partial<ProjectSetting>) => {
  return httpPut('/api/project-setting/notification', data)
}
