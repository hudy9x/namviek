import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import { User } from '@prisma/client'
import { mdUserUpdate } from '@shared/models'

const router = Router()

router.use([authMiddleware])

router.put('/user', async (req: AuthRequest, res) => {
  console.log('auth user', req.authen)
  const user = req.body as User
  const { id, ...data } = user
  const result = await mdUserUpdate(id, data)
  res.json({ status: 200, data: result })
})

export default router
