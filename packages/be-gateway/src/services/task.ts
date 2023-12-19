/* eslint-disable no-prototype-builtins */
import { Task, TaskPriority } from '@prisma/client'
import {
  mdMemberGetAll,
  mdSettingNotificationQuery,
  mdTaskGetAll
} from '@shared/models'
import { CKEY, getJSONCache, setJSONCache } from '../lib/redis'

export const KEY_TASK_COUNT = CKEY.TASK_COUNTS

export const getTaskCountsBySetting = async () => {
  let taskCountsBySetting = {}
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

    if (!taskCountsBySetting.hasOwnProperty(uid)) {
      taskCountsBySetting = {
        ...taskCountsBySetting,
        [uid]: {
          organizationIds: [organizationId]
        }
      }

      if (urgentTaskStatus) {
        taskCountsBySetting[uid].numUrgentTasks = 0
      }

      if (overDueTaskStatus) {
        taskCountsBySetting[uid].numOverDueTasks = 0
      }

      if (todayTaskStatus) {
        taskCountsBySetting[uid].numTodayTask = 0
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

    if (taskCountsBySetting[uid].numOverDueTasks >= 0) {
      taskCountsBySetting[uid].numOverDueTasks += taskOverDueDate
    }

    if (taskCountsBySetting[uid].numTodayTask >= 0) {
      taskCountsBySetting[uid].numTodayTask += taskToday
    }

    if (taskCountsBySetting[uid].numUrgentTasks >= 0) {
      taskCountsBySetting[uid].numUrgentTasks += taskUrgent
    }

    if (!taskCountsBySetting[uid].organizationIds.includes(organizationId)) {
      taskCountsBySetting[uid].organizationIds.push(organizationId)
    }
  }

  setJSONCache(KEY_TASK_COUNT, taskCountsBySetting)

  return taskCountsBySetting
}
