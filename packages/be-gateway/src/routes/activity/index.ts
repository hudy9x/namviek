import { Router } from 'express'
import {
  mdActivityAdd,
  mdActivityGetAllByTask,
  mdActivityUpdate
} from '@shared/models'
import { Activity } from '@prisma/client'
import { AuthRequest } from '../../types'

const router = Router()

router.get('/project/task/activity', async (req: AuthRequest, res) => {
  const { objectId } = req.query as { objectId: string }

  try {
    const results = await mdActivityGetAllByTask(objectId)
    // results.sort((a, b) => (a.createdAt < b.createdAt ? 1 : 0))
    res.json({ status: 200, data: results })
  } catch (error) {
    res.json({
      status: 500,
      err: error,
      data: []
    })
  }
})

router.post('/project/task/activity', async (req: AuthRequest, res, next) => {
  const body = req.body as Omit<Activity, 'id'>
  mdActivityAdd(body)
    .then(result => {
      res.json({ status: 200, data: result })
    })
    .catch(error => {
      console.log({ error })
      res.json({
        status: 500,
        err: error
      })
    })
})

router.put('/project/task/activity', async (req: AuthRequest, res, next) => {
  const body = req.body as Activity
  const { id, ...dataUpdate } = body
  mdActivityUpdate(id, dataUpdate)
    .then(result => {
      res.json({ status: 200, data: result })
    })
    .catch(error => {
      console.log({ error })
      res.json({
        status: 500,
        err: error
      })
    })
})

export default router
