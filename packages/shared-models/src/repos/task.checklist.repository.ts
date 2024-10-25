// import { TaskChecklist } from "@prisma/client"
// import { taskChecklistModel } from "./_prisma"
import { taskChecklistModel, ITaskChecklistField } from "../schema";

export class TaskChecklistRepository {
  constructor(private model = taskChecklistModel) {

  }

  async getById(cid: string) {
    return this.model.findById(cid)
  }

  async getAllByTaskId(taskId: string) {
    return this.model.find({
      taskId
    }).sort({ order: 1 })
  }

  async create(data: Omit<ITaskChecklistField, 'id'>) {
    return this.model.create(data)
  }

  async updateById(id: string, data: Partial<Omit<ITaskChecklistField, 'id'>>) {
    return this.model.findByIdAndUpdate(id, data)
  }

  async deleteById(id: string) {
    return this.model.findByIdAndDelete(id)
  }




}






