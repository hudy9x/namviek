import { tagModel } from './_prisma';

export const mdTagGetByProjectId = async (projectId: string) => {
  return tagModel.findMany({
    where: {
      projectId
    }
  });
};
