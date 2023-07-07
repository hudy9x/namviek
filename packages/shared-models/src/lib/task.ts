import { Task } from "@prisma/client"
import { taskModel } from "./_prisma"

export const mdTaskAdd = async (data: Omit<Task, 'id'>) => {

  return taskModel.create({
    data
  })
}

