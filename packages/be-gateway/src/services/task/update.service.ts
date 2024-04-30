import { Task } from '@prisma/client'
import ActivityService from '../activity.service'
import { CKEY, findNDelCaches } from '../../lib/redis'
import {
  ProjectSettingRepository,
  mdProjectGet,
  mdTaskGetOne,
  mdTaskStatusWithDoneType,
  mdTaskUpdate
} from '@shared/models'
import { deleteTodoCounter } from '..//todo.counter'
import { genFrontendUrl } from '../../lib/url'
import { notifyToWebUsers } from '../../lib/buzzer'
import InternalErrorException from '../../exceptions/InternalErrorException'
import { serviceGetStatusById } from '../status'
import { serviceGetProjectById } from '../project'
import TaskReminderJob from '../../jobs/reminder.job'
import TaskPusherJob from '../../jobs/task.pusher.job'

export default class TaskUpdateService {
  activityService: ActivityService
  projectSettingRepo: ProjectSettingRepository
  taskReminderJob: TaskReminderJob
  taskSyncJob: TaskPusherJob

  constructor() {
    this.activityService = new ActivityService()
    this.projectSettingRepo = new ProjectSettingRepository()
    this.taskReminderJob = new TaskReminderJob()
    this.taskSyncJob = new TaskPusherJob()
  }
  async doUpdate({ userId, body }: { userId: string; body: Task }) {
    const activityService = this.activityService

    try {
      const {
        taskData,
        oldTaskData,
        oldAssigneeId,
        oldProgress,
        oldStatusId,
        isDoneBefore,
        isDueDateChanged
      } = await this._genUpdateData({ body, userId })

      const result = await mdTaskUpdate(taskData)

      console.log('task update', result)

      const isDone = result.done

      activityService.updateTaskActivity({
        taskData: oldTaskData,
        updatedTaskData: body,
        userId
      })

      this.taskSyncJob.triggerUpdateEvent({
        projectId: result.projectId,
        uid: userId
      })

      await this._clearRelativeCaches({
        assigneeIds: result.assigneeIds,
        oldAssigneeId,
        projectId: result.projectId
      })

      // send notification as status changed
      if (oldStatusId !== result.taskStatusId) {
        this._sendNotificationAsStatusChanges({
          userId,
          task: result
        })
      }

      if (oldProgress !== result.progress) {
        this._sendNotificationAsProgressChanges({
          userId,
          task: result,
          oldProgress: oldProgress || 0
        })
      }

      if (isDueDateChanged && !isDone) {
        // delete reminders in caches
        this._deleteTaskReminderById(result.id)
        // and create new reminder
        this._createTaskReminder(result)
      }

      if (isDone) {
        this._deleteTaskReminderById(result.id)
      }

      return result
      // })
    } catch (error) {
      throw new InternalErrorException(error)
    }
  }

  private async _genUpdateData({
    body,
    userId
  }: {
    body: Task
    userId: string
  }) {
    const {
      id,
      title,
      dueDate,
      assigneeIds,
      fileIds,
      desc,
      type,

      priority,
      taskStatusId,
      plannedDueDate,
      visionId,
      progress,
      taskPoint
    } = body

    const taskData = await mdTaskGetOne(id)
    const oldTaskData = structuredClone(taskData)
    const isDoneBefore = taskData.done
    const oldStatusId = taskData.taskStatusId
    const oldProgress = taskData.progress
    const oldAssigneeId = taskData?.assigneeIds[0]
    let isDueDateChanged = false

    if (title) {
      taskData.title = title
    }

    if (desc) {
      taskData.desc = desc
    }

    if (taskStatusId) {
      const doneStatus = await mdTaskStatusWithDoneType(taskData.projectId)

      taskData.taskStatusId = taskStatusId
      if (doneStatus && doneStatus.id === taskStatusId) {
        taskData.done = true
      }
    } else {
      taskData.done = false
    }

    if (plannedDueDate) {
      taskData.plannedDueDate = plannedDueDate
    }

    if (type) {
      taskData.type = type
    }

    if (assigneeIds) {
      if (!assigneeIds.filter(Boolean).length) {
        taskData.assigneeIds = []
      } else {
        taskData.assigneeIds = assigneeIds
      }
    }

    if (priority) {
      taskData.priority = priority
    }

    if (taskPoint) {
      taskData.taskPoint = taskPoint
    }

    if (dueDate) {
      isDueDateChanged = true
      taskData.dueDate = dueDate
    }

    if (progress) {
      taskData.progress = progress
    }

    if (fileIds && fileIds.length) {
      const oldFileIds = taskData.fileIds || []
      taskData.fileIds = [...fileIds, ...oldFileIds]
    }

    if (visionId) {
      taskData.visionId = visionId
    }

    taskData.updatedAt = new Date()
    taskData.updatedBy = userId

    return {
      isDueDateChanged,
      oldTaskData,
      isDoneBefore,
      oldStatusId,
      oldProgress,
      oldAssigneeId,
      taskData
    }
  }

