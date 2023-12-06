import { Router } from 'express'
import { authMiddleware, beProjectMemberMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import {
  mdTaskAdd,
  mdTaskGetAll,
  mdTaskGetOne,
  mdTaskUpdate,
  mdTaskAddMany,
  mdProjectGet,
  mdTaskExport,
  mdTaskStatusQuery,
  mdMemberGetProject,
  mdTaskDelete,
  mdTaskStatusWithDoneType,
  mdTaskStatusWithTodoType,
  mdTaskUpdateMany,
  ActivityLogData,
  mdActivityAddMany
} from '@shared/models'

import isSameDay from 'date-fns/isSameDay'

import {
  Activity,
  ActivityObjectType,
  ActivityType,
  Prisma,
  StatusType,
  Task,
  TaskStatus
} from '@prisma/client'
import {
  CKEY,
  findNDelCaches,
  genKeyFromSource,
  getJSONCache,
  setJSONCache
} from '../../lib/redis'
import { pmClient } from 'packages/shared-models/src/lib/_prisma'
import { notifyToWebUsers } from '../../lib/buzzer'
import { genFrontendUrl, getLogoUrl } from '../../lib/url'
import { serviceGetStatusById } from '../../services/status'
import { serviceGetProjectById } from '../../services/project'

const router = Router()

router.use([authMiddleware, beProjectMemberMiddleware])

// It means GET:/api/example
router.get('/project/task', async (req: AuthRequest, res) => {
  const projectId = req.query.projectId as string
  try {
    const tasks = await mdTaskGetAll({ projectId, dueDate: [null, null] })
    console.log('get all task from project')
    res.json({ status: 200, data: tasks })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

router.get('/project/task/query', async (req: AuthRequest, res) => {
  try {
    // const query = req.body as ITaskQuery
    const { counter, ...rest } = req.query

    let ableToCache = false
    const queryKeys = Object.keys(req.query)
    const projectId = req.query.projectId as string
    const key = [CKEY.TASK_QUERY, projectId, genKeyFromSource(req.query)]

    if (
      queryKeys.length === 2 &&
      queryKeys.includes('projectId') &&
      queryKeys.includes('dueDate')
    ) {
      ableToCache = true

      const cached = await getJSONCache(key)
      if (cached) {
        console.log('return cached tasks')
        return res.json({
          status: 200,
          data: cached.data,
          total: cached.total
        })
      }
    }

    const tasks = await mdTaskGetAll(rest)
    if (counter) {
      const total = await mdTaskGetAll(req.query)
      if (ableToCache) {
        setJSONCache(key, { data: tasks, total })
      }
      return res.json({ status: 200, data: tasks, total })
    }

    if (ableToCache) {
      setJSONCache(key, { data: tasks, total: 0 })
    }

    res.json({ status: 200, data: tasks })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

router.get('/project/task/export', async (req: AuthRequest, res) => {
  try {
    // const query = req.body as ITaskQuery
    const { counter, ...rest } = req.query
    const { id: userId } = req.authen

    const sentProjectIds = rest.projectIds as string[]
    let projectIds = sentProjectIds
    if (projectIds && projectIds.length && projectIds.includes('ALL')) {
      const myProjectIds = await mdMemberGetProject(userId)
      projectIds = myProjectIds.map(p => p.projectId)
    }

    const promiseRequests = [
      mdTaskStatusQuery({
        projectIds
      }),
      mdTaskExport(rest)
    ]

    const result = await Promise.all(promiseRequests)
    const statuses = result[0] as TaskStatus[]
    const tasks = result[1] as Task[]

    const refactorStatuses = {}
    statuses.map((stt: TaskStatus) => {
      refactorStatuses[stt.id] = stt
    })

    const newTasks = []
    tasks.map(task => {
      const stt = refactorStatuses[task.taskStatusId]
      const taskStatusName = stt ? stt.name : null
      newTasks.push({
        ...task,
        ...{
          taskStatusName
        }
      })
    })

    if (counter) {
      const total = await mdTaskExport(req.query)
      return res.json({ status: 200, data: newTasks, total })
    }

    res.json({ status: 200, data: newTasks })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 500, error })
  }
})

// It means POST:/api/example
router.post('/project/task', async (req: AuthRequest, res) => {
  const body = req.body as Task
  const {
    desc,
    visionId,
    assigneeIds,
    title,
    dueDate,
    projectId,
    priority,
    progress
  } = req.body as Task
  let taskStatusId = body.taskStatusId
  const { id } = req.authen

  const key = [CKEY.TASK_QUERY, projectId]

  try {
    const doneStatus = await mdTaskStatusWithDoneType(projectId)

    const done = doneStatus && doneStatus.id === taskStatusId ? true : false

    if (!taskStatusId) {
      const todoStatus = await mdTaskStatusWithTodoType(projectId)
      taskStatusId = todoStatus.id
    }

    const result = await mdTaskAdd({
      title,
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
      createdBy: id,
      createdAt: new Date(),
      updatedAt: null,
      updatedBy: null,
      progress
    })

    await findNDelCaches(key)

    if (result.assigneeIds && result.assigneeIds.length) {
      const project = await mdProjectGet(result.projectId)
      const taskLink = genFrontendUrl(
        `${project.organizationId}/project/${projectId}?mode=task&taskId=${result.id}`
      )

      notifyToWebUsers(result.assigneeIds, {
        body: `[New task]: ${result.title} - assigned to you`,
        deep_link: taskLink
      })
    }

    res.json({ status: 200, data: result })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

router.post('/project/tasks', async (req: AuthRequest, res) => {
  // console.log('body', req.body)
  // const { desc, assigneeIds, title, dueDate, projectId, priority } = req.body as Task;

  const { data: tasks, projectId }: { data: Task[]; projectId: string } =
    req.body
  const { id } = req.authen
  try {
    console.time('project-checking')
    const existProject = await mdProjectGet(projectId)
    console.timeEnd('project-checking')
    if (!existProject) {
      return res.json({
        status: 400,
        error: 'Project not exist'
      })
    }

    console.time('reassign-task-data')
    const newTasks = tasks.map(task => ({
      ...task,
      startDate: null,
      tagIds: [],
      parentTaskId: null,
      createdBy: id,
      createdAt: new Date(),
      updatedAt: null,
      updatedBy: null
    }))
    console.timeEnd('reassign-task-data')

    console.time('import')
    const result = await mdTaskAddMany(newTasks)
    console.timeEnd('import')

    console.log('import success')
    res.json({ status: 200, data: result })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

router.delete('/project/task', async (req: AuthRequest, res) => {
  const { id, projectId } = req.query as { id: string; projectId: string }

  try {
    const result = await mdTaskDelete(id)
    const key = [CKEY.TASK_QUERY, projectId]
    await findNDelCaches(key)
    console.log('deleted task', id)
    res.json({
      status: 200,
      data: result
    })
  } catch (error) {
    console.log('error delete', error)
    res.status(500)
  }
})

router.put('/project/task-many', async (req: AuthRequest, res) => {
  const { ids, data } = req.body as { ids: string[]; data: Task }
  const { dueDate, assigneeIds, priority, taskStatusId, taskPoint, projectId } =
    data
  const { id: userId } = req.authen
  const key = [CKEY.TASK_QUERY, data.projectId]

  console.log('start updating')
  try {
    data.updatedAt = new Date()
    data.updatedBy = userId
    data.dueDate = new Date(data.dueDate)

    await mdTaskUpdateMany(ids, data)
    await findNDelCaches(key)
    console.log('updated already 2')

    res.json({
      result: 1
    })
  } catch (error) {
    res.status(500).send(error)
  }

  // try {
  //   const taskData = await mdTaskGetOne(id)
  //   const oldStatusId = taskData.taskStatusId
  //   const key = [CKEY.TASK_QUERY, taskData.projectId]
  //
  //   if (title) {
  //     taskData.title = title
  //   }
  //
  //   if (desc) {
  //     taskData.desc = desc
  //   }
  //
  //   if (taskStatusId) {
  //     const doneStatus = await mdTaskStatusWithDoneType(projectId)
  //
  //     taskData.taskStatusId = taskStatusId
  //     if (doneStatus && doneStatus.id === taskStatusId) {
  //       taskData.done = true
  //     }
  //   } else {
  //     taskData.done = false
  //   }
  //
  //
  //   if (assigneeIds) {
  //     taskData.assigneeIds = assigneeIds
  //   }
  //
  //   if (priority) {
  //     taskData.priority = priority
  //   }
  //
  //   if (taskPoint) {
  //     taskData.taskPoint = taskPoint
  //   }
  //
  //   if (dueDate) {
  //     taskData.dueDate = dueDate
  //   }
  //
  //
  //   taskData.updatedAt = new Date()
  //   taskData.updatedBy = userId
  //
  //   // delete taskData.id
  //   // const { id: tid, ...rest } = taskData
  //
  //   const result = await mdTaskUpdate(taskData)
  //
  //   if (oldStatusId !== result.taskStatusId) {
  //     const newStatus = await serviceGetStatusById(result.taskStatusId)
  //     const pinfo = await serviceGetProjectById(result.projectId)
  //     const taskLink = genFrontendUrl(
  //       `${pinfo.organizationId}/project/${projectId}?mode=task&taskId=${result.id}`
  //     )
  //
  //     notifyToWebUsers(result.assigneeIds, {
  //       body: `Status changed to ${newStatus.name} on "${result.title}"`,
  //       deep_link: taskLink
  //     })
  //   }
  //
  //   await findNDelCaches(key)
  //   res.json({ status: 200, data: result })
  //   // })
  // } catch (error) {
  //   console.log(error)
  //   res.status(500).send(error)
  // }
})

// It means POST:/api/example
router.put('/project/task', async (req: AuthRequest, res) => {
  const {
    id,
    title,
    startDate,
    dueDate,
    assigneeIds,
    fileIds,
    desc,
    projectId,
    priority,
    taskStatusId,
    plannedDueDate,
    tagIds,
    parentTaskId,
    visionId,
    progress,
    taskPoint
  } = req.body as Task
  const { id: userId } = req.authen

  try {
    // await pmClient.$transaction(async tx => {
    const taskData = await mdTaskGetOne(id)
    const oldStatusId = taskData.taskStatusId

    const activityTemplate = {
      objectId: taskData.id,
      objectType: ActivityObjectType.TASK,
      createdBy: userId,
      // data
      createdAt: new Date()
    } as Omit<Activity, 'id'>

    const updatingActivities: Omit<Activity, 'id'>[] = []

    // const taskData = await tx.task.findFirst({
    //   where: {
    //     id
    //   }
    // })
    const key = [CKEY.TASK_QUERY, taskData.projectId]

    if (title) {
      if (taskData.title !== title) {
        const newActivity = structuredClone(activityTemplate)
        newActivity.type = ActivityType.TASK_TITLE_CHANGED
        const data: ActivityLogData = {
          changeFrom: taskData.title,
          changeTo: title
        }
        newActivity.data = JSON.stringify(data)
        updatingActivities.push(newActivity)
      }

      taskData.title = title
    }

    if (desc) {
      if (taskData.desc !== desc) {
        const newActivity = structuredClone(activityTemplate)
        newActivity.type = ActivityType.TASK_DESC_CHANGED
        updatingActivities.push(newActivity)
      }

      taskData.desc = desc
    }

    if (taskStatusId) {
      if (taskData.taskStatusId !== taskStatusId) {
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
      const doneStatus = await mdTaskStatusWithDoneType(projectId)
      // const doneStatus = await tx.taskStatus.findFirst({
      //   where: {
      //     projectId,
      //     type: StatusType.DONE
      //   }
      // })

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

    if (assigneeIds) {
      const newAssigneeIds = assigneeIds.filter(
        id => !taskData.assigneeIds.includes(id)
      )
      if (newAssigneeIds.length) {
        const newAssigneesActivity = structuredClone(activityTemplate)
        newAssigneesActivity.type = ActivityType.TASK_ASSIGNEE_ADDED
        newAssigneesActivity.data = newAssigneeIds
        updatingActivities.push(newAssigneesActivity)
      }

      const removedAssigneeIds = taskData.assigneeIds.filter(
        id => !assigneeIds.includes(id)
      )
      if (removedAssigneeIds.length) {
        const removedAssigneesActivity = structuredClone(activityTemplate)
        removedAssigneesActivity.type = ActivityType.TASK_ASSIGNEE_REMOVED
        removedAssigneesActivity.data = removedAssigneeIds
        updatingActivities.push(removedAssigneesActivity)
      }

      taskData.assigneeIds = assigneeIds
    }

    if (priority) {
      if (taskData.priority !== priority) {
        const newActivity = structuredClone(activityTemplate)
        newActivity.type = ActivityType.TASK_PRIORITY_CHANGED
        const data: ActivityLogData = {
          changeFrom: taskData.priority,
          changeTo: priority
        }
        newActivity.data = JSON.stringify(data)

        updatingActivities.push(newActivity)
      }

      taskData.priority = priority
    }

    if (taskPoint) {
      if (taskData.taskPoint !== taskPoint) {
        const newActivity = structuredClone(activityTemplate)
        newActivity.type = ActivityType.TASK_POINT_CHANGED
        const data: ActivityLogData = {
          changeFrom: taskData.taskPoint.toString(),
          changeTo: taskPoint.toString()
        }
        newActivity.data = JSON.stringify(data)

        updatingActivities.push(newActivity)
      }

      taskData.taskPoint = taskPoint
    }

    if (dueDate) {
      if (isSameDay(new Date(taskData.dueDate), new Date(dueDate))) {
        const newActivity = structuredClone(activityTemplate)
        newActivity.type = ActivityType.TASK_DUEDATE_CHANGED
        const data: ActivityLogData = {
          changeFrom: new Date(taskData.dueDate).toISOString(),
          changeTo: new Date(dueDate).toISOString()
        }
        newActivity.data = JSON.stringify(data)
        updatingActivities.push(newActivity)
      }

      taskData.dueDate = dueDate
    }

    if (progress) {
      if (taskData.progress !== progress) {
        const newActivity = structuredClone(activityTemplate)
        newActivity.type = ActivityType.TASK_PROGRESS_CHANGED
        const data: ActivityLogData = {
          changeFrom: taskData.progress.toString(),
          changeTo: progress.toString()
        }
        newActivity.data = JSON.stringify(data)

        updatingActivities.push(newActivity)
      }

      taskData.progress = progress
    }

    if (fileIds && fileIds.length) {
      const oldFileIds = taskData.fileIds || []

      const newFileIds = fileIds.filter(id => !oldFileIds.includes(id))
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
      taskData.fileIds = [...fileIds, ...oldFileIds]
    }

    if (visionId) {
      if (taskData.visionId !== visionId) {
        const newActivity = structuredClone(activityTemplate)
        newActivity.type = ActivityType.TASK_VISION_CHANGED
        const data: ActivityLogData = {
          changeFrom: taskData.visionId,
          changeTo: visionId
        }
        newActivity.data = JSON.stringify(data)
        updatingActivities.push(newActivity)
      }

      taskData.visionId = visionId
    }

    taskData.updatedAt = new Date()
    taskData.updatedBy = userId

    // delete taskData.id
    // const { id: tid, ...rest } = taskData

    const result = await mdTaskUpdate(taskData)

    try {
      const res = await mdActivityAddMany(updatingActivities)
      console.log({ res })
    } catch (err) {
      console.log(`Add task updates activity failed with: ${err}`)
    }

    if (oldStatusId !== result.taskStatusId) {
      const newStatus = await serviceGetStatusById(result.taskStatusId)
      const pinfo = await serviceGetProjectById(result.projectId)
      const taskLink = genFrontendUrl(
        `${pinfo.organizationId}/project/${projectId}?mode=task&taskId=${result.id}`
      )

      notifyToWebUsers(result.assigneeIds, {
        body: `Status changed to ${newStatus.name} on "${result.title}"`,
        deep_link: taskLink
      })
    }

    await findNDelCaches(key)
    res.json({ status: 200, data: result })
    // })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

export default router
