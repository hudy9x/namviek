import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import { mdVisionGetByOrg, mdVisionGetByProject } from '@shared/models'

const router = Router()
const mainRouter = Router()

mainRouter.use('/vision', router)

router.use(authMiddleware)

// It means GET:/api/example
router.get('/get-by-project', async (req: AuthRequest, res) => {
  try {
    const { projectId } = req.query as { projectId: string }
    const results = await mdVisionGetByProject(projectId)

    res.json({ data: results })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/get-by-org', async (req: AuthRequest, res) => {
  try {
    const { orgId } = req.query as { orgId: string }
    const results = await mdVisionGetByOrg(orgId)

    res.json({ data: results })
  } catch (error) {
    res.status(500).send(error)
  }
})

// It means POST:/api/example
router.post('', async (req: AuthRequest, res) => {
  console.log('auth user', req.authen)
  res.json({ status: 200 })
})

router.put('', async (req: AuthRequest, res) => {
  res.json({ status: 200 })
})
router.delete('/:id', async (req: AuthRequest, res) => {
  res.json({ status: 200 })
})

export default mainRouter
