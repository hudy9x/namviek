import { TaskChecklist } from "@prisma/client"
import { taskChecklistModel } from "./_prisma"

export class TaskChecklistRepository {
  constructor(private model = taskChecklistModel) {

  }

  async getById(cid: string) {
    return this.model.findFirst({
      where: {
        id: cid
      }
    })
  }

  async getAllByTaskId(taskId: string) {
    return this.model.findMany({
      where: {
        taskId
      },
      orderBy: {
        order: 'asc'
      }

    })
  }

  async create(data: Omit<TaskChecklist, 'id'>) {

    return this.model.create({
      data
    })
  }

  async updateById(id: string, data: Partial<Omit<TaskChecklist, 'id'>>) {
    return this.model.update({
      where: {
        id
      },
      data
    })
  }

  async deleteById(id: string) {
    return this.model.delete({
      where: { id }
    })
  }




}






