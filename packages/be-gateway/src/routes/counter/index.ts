import { Router } from 'express'
import { AuthRequest } from '../../types'
import { authMiddleware, beProjectMemberMiddleware } from '../../middlewares'
import { mdCounterAdd, mdCounterGetOne, mdCounterUpdate } from '@shared/models'
import { Counter } from '@prisma/client'

const router = Router()

router.use([authMiddleware, beProjectMemberMiddleware])

router.get('/counter', async (req: AuthRequest, res) => {
  try {
    const { id } = req.query as { id: string }
    const result = await mdCounterGetOne(id)

    res.json({ status: 200, data: result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 500, error })
  }
})

router.post('/counter', async (req: AuthRequest, res) => {
  console.log('body', req.body)

  const { customId } = req.body;

  try {
    const result = await mdCounterAdd({
      id: customId
    })

    // await findNDelCaches(key)

    res.json({ status: 200, data: result })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

router.put('/counter', async (req: AuthRequest, res) => {
  try {
    const { id, value } = req.body as Counter
    const result = await mdCounterUpdate({
      id,
      value
    })

    res.json({ status: 200, data: result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 500, error })
  }
})


export default router
