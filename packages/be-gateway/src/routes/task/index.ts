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
import { boolean } from 'zod'

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

    console.log('queryKeys', queryKeys)

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
  console.log('body', req.body)
  const {
    desc,
    assigneeIds,
    title,
    dueDate,
    projectId,
    priority,
    taskStatusId
  } = req.body as Task
  const { id } = req.authen

  const key = [CKEY.TASK_QUERY, projectId]

  try {
    const result = await mdTaskAdd({
      title,
      startDate: null,
      dueDate: dueDate || null,
      assigneeIds,
      desc,
      projectId,
      priority,
      taskStatusId: taskStatusId,
      tagIds: [],
      parentTaskId: null,
      taskPoint: null,
      createdBy: id,
      createdAt: new Date(),
      updatedAt: null,
      updatedBy: null
    })

    await findNDelCaches(key)

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

// It means POST:/api/example
router.put('/project/task', async (req: AuthRequest, res) => {
  console.log('auth user', req.authen)
  console.log('body', req.body)
  const {
    id,
    title,
    startDate,
    dueDate,
    assigneeIds,
    desc,
    projectId,
    priority,
    taskStatusId,
    tagIds,
    parentTaskId,
    taskPoint
  } = req.body as Task
  const { id: userId } = req.authen

  const taskData = await mdTaskGetOne(id)
  const key = [CKEY.TASK_QUERY, taskData.projectId]

  if (taskStatusId) {
    taskData.taskStatusId = taskStatusId
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

  taskData.updatedAt = new Date()
  taskData.updatedBy = userId

  try {
    console.log('taskdata', taskData)
    const result = await mdTaskUpdate(taskData)
    await findNDelCaches(key)
    res.json({ status: 200, data: result })
    // res.json({ status: 200 })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

router.put('/project/tasks', async (req: AuthRequest, res) => {
  const { taskIds, data } = req.body
  const nonNullEntries = Object.entries(data).filter(entry => !!entry[1])
  const nonNullFields = Object.fromEntries(nonNullEntries)
  try {
    const result = await mdTaskUpdateMany(taskIds, nonNullFields)
    res.json({ status: 200, data: result })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

export default router
