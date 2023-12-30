import { Router } from 'express'
import { AuthRequest } from '../../types'
import {
  mdProjectSettingQuery,
  mdProjectSettingUpdate,
  mdProjectSettingAdd
} from '@shared/models'
import { ProjectSetting } from '@prisma/client'
import { delCache } from '../../lib/redis'
import { KEY_TASK_SUMMARY } from '../../services/task'

const router = Router()

router.get(
  '/project-setting/notification/:projectId',
  async (req: AuthRequest, res) => {
    try {
      const { projectId } = req.params
      const setting = await mdProjectSettingQuery(projectId)
      res.json({ status: 200, data: setting })
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.put('/project-setting/notification', async (req: AuthRequest, res) => {
  try {
    const projectSetting = req.body
    // delete task by setting notification
    delCache(KEY_TASK_SUMMARY)
    const setting = await mdProjectSettingUpdate(projectSetting)
    res.json({ status: 200, data: setting })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/project-setting/notification', async (req: AuthRequest, res) => {
  try {
    const data = req.body as ProjectSetting
    // delete task by setting notification
    delCache(KEY_TASK_SUMMARY)
    const projectSetting = await mdProjectSettingAdd(data)
    res.json({ status: 200, data: projectSetting })
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
