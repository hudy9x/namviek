import { mdProjectGetReportSetting, mdProjectUpdateReportSetting } from "@shared/models"

export interface IProjectReportSettingBody {
  projectId: string,
  countMemberTask: boolean
  countProjectTask: boolean
}

export default class ProjectSettingReportService {
  async getReportSetting(projectId: string) {
    return await mdProjectGetReportSetting(projectId)
  }

  async updateReportSetting({
    projectId,
    countMemberTask,
    countProjectTask }: IProjectReportSettingBody) {

    return await mdProjectUpdateReportSetting({
      projectId,
      countMemberTask,
      countProjectTask
    })

  }
}
