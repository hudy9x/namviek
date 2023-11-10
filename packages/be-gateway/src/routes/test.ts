import UserController, { MeetingController } from './testController'
import { RouteDefinition } from '../lib/decorator/route-definition'

const controllers = [UserController, MeetingController]

controllers.forEach(controller => {
  const instance = new controller()
  const prefix = Reflect.getMetadata('prefix', controller)
  const routes: Array<RouteDefinition> = Reflect.getMetadata(
    'routes',
    controller
  )

  // console.log(prefix)
  // console.log(routes)

  routes.forEach(route => {
    // console.log(prefix, route.path)
  })
})
