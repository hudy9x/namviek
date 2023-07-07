import { TaskPoint } from '@prisma/client'
import { taskPointModel } from './_prisma'

export const mdTaskPointGetManyByProjectIds = async (projectIds: string[]) => {
  return taskPointModel.findFirst({
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
  return taskPointModel.findMany({
    where: {
      projectId
    }
  })
}

export const mdTaskPointAddOne = async (data: Pick<TaskPoint, 'point' | 'projectId' | 'icon'>) => {
  return taskPointModel.create({
    data: data
  })
}
