import { httpGet } from './_req';

export const getProjectMember = (projectId: string) => {
  return httpGet('/api/project/member', {
    params: { projectId }
  });
};
