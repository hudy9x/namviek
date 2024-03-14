import { Task } from '@prisma/client'
import ActivityService from './activity.service'
import { CKEY, findNDelCaches, incrCache, setJSONCache } from '../lib/redis'
import {
  mdProjectGet,
  mdTaskAdd,
  mdTaskStatusWithDoneType,
  mdTaskStatusWithTodoType
} from '@shared/models'
import { deleteTodoCounter } from './todo.counter'
import { genFrontendUrl } from '../lib/url'
import { notifyToWebUsers } from '../lib/buzzer'
import InternalErrorException from '../exceptions/InternalErrorException'

export default class TaskService {
  activityService: ActivityService
  constructor() {
    this.activityService = new ActivityService()
  }
  async createNewTask({ uid, body }: { uid: string; body: Task }) {
    {
      const activityService = this.activityService
      const {
        desc,
        visionId,
        assigneeIds,
        title,
        dueDate,
        projectId,
        priority,
        progress
      } = body
      let taskStatusId = body.taskStatusId

      const key = [CKEY.TASK_QUERY, projectId]
      const counterKey = [CKEY.PROJECT_TASK_COUNTER, projectId]

      try {
        const doneStatus = await mdTaskStatusWithDoneType(projectId)
        const done = doneStatus && doneStatus.id === taskStatusId ? true : false

        if (!taskStatusId) {
          const todoStatus = await mdTaskStatusWithTodoType(projectId)
          taskStatusId = todoStatus.id
        }

        const order = await incrCache(counterKey)
        const result = await mdTaskAdd({
          title,
          cover: null,
          order: order,
          startDate: null,
          dueDate: dueDate || null,
          plannedStartDate: dueDate || null,
          plannedDueDate: dueDate || null,
          assigneeIds,
          desc,
          done,
          fileIds: [],
          projectId,
          priority,
          taskStatusId: taskStatusId,
          tagIds: [],
          visionId: visionId || null,
          parentTaskId: null,
          taskPoint: null,
          createdBy: uid,
          createdAt: new Date(),
          updatedAt: null,
          updatedBy: null,
          progress
        })

        activityService.createTask({
          id: result.id,
          userId: uid
        })

        const processes = []

        // delete todo counter
        if (assigneeIds && assigneeIds[0]) {
          processes.push(deleteTodoCounter([assigneeIds[0], projectId]))
        }

        // delete all cached tasks
        processes.push(findNDelCaches(key))

        // run all process
        await Promise.allSettled(processes)

        this.notifyNewTaskToAssignee({ uid, task: result })
        this.createTaskReminder(result)

        return result
      } catch (error) {
        console.log(error)
        throw new InternalErrorException(error)
      }
    }
  }

  async createTaskReminder(task: Task) {
    const dueDate = task.dueDate
    const d1 = new Date(dueDate)
    const now = new Date()

    if (d1 < now) {
      console.log('can not create reminder for past tasks')
      return
    }

    const expired = (d1.getTime() - now.getTime()) / 1000
    const more5min = 5 * 60

    const y = d1.getFullYear()
    const m = d1.getMonth()
    const d = d1.getDate()
    const hour = d1.getHours()
    const min = d1.getMinutes()
    const pZero = n => (n < 10 ? '0' + n : n)

    const key = [
      `remind-${y}-${pZero(m)}-${pZero(d)}-${pZero(hour)}:${pZero(min)}-${task.id
      }`
    ]
    console.log(key)

    // setJSONCache(key, task, Math.ceil(expired + more5min))
    setJSONCache(key, task)
  }

  async notifyNewTaskToAssignee({ uid, task }: { uid: string; task: Task }) {
    const assigneeIds = task.assigneeIds
    if (!assigneeIds.length) return

    // if creator and assignee is the same person
    // do not send notification
    const filtered = assigneeIds.filter(assignee => assignee !== uid)

    if (!filtered.length) return

    const project = await mdProjectGet(task.projectId)
    const taskLink = genFrontendUrl(
      `${project.organizationId}/project/${task.projectId}?mode=task&taskId=${task.id}`
    )

    notifyToWebUsers(filtered, {
      title: 'Got a new task',
      body: `${task.title}`,
      deep_link: taskLink
    })
  }
}
