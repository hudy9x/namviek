import { httpGet } from './_req';

export const projectStatusGet = (projectId: string) => {
  return httpGet(`/api/project/status/${projectId}`);
};
