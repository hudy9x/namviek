import { Request, Response } from 'express'
import { Controller } from '../lib/decorator/controller'
import { Get } from '../lib/decorator/get'

@Controller('/user')
export default class UserController {
  @Get('/')
  public index(req: Request, res: Response) {
    return res.send('User overview')
  }

  @Get('/:name')
  public details(req: Request, res: Response) {
    return res.send(`You are looking at the profile of ${req.params.name}`)
  }
}

@Controller('/meeting')
export class MeetingController {
  @Get('/')
  index(req: Request, res: Response) {
    return res.send('Meeting index')
  }
}
