import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'

const router = Router()

router.use([authMiddleware])

router.get('/dboard', (req: AuthRequest, res) => {
  res.json({ status: 200 })
})

router.post('/dboard', (req: AuthRequest, res) => {
  console.log('auth user', req.authen)
  res.json({ status: 200 })
})

export default router
