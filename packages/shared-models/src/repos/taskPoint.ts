// import { TaskPoint } from '@prisma/client'
// import { taskPointModel } from './_prisma'
import { taskPointModel, ITaskPointField, castToObjectId } from "../schema";

export const mdTaskPointGetManyByProjectIds = async (projectIds: string[]) => {
  return taskPointModel.findOne({
    _id: {
      $in: projectIds.map(castToObjectId)
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
  return taskPointModel.find({
    projectId: castToObjectId(projectId)
  }).sort({ point: -1 })
}

export const mdTaskPointAddMany = async (
  data: Pick<ITaskPointField, 'point' | 'projectId' | 'icon'>[]
) => {
  return taskPointModel.insertMany(data)
}

export const mdTaskPointAddOne = async (
  data: Pick<ITaskPointField, 'point' | 'projectId' | 'icon'>
) => {
  return taskPointModel.create(data)
}

export const mdTaskPointUpdateOne = async (data: ITaskPointField) => {
  const { id, ...newPoint } = data
  try {
    // return taskPointModel.update({
    return taskPointModel
      .findByIdAndUpdate(id, newPoint)
      .catch(err => console.log(`Update point get error: ${err}`))
  } catch (e) {
    console.log(JSON.stringify(e))
  }
}

export const mdTaskPointDelOne = async (id: string) => {
  return taskPointModel.findByIdAndDelete(id)
}
