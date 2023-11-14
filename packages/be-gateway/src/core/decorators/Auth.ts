import { setMetadata } from '../Mapper'
import { MetaKey } from '../type'

export const Auth = (roles: string[]): ClassDecorator => {
  return (target: any) => {
    setMetadata(MetaKey.AUTH, roles, target)
  }
}
