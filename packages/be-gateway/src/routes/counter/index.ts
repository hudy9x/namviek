import { Counter, PrismaClient } from '@prisma/client'
import { mdCounterAdd, mdCounterGetOne, mdCounterUpdate } from '@shared/models'
import { Router } from 'express'
import { authMiddleware, beProjectMemberMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import { pmClient } from 'packages/shared-models/src/lib/_prisma'

const router = Router()

router.use([authMiddleware, beProjectMemberMiddleware])


router.get('/counter', async (req: AuthRequest, res) => {

  try {
    const { id } = req.query as { id: string }
    const sessionResult = await pmClient.$transaction(async () => {
      console.log('start new transaction')

      const customId = await mdCounterGetOne(id)

      const newCustomId = await mdCounterUpdate({ id: id, value: customId + 1 })
      console.log('finished transaction with newCustomId:', newCustomId)
      return newCustomId;
    });

    res.json({ status: 200, data: sessionResult })
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
