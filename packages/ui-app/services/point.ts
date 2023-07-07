import { httpGet } from './_req';

export const projectPointGet = (projectId: string) => {
  return httpGet(`/api/project/point/${projectId}`);
};
