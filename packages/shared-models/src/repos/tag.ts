// import { tagModel } from './_prisma';
import { castToObjectId, tagModel } from "../schema";

export const mdTagGetByProjectId = async (projectId: string) => {
  return tagModel.find({
    projectId: castToObjectId(projectId)
  });
};
