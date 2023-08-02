import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import {
  IDBComponentColumnConfig,
  IDBComponentConfig,
  mdDBoardAddComponent,
  mdDBoardCreate,
  mdDBoardGetComponents,
  mdDBoardQueryColumn,
  mdDBoardQuerySum
} from '@shared/models'
import { DashboardComponent } from '@prisma/client'

const router = Router()

router.use([authMiddleware])

router.get('/dboard', async (req: AuthRequest, res) => {
  try {
    const params = req.query as { projectId: string }
    console.log('dboard get', params)
    const components = await mdDBoardGetComponents(params.projectId)

    res.json({ status: 200, data: components })
  } catch (error) {
    res.json({ status: 500 })
  }
})

router.post('/dboard', async (req: AuthRequest, res) => {
  console.log('auth user', req.authen)

  try {
    const { projectId, title } = req.body as {
      projectId: string
      title: string
    }

    const dboard = await mdDBoardCreate({
      projectId,
      title
    })

    res.json({ status: 200, data: dboard })
  } catch (error) {
    res.json({ status: 500, error })
  }
})

router.post('/dboard/component', async (req: AuthRequest, res) => {
  try {
    const { id: uid } = req.authen
    const { dashboardId, title, type, config } = req.body as Partial<
      Omit<DashboardComponent, 'id'>
    >

    console.log('create component')
    console.log(req.body)

    const result = await mdDBoardAddComponent({
      title,
      dashboardId,
      type,
      config,
      createdAt: new Date(),
      createdBy: uid,
      updatedAt: null,
      updatedBy: null
    })
    res.json({ status: 200, data: result })
  } catch (error) {
    res.json({ status: 500, error })
  }
})

router.post('/dboard/query-summary', async (req: AuthRequest, res) => {
  try {
    const { projectIds, statusIds, startDate, endDate, priority, assigneeIds } =
      req.body as IDBComponentConfig

    console.log('--------------------------------------')
    console.log('8')
    const result = await mdDBoardQuerySum({
      projectIds,
      statusIds,
      startDate,
      priority,
      assigneeIds,
      endDate
    })

    res.json({ status: 200, data: result })
  } catch (error) {
    res.json({ status: 500, error })
  }
})

router.post('/dboard/query-column', async (req: AuthRequest, res) => {
  try {
    const config = req.body as IDBComponentColumnConfig

    console.log('--------------------------------------')
    console.log('27')
    const result = await mdDBoardQueryColumn(config)

    res.json({ status: 200, data: result })
  } catch (error) {
    res.json({ status: 500, error })
  }
})

export default router
