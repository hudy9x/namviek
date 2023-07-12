import { TaskPoint } from '@prisma/client'
import { tskPointModel } from './_prisma'

export const mdTaskPointGetManyByProjectIds = async (projectIds: string[]) => {
	return tskPointModel.findFirst({
		where: {
			id: {
				in: projectIds
			}
		}
	})
}

// export const mdTskPointGetOne = async (projectId: string | string[]) => {
// 	return tskPointModel.findFirst({
// 		where: {
// 			id: {
// 				in: Array.isArray(projectId) ? projectId : [projectId]
// 			setting/point}
// 		}
// 	});
// };

export const mdTaskPointGetByProjectId = async (projectId: string) => {
	return tskPointModel.findMany({
		where: {
			projectId: {
				equals: projectId
			}
		}
	})
}

export const mdTaskPointAddOne = async (data: Pick<TaskPoint, 'point' | 'projectId' | 'icon'>) => {
	return tskPointModel.create({
		data: data
	})
}
