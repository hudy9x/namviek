import { httpPost } from './_req';

export const reportService = {
  async get({ duration, projectIds }: {
    duration: string
    projectIds: string[]
  }) {
    return httpPost(`/api/report/project`, {
      duration,
      projectIds
    });
  },

  async getMemberReport({ duration, projectIds, memberId }: {
    duration: string
    projectIds: string[],
    memberId: string
  }) {
    return httpPost(`/api/report/members`, {
      duration,
      memberId,
      projectIds
    });
  }
}
