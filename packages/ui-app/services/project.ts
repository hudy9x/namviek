import { Project } from '@prisma/client';
import { httpGet, httpPost } from './_req';

type IProjectAdd = Pick<Project, 'name' | 'desc' | 'organizationId'>;

export const projectGet = () => {
  return httpGet('/api/project');
};

export const projectQuickAdd = (data: IProjectAdd) => {
  console.log('project add data', data)
  return httpPost('/api/project', data);
};
