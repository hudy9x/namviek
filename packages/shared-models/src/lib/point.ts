import { TaskPoint } from '@prisma/client';
import { tskPointModel } from './_prisma';

export const mdTskPointGetOne = async (projectId: string | string[]) => {
	return tskPointModel.findFirst({
		where: {
			id: {
				in: Array.isArray(projectId) ? projectId : [projectId]
			}
		}
	});
};

export const mdTskPointGet = async (projectId: string) => {
	return tskPointModel.findMany({
		where: {
			projectId: {
				equals: projectId
			}
		}
	});
};

export const mdTskPointAdd = async (data: Pick<TaskPoint, 'point' | 'projectId'>) => {
	return tskPointModel.create({
		data: data
	});
};
