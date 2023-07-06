import { Task } from '@prisma/client';
import { httpGet, httpPost } from './_req';

type ITaskFields = Partial<Task>;

export const taskGet = () => {
  return httpGet('/api/project/task');
};

export const taskAdd = (data: ITaskFields) => {
  return httpPost('/api/project/task', data);
};
