import { Router } from 'express'
import { authMiddleware, beProjectMemberMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import {
  mdTaskGetAll,
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
  incrCache,
  setJSONCache
} from '../../lib/redis'

import {
  deleteTodoCounter,
  getTodoCounter,
  updateTodoCounter
} from '../../services/todo.counter'
import { createModuleLog } from '../../lib/log'
import TaskCreateService from '../../services/task/create.service'
import TaskUpdateService from '../../services/task/update.service'
import TaskReminderJob from '../../jobs/reminder.job'

const logging = createModuleLog('ProjectTask')
// import { Log } from '../../lib/log'

const taskReminderJob = new TaskReminderJob()
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
  try {
    const taskService = new TaskCreateService()
    const result = await taskService.createNewTask({
      uid: req.authen.id,
      body: req.body
    })

    res.json({ status: 200, data: result })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
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
    const counterKey = [CKEY.PROJECT_TASK_COUNTER, projectId]
    const existProject = await mdProjectGet(projectId)
    console.timeEnd('project-checking')
    if (!existProject) {
      return res.json({
        status: 400,
        error: 'Project not exist'
      })
    }

    console.time('reassign-task-data')
    const newTasks: Task[] = []
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i]
      const order = await incrCache(counterKey)
      newTasks.push({
        ...task,
        order,
        startDate: null,
        tagIds: [],
        parentTaskId: null,
        createdBy: id,
        createdAt: new Date(),
        updatedAt: null,
        updatedBy: null
      })
    }

    console.timeEnd('reassign-task-data')

    console.time('import')
    const result = await mdTaskAddMany(newTasks)
    console.timeEnd('import')

    const key = [CKEY.TASK_QUERY, projectId]
    await findNDelCaches(key)

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

    taskReminderJob.delete(id)
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
  const { id: userId } = req.authen
  const key = [CKEY.TASK_QUERY, data.projectId]

  logging.info('TaskUpdateMany - start updating !')

  try {
    data.updatedAt = new Date()
    data.updatedBy = userId
    if (data.dueDate) {
      data.dueDate = new Date(data.dueDate)
    }

    logging.debug('TaskUpdateMany - task data', data, ids)

    await mdTaskUpdateMany(ids, data)
    await findNDelCaches(key)
    logging.info('TaskUpdateMany - successfully')

    res.json({
      result: 1
    })
  } catch (error) {
    logging.error('TaskUpdateMany - update multiple task error', { error })
    // Log.debug('Update multiple task error failed', { error })
    res.status(500).send(JSON.stringify(error))
  }
})

// It means POST:/api/example
router.put('/project/task', async (req: AuthRequest, res) => {
  const taskUpdateService = new TaskUpdateService()
  const { id: userId } = req.authen
  try {
    const result = await taskUpdateService.doUpdate({
      userId,
      body: req.body as Task
    })

    res.json({
      status: 200,
      data: result
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
