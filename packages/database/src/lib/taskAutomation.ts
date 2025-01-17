import { TaskAutomation } from '@prisma/client'
import { taskAutomation } from './_prisma'

export const mdAutomationGet = async (projectId: string) => {
  return taskAutomation.findMany({
    where: {
      projectId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export const mdAutomationPost = async (data: Omit<TaskAutomation, 'id'>) => {
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
  return taskAutomation.create({
    data: {
      organizationId,
      projectId,
      when: when || {},
      then: then || {},
      createdAt,
      createdBy,
      updatedAt,
      updatedBy
    }
  })
}

export const mdAutomationDel = async (id: string) => {
  return taskAutomation.delete({
    where: {
      id
    }
  })
}
