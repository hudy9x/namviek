import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import {
  mdProjectPinAdd,
  mdProjectPinGet,
  mdProjectUnpin
} from '@shared/models'

const router = Router()

router.use([authMiddleware])

// It means GET:/api/example
router.get('/project/pin', async (req: AuthRequest, res) => {
  try {
    const { id: uid } = req.authen
    const pinnedProjects = await mdProjectPinGet(uid)
    res.json({ status: 200, data: pinnedProjects })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

// It means POST:/api/example
router.post('/project/pin', async (req: AuthRequest, res) => {
  try {
    const { id: uid } = req.authen
    const { projectId } = req.body as { projectId: string }
    console.log('pin a project 1')

    const result = await mdProjectPinAdd({
      uid,
      projectId
    })

    res.json({ status: 200, data: result })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/project/pin', async (req: AuthRequest, res) => {
  console.log('unpin')
  try {
    const { id: uid } = req.authen
    const { projectId } = req.query as { projectId: string }
    await mdProjectUnpin({
      uid,
      projectId
    })
    res.json({ status: 200 })
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
