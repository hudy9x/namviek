import { setMetadata } from '../Mapper'
import { MetaKey } from '../type'

export const Auth = (): ClassDecorator => {
  return (target: any) => {
    setMetadata(MetaKey.MIDDLEWARES, '', target)
  }
}
