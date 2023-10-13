import { Router } from 'express';
import { authMiddleware } from '../../middlewares';
import { AuthRequest } from '../../types';

const router = Router()

router.use([authMiddleware])

// It means GET:/api/example
router.get('/vision', async (req: AuthRequest, res) => {
  try {
    const tasks = await mdVisionGetAll()
    console.log('get all vision')
    res.json({ status: 200, data: tasks })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})