  private async _clearRelativeCaches({
    oldAssigneeId,
    projectId,
    assigneeIds
  }: {
    oldAssigneeId: string
    projectId: string
    assigneeIds: string[]
  }) {
    console.log('clear relative caches')

    const processes = []

    // delete todo counter
    if (oldAssigneeId) {
      processes.push(deleteTodoCounter([oldAssigneeId, projectId]))
    }

    if (assigneeIds && assigneeIds[0] && assigneeIds[0] !== oldAssigneeId) {
      processes.push(deleteTodoCounter([assigneeIds[0], projectId]))
    }

    // delete cached tasks
    const key = [CKEY.TASK_QUERY, projectId]
    processes.push(findNDelCaches(key))

    await Promise.allSettled(processes)
  }

  async getWatchers({ userId, task }: { userId: string; task: Task }) {
    const watchers = await this.projectSettingRepo.getAllNotifySettings(
      task.projectId
    )
    // merge watchers and make sure that do not send it to user who updated this task
    const watcherList = [...task.assigneeIds, ...watchers].filter(
      uid => uid !== userId
    )
    return watcherList
  }

  private async _sendNotificationAsStatusChanges({
    userId,
    task
  }: {
    userId: string
    task: Task
  }) {
    const newStatus = await serviceGetStatusById(task.taskStatusId)
    const pinfo = await serviceGetProjectById(task.projectId)
    const taskLink = genFrontendUrl(
      `${pinfo.organizationId}/project/${task.projectId}?mode=task&taskId=${task.id}`
    )

    const watcherList = await this.getWatchers({ userId, task })

    notifyToWebUsers(watcherList, {
      title: 'Status update',
      body: `Status changed to ${newStatus.name} on "${task.title}"`,
      deep_link: taskLink
    })
  }

  private async _sendNotificationAsProgressChanges({
    oldProgress,
    userId,
    task
  }: {
    oldProgress: number
    userId: string
    task: Task
  }) {
    const pinfo = await serviceGetProjectById(task.projectId)
    const taskLink = genFrontendUrl(
      `${pinfo.organizationId}/project/${task.projectId}?mode=task&taskId=${task.id}`
    )

    const watcherList = await this.getWatchers({ userId, task })

    notifyToWebUsers(watcherList, {
      title: 'Progress update',
      body: `From ${oldProgress} => ${task.progress} on "${task.title}"`,
      deep_link: taskLink
    })
  }

  async getReminders({
    assigneeIds,
    projectId
  }: {
    assigneeIds: string[]
    projectId: string
  }) {
    const watchers = await this.projectSettingRepo.getAllRemindSettings(
      projectId
    )
    return [...assigneeIds, ...watchers]
  }

  private async _createTaskReminder(task: Task) {
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
      // link: taskLink,
      message: task.title,
      receivers
    })

    // remind before 60 minutes
    this.taskReminderJob.create({
      remindAt: task.dueDate,
      remindBefore: 60,
      taskId: task.id,
      projectId: task.projectId,
      // link: taskLink,
      message: task.title,
      receivers
    })

    // const d1 = new Date(dueDate) // clone the dueDate to prevent unneccessary updates
    // const now = new Date()
    // const beforeDate = new Date(dueDate)
    //
    // // TODO: if user want set an reminder at the exact time, do not substract the dueDate
    //
    // // Set a remind before 15p
    // // dueDate.setMinutes(dueDate.getMinutes() - 15)
    //
    // if (d1 <= now) {
    //   console.log('can not create reminder for past tasks')
    //   return
    // }
    //
    // // create reminder key and save this key to redis
    // const y = d1.getFullYear()
    // const m = d1.getMonth()
    // const d = d1.getDate()
    // const hour = d1.getHours()
    // const min = d1.getMinutes()
    //
    // // key syntax: remind-ddddmmyy-hh-mm-task-<taskID>
    // const key = [
    //   `remind-${y}${padZero(m)}${padZero(d)}-${padZero(hour)}:${padZero(
    //     min
    //   )}-task-${task.id}`
    // ]
    //
    // // the reminder key should have an expired time
    // // so it can delete itself automatically
    // // after the reminder run for 5 minutes, it will be expired
    // const expired = (d1.getTime() - now.getTime()) / 1000
    // const more5min = 5 * 60
    //
    // // generate data for reminder
    // const project = await mdProjectGet(task.projectId)
    // const taskLink = genFrontendUrl(
    //   `${project.organizationId}/project/${task.projectId}?mode=task&taskId=${task.id}`
    // )
    //
    // // save the key with expired time and data
    // setJSONCache(
    //   key,
    //   {
    //     receivers: task.assigneeIds,
    //     message: task.title,
    //     link: taskLink
    //   },
    //   Math.ceil(expired + more5min)
    // )
  }

  private async _deleteTaskReminderById(taskId: string) {
    this.taskReminderJob.delete(taskId)
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
