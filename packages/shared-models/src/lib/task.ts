import { Task, TaskPriority } from '@prisma/client';
import { taskModel } from './_prisma';

interface ITaskQuery {
  term?: string;
  projectId?: string;
  skip?: number;
  take?: number;
  assignees?: string[];
  priority?: TaskPriority;
}
export const mdTaskGetAll = async ({ projectId }: ITaskQuery) => {
  return taskModel.findMany({
    where: {
      projectId
    }
  });
};

export const mdTaskAdd = async (data: Omit<Task, 'id'>) => {
  return taskModel.create({
    data
  });
};
