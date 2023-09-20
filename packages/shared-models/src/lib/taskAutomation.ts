import { TaskAutomation } from '@prisma/client'
import { pmClient, taskAutomation } from './_prisma'

export const mdAutomationGet = async (projectId: string) => {
  return taskAutomation.findMany({
    where: {
      projectId
    }
  })
}

// export const mdAutomationPost = async (data: TaskAutomation) => {
export const mdAutomationPost = async (data: Omit<TaskAutomation, 'id'>) => {
  console.log(data)
  return taskAutomation.create({
    data
  })

  // return pmClient.$runCommandRaw({
  //   insert: 'TaskAutomation',
  //   documents: [data]
  // })
}

export const mdAutomationDel = async (id: string) => {
  return taskAutomation.delete({
    where: {
      id
    }
  })
}
