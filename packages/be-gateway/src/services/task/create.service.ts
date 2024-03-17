import { Task } from '@prisma/client'
import ActivityService from '../activity.service'
import {
  CKEY,
  delCache,
  findCacheByTerm,
  findNDelCaches,
  incrCache,
  setJSONCache
} from '../../lib/redis'
import {
  ProjectSettingRepository,
  mdProjectGet,
  mdTaskAdd,
  mdTaskStatusWithDoneType,
  mdTaskStatusWithTodoType
} from '@shared/models'
import { deleteTodoCounter } from '../todo.counter'
import { genFrontendUrl } from '../../lib/url'
import { notifyToWebUsers } from '../../lib/buzzer'
import InternalErrorException from '../../exceptions/InternalErrorException'
import { padZero } from '@shared/libs'
import TaskReminderJob from '../../jobs/reminder.job'



export default class TaskCreateService {
  activityService: ActivityService
  taskReminderJob: TaskReminderJob
  projectSettingRepo: ProjectSettingRepository

  constructor() {
    this.activityService = new ActivityService()
    this.projectSettingRepo = new ProjectSettingRepository()
    this.taskReminderJob = new TaskReminderJob()
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

    const reminders = await this.getReminders({
      assigneeIds: task.assigneeIds,
      projectId: task.projectId
    })

    const receivers = [...task.assigneeIds, ...reminders]

    if (!receivers.length) {
      return
    }

    // remind at due date
    this.taskReminderJob.create({
      remindAt: task.dueDate,
      taskId: task.id,
      projectId: task.projectId,
      message: task.title,
      receivers
    })

    // remind before 60 minutes
    this.taskReminderJob.create({
      remindAt: task.dueDate,
      remindBefore: 60,
      taskId: task.id,
      projectId: task.projectId,
      message: task.title,
      receivers
    })

  }

  async getReminders({ assigneeIds, projectId }: { assigneeIds: string[], projectId: string }) {
    const watchers = await this.projectSettingRepo.getAllRemindSettings(
      projectId
    )
    return [...assigneeIds, ...watchers]
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
