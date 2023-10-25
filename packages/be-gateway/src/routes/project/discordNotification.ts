import { Router } from 'express';
import { authMiddleware, beProjectMemberMiddleware } from '../../middlewares';
import { AuthRequest } from '../../types';
import { mdDiscordNotificationAdd } from '@shared/models';

const router = Router()

router.use([authMiddleware, beProjectMemberMiddleware])

// It means POST:/api/example
router.post('/project/discord-notification', async (req: AuthRequest, res) => {
  try {
    const result = await mdDiscordNotificationAdd(req.body)
    console.log(req.body)
    res.json({ status: 200, data: result })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

export default router
