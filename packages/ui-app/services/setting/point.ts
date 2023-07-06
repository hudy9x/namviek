import { TaskPoint } from '@prisma/client';
import { httpGet, httpPost } from '../_req';

export const taskPointCreate = (data: Pick<TaskPoint, 'point' | 'projectId'>) => {
  console.log({ data });
  return httpPost('/api/setting/point', data);
};

export const taskPointGet = (projectId: string) => {
  return httpGet('/api/setting/point');
};
