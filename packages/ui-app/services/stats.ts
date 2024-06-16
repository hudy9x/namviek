import { httpPost } from './_req';

export const statsService = {
  async get({ month, year, projectIds }: {
    month: number,
    year: number,
    projectIds: string[]
  }) {
    return httpPost(`/api/report`, {
      month,
      year,
      projectIds
    });
  }
}
