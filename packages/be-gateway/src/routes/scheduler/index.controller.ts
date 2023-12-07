import {
  BaseController,
  Controller,
  ExpressResponse,
  Get,
  Res
} from '../../core'

@Controller('/scheduler')
export default class Schedule extends BaseController {
  @Get('/remind-at-0845am')
  async remindTaskReportEveryMorning(@Res() res: ExpressResponse) {
    console.log('1')
    res.status(200)
  }
}
