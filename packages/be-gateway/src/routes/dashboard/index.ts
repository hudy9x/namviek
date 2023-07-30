import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import { mdDBoardAddComponent, mdDBoardCreate } from '@shared/models'
import { DashboardComponent } from '@prisma/client'

const router = Router()

router.use([authMiddleware])

router.get('/dboard', (req: AuthRequest, res) => {
  res.json({ status: 200 })
})

router.post('/dboard', async (req: AuthRequest, res) => {
  console.log('auth user', req.authen)

  try {
    const { projectId, title } = req.body as { projectId: string, title: string }

    const dboard = await mdDBoardCreate({
      projectId,
      title,

    })

    res.json({ status: 200, data: dboard })
  } catch (error) {
    res.json({ status: 500, error })
  }


})

router.post('/dboard/component', async (req: AuthRequest, res) => {
  try {

    const { id: uid } = req.authen
    const { dashboardId, title, type, config } = req.body as Partial<Omit<DashboardComponent, 'id'>>

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

export default router
