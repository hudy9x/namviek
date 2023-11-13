import { hasMetadata, setMetadata } from './Mapper'
import { MetaKey } from './type'

export const Controller = (prefix: string): ClassDecorator => {
  return (target: any) => {
    setMetadata(MetaKey.PREFIX, prefix, target)

    if (!hasMetadata(MetaKey.ROUTES, target)) {
      setMetadata(MetaKey.ROUTES, [], target)
    }
  }
}
