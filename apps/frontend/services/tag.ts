import { httpGet } from './_req';

export const projectTagGet = (projectId: string) => {
  return httpGet(`/api/project/tag/${projectId}`);
};
