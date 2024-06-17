import { httpPost } from './_req';

export const reportService = {
  async get({ month, year, projectIds }: {
    month: number,
    year: number,
    projectIds: string[]
  }) {
    return httpPost(`/api/report/project`, {
      month,
      year,
      projectIds
    });
  },

  async getMemberReport({ month, year, projectIds, memberIds }: {
    month: number,
    year: number,
    projectIds: string[],
    memberIds: string[]
  }) {
    return httpPost(`/api/report/members`, {
      month,
      year,
      memberIds,
      projectIds
    });
  }
}
