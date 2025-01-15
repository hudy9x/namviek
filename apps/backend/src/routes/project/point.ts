import { Router } from 'express'
import { AuthRequest } from '../../types'
import { TaskPoint } from '@prisma/client'
import {
  mdTaskPointAddOne,
  mdTaskPointGetByProjectId,
  mdTaskPointDelOne,
  mdTaskPointUpdateOne
} from '@shared/models'
import { CKEY, delCache, getJSONCache, setJSONCache } from '../../lib/redis'

const router = Router()

router.post('/project/point', async (req: AuthRequest, res) => {
  const body = req.body as Pick<TaskPoint, 'point' | 'projectId' | 'icon'>
  try {
    const result = await mdTaskPointAddOne({
      ...body
    })

    const key = [CKEY.PROJECT_POINT, body.projectId]
    delCache(key)

    res.json({
      status: 200,
      data: result
    })
  } catch (e) {
    res.json({
      status: 400,
      error: e
    })
  }
})

router.get('/project/point/:projectId', async (req: AuthRequest, res) => {
  const projectId = req.params.projectId
  const key = [CKEY.PROJECT_POINT, projectId]

  const cached = await getJSONCache(key)
  if (cached) {
    return res.json({
      status: 200,
      data: cached
    })
  }

  mdTaskPointGetByProjectId(projectId)
    .then(result => {
      setJSONCache(key, result)
      res.json({
        status: 200,
        data: result
      })
    })
    .catch(err => console.log({ err }))
})

router.put('/project/point/', async (req: AuthRequest, res) => {
  const body = req.body as TaskPoint
  const key = [CKEY.PROJECT_POINT, body.projectId]
  try {
    const result = await mdTaskPointUpdateOne({
      ...body
    })
    delCache(key)
    res.json({
      status: 200,
      data: result
    })
  } catch (e) {
    res.json({
      status: 400,
      error: JSON.stringify(e)
    })
  }
})

router.delete('/project/point/:pointId', async (req: AuthRequest, res) => {
  const pointId = req.params.pointId
  mdTaskPointDelOne(pointId)
    .then(result => {
      const key = [CKEY.PROJECT_POINT, result.projectId]
      delCache(key)
      res.json({
        status: 200,
        data: result
      })
    })
    .catch(err => console.log({ err }))
})

export default router
