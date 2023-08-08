import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import {
  IDBComponentColumnConfig,
  IDBComponentConfig,
  mdDBoardAddComponent,
  mdDBoardCreate,
  mdDBoardDelComponent,
  mdDBoardGetComponents,
  mdDBoardQueryColumn,
  mdDBoardQuerySum,
  mdDboardGetDefault
} from '@shared/models'
import { DashboardComponent } from '@prisma/client'

const router = Router()

router.use([authMiddleware])

router.get('/dboard', async (req: AuthRequest, res) => {
  try {
    const params = req.query as { projectId: string }
    console.log('dboard get', params)
    const dboard = await mdDboardGetDefault(params.projectId)

    res.json({ status: 200, data: dboard })
  } catch (error) {
    res.json({ status: 500 })
  }
})

router.get('/dboard/components', async (req: AuthRequest, res) => {
  try {
    const params = req.query as { dboardId: string }
    console.log('dboard components', params)
    const components = await mdDBoardGetComponents(params.dboardId)

    res.json({ status: 200, data: components })
  } catch (error) {
    res.json({ status: 500 })
  }
})

router.post('/dboard', async (req: AuthRequest, res) => {
  try {
    const { projectId, title, isDefault } = req.body as {
      projectId: string
      title: string
      isDefault: boolean
    }

    const dboard = await mdDBoardCreate({
      projectId,
      title,
      isDefault: isDefault || false
    })

    console.log('dashboard created')

    res.json({ status: 200, data: dboard })
  } catch (error) {
    res.json({ status: 500, error })
  }
})

router.delete('/dboard/component', async (req: AuthRequest, res) => {
  try {
    const { componentId } = req.body as { componentId: string }
    const result = await mdDBoardDelComponent(componentId)

    res.json({ status: 200, data: result })
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
    console.log('28')
    const result = await mdDBoardQueryColumn(config)

    res.json({ status: 200, data: result })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

export default router
