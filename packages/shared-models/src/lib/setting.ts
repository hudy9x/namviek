import { ProjectSetting } from '@prisma/client'
import { projectSettingModel } from './_prisma'

export const mdSettingNotificationQuery = async (projectId: string) => {
  return projectSettingModel.findFirst({
    where: {
      projectId,
    }
  })
}

export const mdSettingNotificationUpdate = async (data: ProjectSetting) => {  
  const { id, ...newProjectSetting } = data
  return projectSettingModel.update({
    where: {
      id
    },
    data: newProjectSetting
  })
}
