import {
  Activity,
  ActivityObjectType,
  ActivityType,
  Task
} from '@prisma/client'
import { ActivityLogData, mdActivityAddMany } from '@shared/models'
import { isSameDay } from 'date-fns'

export default class ActivityService {
  async updateTaskActivity({
    taskData,
    updatedTaskData,
    userId
  }: {
    updatedTaskData: Task
    taskData: Task
    userId: string
  }) {
    console.log('1')
    const activityTemplate = {
      objectId: taskData.id,
      objectType: ActivityObjectType.TASK,
      createdBy: userId,
      // data
      createdAt: new Date()
    } as Omit<Activity, 'id'>

    const updatingActivities: Omit<Activity, 'id'>[] = []

    const {
      title,
      desc,
      taskStatusId,
      assigneeIds,
      priority,
      taskPoint,
      dueDate,
      progress,
      fileIds,
      visionId
    } = updatedTaskData

    console.log('start update activities:>>>>>>')
    if (title && taskData.title !== title) {
      console.log('title changed')
      const newActivity = structuredClone(activityTemplate)
      newActivity.type = ActivityType.TASK_TITLE_CHANGED
      const data: ActivityLogData = {
        changeFrom: taskData.title,
        changeTo: title
      }
      newActivity.data = JSON.stringify(data)
      updatingActivities.push(newActivity)
    }

    if (desc && taskData.desc !== desc) {
      console.log('desc changed', desc, taskData.desc)
      const newActivity = structuredClone(activityTemplate)
      newActivity.type = ActivityType.TASK_DESC_CHANGED
      updatingActivities.push(newActivity)
    }

    if (taskStatusId) {
      if (taskData.taskStatusId !== taskStatusId) {
        console.log('task status changed')
        const newActivity = structuredClone(activityTemplate)

        if (!taskData.taskStatusId)
          newActivity.type = ActivityType.TASK_STATUS_CREATED
        else {
          newActivity.type = ActivityType.TASK_STATUS_CHANGED
          const data: ActivityLogData = {
            changeFrom: taskData.taskStatusId,
            changeTo: taskStatusId
          }
          newActivity.data = JSON.stringify(data)
        }
        updatingActivities.push(newActivity)
      }
    }

    if (assigneeIds) {
      const newAssigneeIds = assigneeIds.filter(
        id => !taskData.assigneeIds.includes(id)
      )
      if (newAssigneeIds.length) {
        console.log('assignee added')
        const newAssigneesActivity = structuredClone(activityTemplate)
        newAssigneesActivity.type = ActivityType.TASK_ASSIGNEE_ADDED
        newAssigneesActivity.data = newAssigneeIds
        updatingActivities.push(newAssigneesActivity)
      }

      const removedAssigneeIds = taskData.assigneeIds.filter(
        id => !assigneeIds.includes(id)
      )
      if (removedAssigneeIds.length) {
        console.log('assignee removed')
        const removedAssigneesActivity = structuredClone(activityTemplate)
        removedAssigneesActivity.type = ActivityType.TASK_ASSIGNEE_REMOVED
        removedAssigneesActivity.data = removedAssigneeIds
        updatingActivities.push(removedAssigneesActivity)
      }
    }

    if (priority) {
      if (taskData.priority !== priority) {
        console.log('priority changed')
        const newActivity = structuredClone(activityTemplate)
        newActivity.type = ActivityType.TASK_PRIORITY_CHANGED
        const data: ActivityLogData = {
          changeFrom: taskData.priority,
          changeTo: priority
        }
        newActivity.data = JSON.stringify(data)

        updatingActivities.push(newActivity)
      }
    }

    if (taskPoint) {
      if (taskData.taskPoint !== taskPoint) {
        console.log('task point changed')
        const newActivity = structuredClone(activityTemplate)
        newActivity.type = ActivityType.TASK_POINT_CHANGED
        const data: ActivityLogData = {
          changeFrom: (taskData.taskPoint || '').toString(),
          changeTo: taskPoint.toString()
        }
        newActivity.data = JSON.stringify(data)

        updatingActivities.push(newActivity)
      }
    }

    if (dueDate) {
      if (!isSameDay(new Date(taskData.dueDate), new Date(dueDate))) {
        console.log('dueDate changed')
        const newActivity = structuredClone(activityTemplate)
        newActivity.type = ActivityType.TASK_DUEDATE_CHANGED
        const data: ActivityLogData = {
          changeFrom: new Date(taskData.dueDate).toISOString(),
          changeTo: new Date(dueDate).toISOString()
        }
        newActivity.data = JSON.stringify(data)
        updatingActivities.push(newActivity)
      }
    }

    if (progress) {
      if (taskData.progress !== progress) {
        console.log('progress changed')
        const newActivity = structuredClone(activityTemplate)
        newActivity.type = ActivityType.TASK_PROGRESS_CHANGED
        const data: ActivityLogData = {
          changeFrom: taskData.progress.toString(),
          changeTo: progress.toString()
        }
        newActivity.data = JSON.stringify(data)

        updatingActivities.push(newActivity)
      }
    }

    if (fileIds && fileIds.length) {
      const oldFileIds = taskData.fileIds || []
      const newFileIds = fileIds.filter(id => !oldFileIds.includes(id))
      console.log('files changed')
      if (newFileIds.length) {
        const newFilesActivity = structuredClone(activityTemplate)
        newFilesActivity.type = ActivityType.TASK_ATTACHMENT_ADDED
        newFilesActivity.data = newFileIds
        updatingActivities.push(newFilesActivity)
      }

      const removedFileIds = oldFileIds.filter(id => !fileIds.includes(id))
      if (removedFileIds.length) {
        const removedFilesActivity = structuredClone(activityTemplate)
        removedFilesActivity.type = ActivityType.TASK_ATTACHMENT_REMOVED
        removedFilesActivity.data = removedFileIds
        updatingActivities.push(removedFilesActivity)
      }
    }

    if (visionId) {
      if (taskData.visionId !== visionId) {
        console.log('vision changed')
        const newActivity = structuredClone(activityTemplate)
        newActivity.type = ActivityType.TASK_VISION_CHANGED
        const data: ActivityLogData = {
          changeFrom: taskData.visionId,
          changeTo: visionId
        }
        newActivity.data = JSON.stringify(data)
        updatingActivities.push(newActivity)
      }
    }

    console.log('update activity >>>>>>>>>>>>>>>>')
    try {
      await mdActivityAddMany(updatingActivities)
    } catch (err) {
      console.log('update activity failed', err)
    }
  }
}
