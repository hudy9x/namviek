import { pmClient, pmTrans } from 'packages/shared-models/src/lib/_prisma'
import { Controller, ExpressResponse, Get, Res } from '../../core'
import { CounterType } from '@prisma/client'
import { CKEY, incrCache } from '../../lib/redis'

@Controller('/test')
class TestController {
  @Get('/counter')
  async increaseTaskCounter(@Res() res: ExpressResponse) {
    const d = new Date()
    try {
      const counter = await pmClient.$transaction(async tx => {

        const result = await tx.counter.findFirst({
          where: {
            type: CounterType.TASK
          }
        })

        let total = 0

        if (result && result.counter) {
          total = result.counter
        }

        const counter = total + 1

        await tx.counter.update({
          where: {
            id: result.id
          },
          data: {
            counter
          }
        })

        return counter

      })

      const result = await pmClient.test.create({
        data: {
          title: 'Unititled ' + d.toString(),
          order: counter
        }
      })

      console.log(result.order, counter)

      res.json({
        result,
        counter
      })

    } catch (error) {
      console.log('failed', d.toString())
      res.status(500).send(error)
    }
  }

  @Get('/create-counter')
  async createCounter(@Res() res: ExpressResponse) {

    const result = await pmClient.counter.create({
      data: {
        type: CounterType.TASK,
        counter: 0
      }
    })

    res.json({
      result
    })
  }

  @Get('/cache-counter')
  async generateCounterFromRedis(@Res() res: ExpressResponse) {
    try {

      const counter = await incrCache([CKEY.PROJECT_TASK_COUNTER])
      const result = await pmClient.test.create({
        data: {
          title: 'Created from redis',
          order: counter
        }
      })
      console.log('called', counter, result.order)
      res.json({ order: result.order })
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

export const TestRouter = TestController
