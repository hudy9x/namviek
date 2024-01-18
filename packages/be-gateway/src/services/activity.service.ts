import {
  Activity,
  ActivityObjectType,
  ActivityType,
  Task
} from '@prisma/client'
import {
  ActivityLogData,
  mdActivityAddMany,
  mdStorageGet
} from '@shared/models'
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

    try {
      console.log('start update activities:>>>>>>')
      if (title && taskData.title !== title) {
        console.log('title changed')
        const newActivity = structuredClone(activityTemplate)
        newActivity.type = ActivityType.TASK_TITLE_CHANGED

        newActivity.data = {
          changeFrom: taskData.title,
          changeTo: title
        }
        updatingActivities.push(newActivity)
      }

      if (desc && taskData.desc !== desc) {
        console.log('desc changed')
        const newActivity = structuredClone(activityTemplate)
        newActivity.type = ActivityType.TASK_DESC_CHANGED
        newActivity.data = {
          changeFrom: taskData.desc,
          changeTo: desc
        }
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
            newActivity.data = {
              changeFrom: taskData.taskStatusId,
              changeTo: taskStatusId
            }
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

          newActivity.data = {
            changeFrom: taskData.priority,
            changeTo: priority
          }

          updatingActivities.push(newActivity)
        }
      }

      if (taskPoint) {
        if (taskData.taskPoint !== taskPoint) {
          console.log('task point changed')
          const newActivity = structuredClone(activityTemplate)
          newActivity.type = ActivityType.TASK_POINT_CHANGED
          newActivity.data = {
            changeFrom: (taskData.taskPoint || '').toString(),
            changeTo: taskPoint.toString()
          }

          updatingActivities.push(newActivity)
        }
      }

      if (dueDate) {
        if (!isSameDay(new Date(taskData.dueDate), new Date(dueDate))) {
          console.log('dueDate changed')
          const newActivity = structuredClone(activityTemplate)
          newActivity.type = ActivityType.TASK_DUEDATE_CHANGED
          newActivity.data = {
            changeFrom: new Date(taskData.dueDate).toISOString(),
            changeTo: new Date(dueDate).toISOString()
          }
          updatingActivities.push(newActivity)
        }
      }

      if (progress) {
        if (taskData.progress !== progress) {
          const oldProgress = taskData.progress || ''
          const newActivity = structuredClone(activityTemplate)
          newActivity.type = ActivityType.TASK_PROGRESS_CHANGED

          newActivity.data = {
            changeFrom: oldProgress.toString(),
            changeTo: progress.toString()
          }

          updatingActivities.push(newActivity)
        }
      }

      if (fileIds && fileIds.length) {
        const oldFileIds = taskData.fileIds || []
        const newFileIds = fileIds.filter(id => !oldFileIds.includes(id))
        console.log('files changed')
        if (newFileIds.length) {
          const results = await mdStorageGet(newFileIds)
          const newFilesActivity = structuredClone(activityTemplate)
          newFilesActivity.type = ActivityType.TASK_ATTACHMENT_ADDED
          newFilesActivity.data = results.map(r => ({
            name: r.name,
            url: r.url,
            type: r.mimeType
          }))
          updatingActivities.push(newFilesActivity)
        }

        const removedFileIds = oldFileIds.filter(id => !fileIds.includes(id))
        if (removedFileIds.length) {
          const results = await mdStorageGet(removedFileIds)
          const removedFilesActivity = structuredClone(activityTemplate)

          removedFilesActivity.type = ActivityType.TASK_ATTACHMENT_REMOVED
          removedFilesActivity.data = results.map(r => ({
            name: r.name,
            url: r.url,
            type: r.mimeType
          }))
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
      await mdActivityAddMany(updatingActivities)
    } catch (err) {
      console.log('update activity failed', err)
    }
  }

  async createTask({ id, userId }: { id: string; userId: string }) {
    const activityTemplate = {
      objectId: id,
      objectType: ActivityObjectType.TASK,
      createdBy: userId,
      // data
      createdAt: new Date()
    } as Omit<Activity, 'id'>

    try {
      const updatingActivities: Omit<Activity, 'id'>[] = []
      const newActivity = structuredClone(activityTemplate)

      newActivity.type = ActivityType.TASK_CREATED
      updatingActivities.push(newActivity)

      console.log('new task created')

      await mdActivityAddMany(updatingActivities)
    } catch (error) {
      console.log(error)
    }
  }
}
