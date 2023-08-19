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
  ITaskQuery
} from '@shared/models'

import { Task } from '@prisma/client'

const router = Router()

router.use([authMiddleware, beProjectMemberMiddleware])

// It means GET:/api/example
router.get('/project/task', async (req: AuthRequest, res) => {
  console.log('called')
  const projectId = req.query.projectId as string
  try {
    console.log('projectId', projectId)
    const tasks = await mdTaskGetAll({ projectId, dueDate: [null, null] })
    console.log('get all task from project')
    res.json({ status: 200, data: tasks })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

router.get('/project/task-query', async (req: AuthRequest, res) => {
  try {
    console.log('=========== query')
    console.log('params: 16', req.query)
    // const query = req.body as ITaskQuery
    const { counter, ...rest } = req.query

    const tasks = await mdTaskGetAll(rest)
    if (counter) {
      const total = await mdTaskGetAll(req.query)
      return res.json({ status: 200, data: tasks, total })
    }

    res.json({ status: 200, data: tasks })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

// It means POST:/api/example
router.post('/project/task', async (req: AuthRequest, res) => {
  console.log('auth user', req.authen)
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

  try {
    const result = await mdTaskAdd({
      title,
      startDate: null,
      dueDate,
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
    // projectId,
    priority,
    taskStatusId,
    tagIds,
    parentTaskId,
    taskPoint
  } = req.body as Task
  const { id: userId } = req.authen

  const taskData = await mdTaskGetOne(id)

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
    const result = mdTaskUpdate(taskData)
    res.json({ status: 200, data: result })
    // res.json({ status: 200 })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

export default router
