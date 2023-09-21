import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import {
  mdAutomationDel,
  mdAutomationGet,
  mdAutomationPost
} from '@shared/models'
import { TaskAutomation } from '@prisma/client'

const router = Router()

router.use([authMiddleware])

// It means GET:/api/example
router.get('/automation', async (req: AuthRequest, res) => {
  try {
    const { projectId } = req.query as { projectId: string }
    const results = await mdAutomationGet(projectId)
    res.json({
      status: 200,
      data: results
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})

// It means POST:/api/example
router.post('/automation', async (req: AuthRequest, res) => {
  try {
    const { id: uid } = req.authen
    const { organizationId, projectId, when, then } = req.body as TaskAutomation

    const data = {
      projectId,
      organizationId,
      when,
      then,
      createdAt: new Date(),
      createdBy: uid,
      updatedAt: null,
      updatedBy: null
    }

    const result = await mdAutomationPost(data)

    res.json({
      status: 200,
      data: result
    })
  } catch (error) {
    console.trace(error)
    res.status(500).json({ error })
  }
})

router.delete('/automation', async (req: AuthRequest, res) => {
  try {
    const { id } = req.query as { id: string }
    await mdAutomationDel(id)
    res.json({
      status: 200
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default router
