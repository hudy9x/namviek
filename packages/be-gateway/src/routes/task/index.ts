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
  mdTaskUpdateMany
} from '@shared/models'

import { Task, TaskStatus } from '@prisma/client'
import {
  CKEY,
  findNDelCaches,
  genKeyFromSource,
  getJSONCache,
  setJSONCache
} from '../../lib/redis'

import { notifyToWebUsers } from '../../lib/buzzer'
import { genFrontendUrl } from '../../lib/url'
import { serviceGetStatusById } from '../../services/status'
import { serviceGetProjectById } from '../../services/project'
import {
  deleteTodoCounter,
  getTodoCounter,
  updateTodoCounter
} from '../../services/todo.counter'
import ActivityService from '../../services/activity.service'

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

router.get('/project/task/counter', async (req: AuthRequest, res) => {
  try {
    const { id: uid } = req.authen
    const { projectIds } = req.query as { projectIds: string[] }

    if (!projectIds.length) {
      return res.json({
        data: []
      })
    }

    // get todo tasks by user

    const processes = []

    for (let i = 0; i < projectIds.length; i++) {
      const pid = projectIds[i]
      const todoCounter = await getTodoCounter([uid, pid])

      if (todoCounter) {
        processes.push(
          Promise.resolve({
            total: parseInt(todoCounter, 10),
            projectId: pid
          })
        )
        continue
      }

      processes.push(
        mdTaskGetAll({
          assigneeIds: [uid],
          projectId: pid,
          done: 'no',
          counter: true
        }).then(val => {
          return {
            total: val,
            projectId: pid
          }
        })
      )
    }

    // run all task query asynchronous
    const results = (await Promise.allSettled(
      processes
    )) as PromiseSettledResult<{ total: number; projectId: string }>[]

    // filter fulfilled results
    const lastResults = results.map(r => {
      if (r.status === 'fulfilled') {
        const { total, projectId } = r.value
        // update todo counter
        updateTodoCounter([uid, projectId], total)
        return {
          total,
          projectId
        }
      }
    })

    res.json({
      data: lastResults
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
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

router.post('/project/task/make-cover', async (req: AuthRequest, res) => {
  try {
    const { taskId, url, projectId } = req.body as {
      taskId: string
      projectId: string
      url: string
    }
    const { id: uid } = req.authen

    const result = await mdTaskUpdate({
      id: taskId,
      cover: url,
      updatedAt: new Date(),
      updatedBy: uid
    })

    const key = [CKEY.TASK_QUERY, projectId]
    await findNDelCaches(key)

    res.json({ data: result })
  } catch (error) {
    res.status(500).send(error)
  }
})

// It means POST:/api/example
router.post('/project/task', async (req: AuthRequest, res) => {
  const body = req.body as Task
  const activityService = new ActivityService()
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
      cover: null,
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

    activityService.createTask({
      id: result.id,
      userId: id
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
  // const { id: uid } = req.authen
  const { id, projectId } = req.query as { id: string; projectId: string }

  try {
    const result = await mdTaskDelete(id)
    const key = [CKEY.TASK_QUERY, projectId]

    if (!result.done && result.assigneeIds && result.assigneeIds[0]) {
      console.log('delete todo counter')
      await deleteTodoCounter([result.assigneeIds[0], projectId])
    }

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
  const body = req.body as Task
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
  } = body
  const { id: userId } = req.authen

  const activityService = new ActivityService()

  try {
    // await pmClient.$transaction(async tx => {
    const taskData = await mdTaskGetOne(id)
    const oldTaskData = structuredClone(taskData)
    const isDoneBefore = taskData.done
    const oldStatusId = taskData.taskStatusId
    const oldAssigneeId = taskData?.assigneeIds[0]

    console.log('4')

    const key = [CKEY.TASK_QUERY, taskData.projectId]

    if (title) {
      taskData.title = title
    }

    if (desc) {
      taskData.desc = desc
    }

    if (taskStatusId) {
      const doneStatus = await mdTaskStatusWithDoneType(projectId)

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
      taskData.assigneeIds = assigneeIds
    }

    if (priority) {
      taskData.priority = priority
    }

    if (taskPoint) {
      taskData.taskPoint = taskPoint
    }

    if (dueDate) {
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

    const result = await mdTaskUpdate(taskData)

    activityService.updateTaskActivity({
      taskData: oldTaskData,
      updatedTaskData: body,
      userId
    })

    const processes = []

    // delete todo counter
    if (oldAssigneeId) {
      processes.push(deleteTodoCounter([oldAssigneeId, projectId]))
    }

    if (assigneeIds && assigneeIds[0] && assigneeIds[0] !== oldAssigneeId) {
      processes.push(deleteTodoCounter([assigneeIds[0], projectId]))
    }

    // delete cached tasks
    processes.push(findNDelCaches(key))

    await Promise.allSettled(processes)

    // send notification as status changed
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

    res.json({ status: 200, data: result })
    // })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

export default router
