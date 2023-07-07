import { taskPointModel } from './_prisma';

export const mdTaskPointGetByProjectId = async (projectId: string) => {
  return taskPointModel.findMany({
    where: {
      projectId
    }
  });
};
