import { ProjectSettingNotification } from '@prisma/client'
import { projectNotifyModel } from './_prisma'

export class ProjectSettingRepository {
  async getMyNotifySettings({
    uid,
    projectId
  }: {
    uid: string
    projectId: string
  }) {
    return projectNotifyModel.findFirst({
      where: {
        uid,
        projectId
      }
    })
  }
  async getAllProjectNotifySettings({ projectId }: { projectId: string }) {
    return projectNotifyModel.findFirst({
      where: {
        projectId
      }
    })
  }

  async updateOrCreateNotifySetting(
    data: Omit<ProjectSettingNotification, 'id'>
  ) {
    const { uid, projectId } = data
    const myNotifySetting = await projectNotifyModel.findFirst({
      where: {
        uid,
        projectId
      }
    })

    if (myNotifySetting) {
      return projectNotifyModel.update({
        where: {
          id: myNotifySetting.id
        },
        data
      })
    } else {
      return projectNotifyModel.create({
        data
      })
    }
  }

  async createNotifySetting(data: Omit<ProjectSettingNotification, 'id'>) {
    return projectNotifyModel.create({
      data
    })
  }
}
