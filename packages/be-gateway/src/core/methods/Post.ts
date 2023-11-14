import { getMetadata, hasMetadata, setMetadata } from '../Mapper'
import { HTTPMethod, MetaKey, RouteDefinition } from '../type'

export const Post = (path: string): MethodDecorator => {
  return (target, propertyKey: string): void => {
    if (!hasMetadata(MetaKey.ROUTES, target.constructor)) {
      setMetadata(MetaKey.ROUTES, [], target.constructor)
    }

    const routes = getMetadata(
      MetaKey.ROUTES,
      target.constructor
    ) as RouteDefinition[]

    routes.push({
      requestMethod: HTTPMethod.POST,
      path,
      methodName: propertyKey
    })

    setMetadata(MetaKey.ROUTES, routes, target.constructor)
  }
}
