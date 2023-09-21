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
  return taskAutomation.create({
    data
  })
}

export const mdAutomationDel = async (id: string) => {
  return taskAutomation.delete({
    where: {
      id
    }
  })
}
