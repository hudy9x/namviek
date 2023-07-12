import { Router } from 'express'
import { AuthRequest } from '../../types'
import { TaskPoint } from '@prisma/client'
import { mdTaskPointAddOne, mdTaskPointGetByProjectId, mdTaskPointDelOne, mdTaskPointUpdateOne } from '@shared/models'

const router = Router()

router.post('/project/point', async (req: AuthRequest, res) => {
  const body = req.body as Pick<TaskPoint, 'point' | 'projectId' | 'icon'>
  try {
    const result = await mdTaskPointAddOne({
      ...body
    })
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
  mdTaskPointGetByProjectId(projectId)
    .then(result =>
      res.json({
        status: 200,
        data: result
      })
    )
    .catch(err => console.log({ err }))
})

router.put('/project/point/', async (req: AuthRequest, res) => {
  const body = req.body as TaskPoint
  try {
    const result = await mdTaskPointUpdateOne({
      ...body
    })
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
    .then(result =>
      res.json({
        status: 200,
        data: result
      })
    )
    .catch(err => console.log({ err }))
})

export default router
