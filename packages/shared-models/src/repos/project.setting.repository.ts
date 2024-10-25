import { ProjectSettingNotification } from '@prisma/client'
// import { projectNotifyModel } from './_prisma'
import { castToObjectId, projectSettingNotificationModel as projectNotifyModel } from "../schema";

export class ProjectSettingRepository {
  async getMyNotifySettings({
    uid,
    projectId
  }: {
    uid: string
    projectId: string
  }) {
    return projectNotifyModel.find({
      uid: castToObjectId(uid),
      projectId: castToObjectId(projectId)
      // where: {
      //   uid,
      //   projectId
      // }
    })
  }

  async getAllNotifySettings(projectId: string) {
    const settings = await projectNotifyModel.find({
      projectId: castToObjectId(projectId),
      taskChanges: true
      // select: {
      //   uid: true
      // }
    }, 'uid')

    if (settings.length) return settings.map(st => st.uid)


    return []
  }

  async getAllRemindSettings(projectId: string) {
    const settings = await projectNotifyModel.find({
      projectId: castToObjectId(projectId),
      remind: true
    }, 'uid')

    if (settings.length) return settings.map(st => st.uid)

    return []
  }

  async updateOrCreateNotifySetting(
    data: Omit<ProjectSettingNotification, 'id'>
  ) {
    const { uid, projectId } = data
    const myNotifySetting = await projectNotifyModel.findOne({
      uid: castToObjectId(uid),
      projectId: castToObjectId(projectId)
    })

    if (myNotifySetting) {
      return projectNotifyModel.findByIdAndUpdate(myNotifySetting.id, data)
    } else {
      return projectNotifyModel.create(data)
    }
  }

  async createNotifySetting(data: Omit<ProjectSettingNotification, 'id'>) {
    return projectNotifyModel.create(data)
  }
}
