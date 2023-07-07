import { Router } from 'express'
import { AuthRequest } from '../../types'
import { TaskPoint } from '@prisma/client'
import { mdTaskPointAddOne, mdTaskPointGetByProjectId } from '@shared/models'

const router = Router()

router.post('/project/setting/point', async (req: AuthRequest, res) => {
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
export default router
