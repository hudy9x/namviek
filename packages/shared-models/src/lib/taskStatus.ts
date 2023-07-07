import { TaskStatus } from '@prisma/client';
import { taskStatusModel } from './_prisma';

export const mdTaskStatusGetByProjectId = async (projectId: string) => {
  return taskStatusModel.findMany({
    where: {
      projectId
    }
  });
};

export const mdTaskStatusAdd = async (data: Omit<TaskStatus, 'id'>) => {
	return taskStatusModel.create({
		data: { ...data }
	})
}

export const mdTaskStatusUpdate = async (id: string, data: Partial<TaskStatus>) => {
	return taskStatusModel.update({
		where: {
			id,
		},
		data: data
	})
}

export const mdTaskStatusDel = async (id: string) => {
	return taskStatusModel.delete({
		where: {
			id,
		}
	})
}
