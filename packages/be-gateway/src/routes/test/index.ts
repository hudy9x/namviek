import { pmTrans } from 'packages/shared-models/src/lib/_prisma'
import { Controller, ExpressResponse, Get, Res } from '../../core'

@Controller('/test')
export default class TestController {
  @Get('/counter')
  createCounter(@Res() res: ExpressResponse) {
    pmTrans(async tx => {
      console.log('1 fm')
      res.status(200)
    })
  }
}
