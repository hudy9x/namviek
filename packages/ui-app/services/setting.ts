import { ProjectSetting } from "@prisma/client"
import { httpGet, httpPut, httpPost } from "./_req"

export const projectSettingGet = (projectId: string) => {
  return httpGet(`/api/project-setting/notification/${projectId}`)
}

export const projectSettingUpdate = (data: Partial<ProjectSetting>) => {
  return httpPut('/api/project-setting/notification', data)
}

export const projectSettingAdd = (data: Partial<ProjectSetting>) => {
  return httpPost('/api/project-setting/notification', data)
}
