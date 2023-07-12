import { TaskStatus } from '@prisma/client';
import { httpDel, httpGet, httpPost, httpPut } from './_req';

export const projectStatusGet = (projectId: string) => {
  return httpGet(`/api/project/status/${projectId}`);
};

export const projectStatusAdd = (data: TaskStatus) => {
  return httpPost(`/api/project/status/${data.projectId}`, data);
};

export const projectStatusEdit = (data: Partial<TaskStatus>) => {
	return httpPut('/api/project/status', data)
}

export const projectStatusDel = (id: string) => {
	return httpDel(`/api/project/status/${id}`)
}
