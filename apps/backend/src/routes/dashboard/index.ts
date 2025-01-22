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
  mdDBoardQueryBurnChart,
  mdDBoardQuerySum,
  mdDboardGetDefault,
  mdDBoardUpdateLayout
} from '@database'
import { DashboardComponent, DashboardComponentType } from '@prisma/client'

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

    // Set default dimensions based on component type
    const defaultDimensions = type === DashboardComponentType.COLUMN
      ? { width: 6, height: 4 }
      : { width: 3, height: 1 }

    const result = await mdDBoardAddComponent({
      title,
      dashboardId,
      type,
      config,
      x: 0,
      y: 0,
      ...defaultDimensions,
      createdAt: new Date(),
      createdBy: uid,
      updatedAt: new Date(),
      updatedBy: uid
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
    const result = await mdDBoardQueryColumn(config)

    res.json({ status: 200, data: result })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

router.post('/dboard/query-burnchart/:type', async (req: AuthRequest, res) => {
  try {
    const type = req.params.type as DashboardComponentType
    const config = req.body as IDBComponentConfig
    const result = await mdDBoardQueryBurnChart(config, type)
    res.json({ status: 200, data: result })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

router.post('/dboard/update-layout', async (req, res) => {
  try {
    const { components } = req.body as {
      components: {
        id: string
        x: number
        y: number
        width: number
        height: number
      }[]
    }

    await mdDBoardUpdateLayout(components)

    res.json({ status: 200, message: 'Success' })
  } catch (error) {
    console.error('Failed to update layout:', error)
    res.json({ status: 500, error })
  }
})

export default router
