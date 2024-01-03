import { BaseController, Post, Controller } from '../../core'

@Controller('/auth')
export default class AuthenController extends BaseController {
  @Post('/sign-in')
  async signIn() {
    return 1
  }
}
