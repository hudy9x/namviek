import { httpGet } from './_req';

export const statsService = {
  async get({ orgId, month, year }: { orgId: string, month: number, year: number }) {
    return httpGet(`/api/report/${orgId}/${month}/${year}`);
  }
}
