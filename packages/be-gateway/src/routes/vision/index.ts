import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import {
  mdVisionAdd,
  mdVisionDel,
  mdVisionGetByOrg,
  mdVisionGetByProject
} from '@shared/models'
import { Vision } from '@prisma/client'

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
  try {
    console.log('auth user', req.authen)
    const { id: uid } = req.authen
    const { name, parentId, organizationId, projectId, dueDate } =
      req.body as Vision

    const result = await mdVisionAdd({
      name,
      parentId,
      organizationId,
      projectId,
      dueDate,
      progress: 0,
      createdBy: uid,
      createdAt: new Date()
    })
    res.json({ data: result })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('', async (req: AuthRequest, res) => {
  res.json({ status: 200 })
})
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params as { id: string }
    console.log('vision id', id)
    await mdVisionDel(id)
    res.json({ status: 200 })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

export default mainRouter