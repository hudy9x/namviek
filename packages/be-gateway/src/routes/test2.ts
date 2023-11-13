import { Controller } from '../core/Controller'
import { Delete } from '../core/Delete'
import { Get } from '../core/Get'
import { getMetadata } from '../core/Mapper'
import { Post } from '../core/Post'
import { Put } from '../core/Put'
import { Response } from '../core/Response'
import { MetaKey, RouteDefinition } from '../core/type'

@Controller('/meeting')
class MeetingController {
  constructor() {
    console.log()
  }

  @Get('/get')
  index() {
    console.log('index')
  }

  @Post('/add')
  add() {
    console.log('add')
  }
}

@Controller('/admin')
class AdminController {
  constructor() {
    console.log()
  }

  @Get('/get')
  something() {
    console.log()
  }

  @Put('/update-admin')
  adminDelete() {
    console.log()
  }

  @Delete('/delete-info')
  deleteInfo(@Response() res) {
    console.log(res)
  }
}

const routes = [MeetingController, AdminController]

routes.forEach(controller => {
  const instance = new controller()
  console.log('================')

  const prefix = getMetadata(MetaKey.PREFIX, controller)
  const routes = getMetadata(MetaKey.ROUTES, controller) as RouteDefinition[]

  // console.log(prefix, routes)

  routes.forEach(r => {
    const params = getMetadata(
      MetaKey.PARAMS,
      controller,
      r.methodName
    ) as string[]

    if (params && params.length) {
      console.log(instance)
      console.log(r.methodName)
      console.log(params)
      if (instance[r.methodName]) {
        instance[r.methodName].apply(null, [params[0]])
      }
    }
  })
})
