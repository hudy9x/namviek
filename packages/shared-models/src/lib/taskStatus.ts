import { taskStatusModel } from './_prisma';

export const mdTaskStatusGetByProjectId = async (projectId: string) => {
  return taskStatusModel.findMany({
    where: {
      projectId
    }
  });
};
