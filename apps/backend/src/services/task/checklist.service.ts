import { Task, TaskChecklist } from "@prisma/client"
import BadRequestException from "../../exceptions/BadRequestException"
import { TaskChecklistRepository, mdTaskGetOne, mdTaskUpdate } from "@shared/models"
import { CKEY, findNDelCaches } from "../../lib/redis"

export default class TaskChecklistService {
  private checklistRepo: TaskChecklistRepository
  constructor() {
    this.checklistRepo = new TaskChecklistRepository()
  }

  async get(taskId: string) {
    const results = await this.checklistRepo.getAllByTaskId(taskId)
    return results
  }

  async delete(checklistId: string) {

    if (!checklistId) {
      throw new BadRequestException()
    }

    const result = await this.checklistRepo.deleteById(checklistId)
    await this._updateTaskChecklistCounter(result.taskId)

    console.log(result)

    return result

  }

  async create(body: TaskChecklist) {
    const { title, order, taskId } = body

    const result = await this.checklistRepo.create({
      title,
      order: 1,
      taskId,
      done: false,
      doneAt: null
    })

    await this._updateTaskChecklistCounter(taskId)

    return result

  }

  async update(data: TaskChecklist) {
    const { title, done, order, id } = data


    if (!id) {
      throw new BadRequestException()
    }

    const checklistData = await this.checklistRepo.getById(id)
    let changed = false

    if (title !== checklistData.title) {
      checklistData.title = title
      changed = true
    }

    if (done !== checklistData.done) {
      checklistData.done = done
      changed = true
    }

    if (order !== checklistData.order) {
      checklistData.order = order

      if (order) {
        checklistData.doneAt = new Date()
      }

      changed = true
    }

    if (changed) {
      const { id, ...restData } = checklistData
      await this.checklistRepo.updateById(id, restData)
      await this._updateTaskChecklistCounter(checklistData.taskId)
      return 1
    }

    return 0

  }

  private async _updateTaskChecklistCounter(taskId) {
    const promises = [mdTaskGetOne(taskId), this.checklistRepo.getAllByTaskId(taskId)]

    const data = await Promise.all(promises)
    const taskData = data[0] as Task
    const checklist = data[1] as TaskChecklist[]


    if (!checklist || !checklist.length) return

    const [todo, done] = checklist.reduce((total, c) => {
      if (c.done) {
        total[1] += 1
      } else {
        total[0] += 1
      }

      return total
    }, [0, 0])


    taskData.checklistTodos = todo
    taskData.checklistDone = done

    await mdTaskUpdate(taskData)

    const key = [CKEY.TASK_QUERY, taskData.projectId]
    await findNDelCaches(key)

  }

}
