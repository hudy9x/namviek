import { httpGet, httpPost } from './_req';

export const statsService = {
  async get({ orgId, month, year, projectIds }: {
    orgId: string,
    month: number,
    year: number,
    projectIds: string[]
  }) {
    return httpPost(`/api/report`, {
      orgId,
      month,
      year,
      projectIds
    });
  }
}
