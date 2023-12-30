import { ProjectSetting } from '@prisma/client'
import { projectSettingModel } from './_prisma'

export const mdProjectSettingQuery = async (projectId: string) => {
  return projectSettingModel.findFirst({
    where: {
      projectId,
    }
  })
}

export const mdProjectSettingUpdate = async (data: ProjectSetting) => {  
  const { id, ...newProjectSetting } = data
  return projectSettingModel.update({
    where: {
      id
    },
    data: newProjectSetting
  })
}

export const mdProjectSettingAdd = async (data: Omit<ProjectSetting, 'id'>) => {
  return projectSettingModel.create({
    data: { ...data }
  })
}

