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
    },
    orderBy: {
      point: 'desc'
    }
  })
}

export const mdTaskPointAddOne = async (data: Pick<TaskPoint, 'point' | 'projectId' | 'icon'>) => {
  return taskPointModel.create({
    data: data
  })
}

export const mdTaskPointUpdateOne = async (data: TaskPoint) => {
  const { id, ...newPoint } = data
  try {
    // return taskPointModel.update({
    return taskPointModel
      .update({
        where: {
          id
        },
        data: newPoint
      })
      .catch(err => console.log(`Update point get error: ${err}`))
  } catch (e) {
    console.log(JSON.stringify(e))
  }
}

export const mdTaskPointDelOne = async (id: string) => {
  return taskPointModel.delete({
    where: {
      id
    }
  })
}
