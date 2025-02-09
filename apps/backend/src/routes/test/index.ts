import { pmClient } from 'packages/database/src/lib/_prisma'
import {
  BaseController,
  Controller,
  ExpressRequest,
  ExpressResponse,
  Get,
  Post,
  Req,
  Res,
  UseMiddleware
} from '../../core'
import {
  CKEY,
  delCache,
  findCache,
  findCacheByTerm,
  incrCache,
  setCache,
  setJSONCache
} from '../../lib/redis'

import { TaskQueue, getTaskQueueInstance } from '../../queues'
import { authMiddleware } from '../../middlewares'

@Controller('/test')
// @UseMiddleware([authMiddleware])
export class TestController extends BaseController {
  taskQueue: TaskQueue
  constructor() {
    super()

    this.taskQueue = getTaskQueueInstance()
  }

  @Post('/hanet-webhook')
  async testHanetWebhook() {
    console.log(this.req.url, this.req.method)
    console.log('body:', this.req.body)
    return 3
  }

  calculateSecondBetween2Date() {
    const d1 = new Date()
    const d2 = new Date(
      d1.getFullYear(),
      d1.getMonth(),
      d1.getDate(),
      d1.getHours(),
      d1.getMinutes() + 2
    )

    return (d2.getTime() - d1.getTime()) / 1000
  }

  @Get('/error-handler')
  async ErrorHandler() {
    throw new Error('oiu123ijoijo woiejr')
    return 1
  }

  @Get('/hello')
  async sayHello() {
    const { taskId } = this.req.query as { taskId: string }
    console.log('hello to test/ api ')

    console.log(
      'calculate second between 2 dates',
      this.calculateSecondBetween2Date()
    )

    const key = [`remind-24-03-14-14:45-${taskId}`]
    const result = await findCache(key, true)

    console.log('result:', result)

    if (!result.length) {
      await setJSONCache(key, {
        title: 'Just 15p to this meeting'
      })
    } else {
      console.log('delete cache')
      delCache(key)
    }

    return 1111
  }

  @Get('/find-reminder')
  async findReminder() {
    const { term } = this.req.query as { term: string }
    console.log('111', term)
    const results = await findCacheByTerm(term)
    return results
  }

  @Get('/bullmq')
  async runQueue() {
    // await this.taskQueue.addJob('name', {
    //   updatedOrder: [['oijoisdf', '2']],
    //   projectId: '102938019283'
    // })
    return 1
  }

  @Get('/check-task-order')
  async getTaskWithoutOrder(
    @Req() req: ExpressRequest,
    @Res() res: ExpressResponse
  ) {
    const { isSet } = req.query as { isSet: string }

    // const tasks = await pmClient.task.findMany({
    //   where: {
    //     order: {
    //
    //     }
    //   },
    //   select: {
    //     id: true,
    //     order: true,
    //     title: true
    //   }
    // })

    res.json({
      // total: tasks.length,
      // data: tasks
    })
  }
  @Get('/update-task-order')
  async updateTaskOrder(@Res() res: ExpressResponse) {

    return 1

  }
  @Get('/counter')
  async increaseTaskCounter(@Res() res: ExpressResponse) {
    return 1
  }

  @Get('/create-counter')
  async createCounter(@Res() res: ExpressResponse) {
    return 1
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
