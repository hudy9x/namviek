import { Router } from 'express'
import { AuthRequest } from '../../types'
import {
  mdSettingNotificationQuery,
  mdSettingNotificationUpdate,
} from '@shared/models'
import { TaskPriority } from '@prisma/client'

const router = Router()

//router.use([authMiddleware])

router.get(
  '/project-setting/notification/:projectId',
  async (req: AuthRequest, res) => {
    try {
      const { projectId } = req.params
      const setting = await mdSettingNotificationQuery(projectId)
      res.json({ status: 200, data: setting })
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.put('/project-setting/notification', async (req: AuthRequest, res) => {
  try {
    const projectSetting = req.body
    const setting = await mdSettingNotificationUpdate(projectSetting)
    res.json({ status: 200, data: setting })
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
