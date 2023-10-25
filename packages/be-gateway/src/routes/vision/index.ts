import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import {
  mdVisionAdd,
  mdVisionDel,
  mdVisionGetByOrg,
  mdVisionGetByProject,
  mdVisionUpdate
} from '@shared/models'
import { Vision } from '@prisma/client'
import { CKEY, getJSONCache, setJSONCache } from '../../lib/redis'

const router = Router()
const mainRouter = Router()

mainRouter.use('/vision', router)

router.use(authMiddleware)

// It means GET:/api/example
router.get('/get-by-project', async (req: AuthRequest, res) => {
  try {
    const { projectId, month } = req.query as {
      projectId: string
      month: string
    }
    const key = [CKEY.PROJECT_VISION, projectId, month]
    const cached = await getJSONCache(key)

    if (cached) {

      // return res.json({
      //   data: cached
      // })
    }

    console.log('get vision by project')
    const results = await mdVisionGetByProject(projectId, {
      month: parseInt(month, 10)
    })

    setJSONCache(key, results)

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
      dueDate: new Date(dueDate),
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
  try {
    const { name, dueDate, id, progress } = req.body as Vision

    const updateData = {} as Vision

    if (dueDate) {
      updateData.dueDate = new Date(dueDate)
    }

    if (name) {
      updateData.name = name
    }

    await mdVisionUpdate({
      id,
      data: updateData
    })

    res.json({ data: 'ok' })
  } catch (error) {
    res.status(500).send(error)
  }
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
