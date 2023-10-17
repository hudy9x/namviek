import { Vision } from '@prisma/client'
import { visionModel } from './_prisma'

export const mdVisionGetByProject = async (projectId: string) => {
  return visionModel.findMany({
    where: {
      projectId
    }
  })
}

export const mdVisionGetByOrg = async (organizationId: string) => {
  return visionModel.findMany({
    where: {
      organizationId
    }
  })
}

export const mdVisionAdd = async (data: Omit<Vision, 'id'>) => {
  return visionModel.create({
    data
  })
}

export const mdVisionDel = async (id: string) => {
  return visionModel.delete({
    where: {
      id
    }
  })
}

export const mdVisionUpdate = async ({
  id,
  data
}: {
  id: string
  data: Omit<Vision, 'id'>
}) => {
  return visionModel.update({
    where: {
      id
    },
    data
  })
}
