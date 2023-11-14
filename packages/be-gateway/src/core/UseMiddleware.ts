import { setMetadata } from './Mapper'
import { ExpressMiddlewareFunction, MetaKey } from './type'

export const UseMiddleware = (
  funcs: ExpressMiddlewareFunction | ExpressMiddlewareFunction[]
): ClassDecorator => {
  return (target: any) => {
    setMetadata(
      MetaKey.MIDDLEWARES,
      Array.isArray(funcs) ? funcs : [funcs],
      target
    )
  }
}
