// import { TaskAutomation } from '@prisma/client'
// import { taskAutomation } from './_prisma'
import { taskAutomationModel, ITaskAutomationField, castToObjectId } from "../schema";

export const mdAutomationGet = async (projectId: string) => {
  return taskAutomationModel.find({
    projectId: castToObjectId(projectId)
  }).sort({ createdAt: -1 })
}

export const mdAutomationPost = async (data: Omit<ITaskAutomationField, 'id'>) => {
  const {
    organizationId,
    projectId,
    when,
    then,
    createdAt,
    createdBy,
    updatedAt,
    updatedBy
  } = data
  return taskAutomationModel.create({
    organizationId,
    projectId,
    when: when || {},
    then: then || {},
    createdAt,
    createdBy,
    updatedAt,
    updatedBy
  })
}

export const mdAutomationDel = async (id: string) => {
  return taskAutomationModel.findByIdAndDelete(id)
}
