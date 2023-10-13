import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import { mdTaskGetAll } from '@shared/models'

const mainRouter = Router()
const router = Router()

mainRouter.use('/report', [authMiddleware, router])

// It means GET:/api/example
router.get('/', async (req: AuthRequest, res) => {
  const { id: uid } = req.authen
  const { projectIds, startDate, endDate } = req.query as {
    projectIds: string[]
    startDate: string
    endDate: string
  }

  // await mdTaskGetAll({
  //   projectIds,
  //   dueDate: [startDate, endDate]
  // })

  res.json({ status: 200 })
})

// It means POST:/api/example
router.post('/example', (req: AuthRequest, res) => {
  console.log('auth user', req.authen)
  res.json({ status: 200 })
})

export default mainRouter
