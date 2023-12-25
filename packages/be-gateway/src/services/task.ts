/* eslint-disable no-prototype-builtins */
import { Task, TaskPriority } from '@prisma/client'
import {
  mdMemberGetAll,
  mdSettingNotificationQuery,
  mdTaskGetAll
} from '@shared/models'
import { CKEY, getJSONCache, setJSONCache } from '../lib/redis'

export const KEY_TASK_COUNT = CKEY.TASK_COUNTS

interface ITaskSummary {
  numOverDueTasks: number,
  numTodayTask: number,
  numUrgentTasks: number,
  organizationIds: string[],
}

interface ITaskSummaryForUID {
  [key: string]: ITaskSummary;
}

export const getTaskSummary = async () => {
  let taskSummary: ITaskSummaryForUID = {}
  const taskCounts = await getJSONCache(KEY_TASK_COUNT)
  if (taskCounts) {
    return taskCounts
  }

  const members = await mdMemberGetAll()
  for (const member of members) {
    const { projectId, uid } = member
    const setting = await mdSettingNotificationQuery(projectId)
    const {
      organizationId,
      overDueTaskStatus,
      todayTaskStatus,
      urgentTaskStatus
    } = setting

    if (!taskSummary.hasOwnProperty(uid)) {
      taskSummary = {
        ...taskSummary,
        [uid]: {
          ...taskSummary[uid],
          organizationIds: [organizationId]
        }
      }

      if (urgentTaskStatus) {
        taskSummary[uid].numUrgentTasks = 0
      }

      if (overDueTaskStatus) {
        taskSummary[uid].numOverDueTasks = 0
      }

      if (todayTaskStatus) {
        taskSummary[uid].numTodayTask = 0
      }
    }

    const taskOverDueDate = await mdTaskGetAll({
      counter: true,
      isOverDueDate: true,
      done: 'no',
      projectId,
      assigneeIds: [uid]
    })

    const taskUrgent = await mdTaskGetAll({
      counter: true,
      done: 'no',
      priority: TaskPriority.URGENT,
      projectId,
      assigneeIds: [uid]
    })

    const taskToday = await mdTaskGetAll({
      counter: true,
      done: 'no',
      isToday: true,
      projectId,
      assigneeIds: [uid]
    })

    if (taskSummary[uid].numOverDueTasks >= 0 && typeof taskOverDueDate === 'number') {
      taskSummary[uid].numOverDueTasks += taskOverDueDate
    }

    if (taskSummary[uid].numTodayTask >= 0  && typeof taskToday === 'number') {
      taskSummary[uid].numTodayTask += taskToday
    }

    if (taskSummary[uid].numUrgentTasks >= 0 && typeof taskUrgent === 'number') {
      taskSummary[uid].numUrgentTasks += taskUrgent
    }

    if (!taskSummary[uid].organizationIds.includes(organizationId)) {
      taskSummary[uid].organizationIds.push(organizationId)
    }
  }

  setJSONCache(KEY_TASK_COUNT, taskSummary)

  return taskSummary
}
