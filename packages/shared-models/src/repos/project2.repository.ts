// import { Project } from '@prisma/client'
import { ObjectId } from 'bson'
// import { projectModel } from './_prisma'

import { projectModel, IProjectField, castToObjectId } from "../schema";

export const mdProjectAdd = async (data: Omit<IProjectField, 'id'>) => {
  const id = new ObjectId().toString()
  return projectModel.create({ ...data, ...{ id } })
}

export const mdProjectGetReportSetting = async (id: string) => {
  return projectModel.findById(id, 'countProjectTask countMemberTask _id')
}

export const mdProjectUpdateReportSetting = async ({ projectId, countProjectTask, countMemberTask }: {
  projectId: string,
  countMemberTask: boolean
  countProjectTask: boolean
}) => {

  return await projectModel.findByIdAndUpdate(projectId, {
    countMemberTask,
    countProjectTask
  })
}

export const mdProjectGetOrgId = async (projectId: string) => {
  return projectModel.findById(projectId, 'organizationId')
}

export const mdProjectArchive = async ({
  projectId,
  isArchived,
  updatedAt,
  updatedBy
}: {
  projectId: string
  isArchived: boolean
  updatedAt: Date
  updatedBy: string
}) => {
  return projectModel.findByIdAndUpdate(projectId, {
    isArchived,
    updatedAt,
    updatedBy
  })
}

export const mdProjectUpdate = async (data: Partial<IProjectField>) => {
  const { id, ...rest } = data
  return projectModel.findByIdAndUpdate(id, {
    $set: rest
  })
}

export const mdProjectGetAllByIds = async (
  ids: string[],
  cond: {
    isArchived: boolean,
    orgId: string
  }
) => {
  const { isArchived, orgId } = cond
  const where: Record<string, unknown> = {}

  if (orgId) {
    where.organizationId = orgId
  }

  if (!isArchived) {
    where.$or = [
      {
        isArchived: {
          $exists: false
        }
      },
      {
        isArchived: false
      }
    ]
  } else {
    where.isArchived = true
  }

  return projectModel.find({
    _id: { $in: ids.map(castToObjectId) },
    ...where
  }).sort({ updatedAt: 1 })
}

export const mdProjectGet = async (id: string) => {
  return projectModel.findById(id)
}
