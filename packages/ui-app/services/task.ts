import { Task } from '@prisma/client';
import { httpGet, httpPost } from './_req';

type ITaskFields = Partial<Task>;

export const taskGetAll = (projectId: string) => {
  return httpGet(`/api/project/task?projectId=${projectId}`);
};

export const taskAdd = (data: ITaskFields) => {
  return httpPost('/api/project/task', data);
};
