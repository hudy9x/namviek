import { getMetadata, hasMetadata, setMetadata } from '../Mapper'
import { MetaKey, RouterParams } from '../type'

export const Res = (): ParameterDecorator => {
  return (target: any, propertyKey: string, parameterIndex: number) => {
    const _target = target.constructor

    if (!hasMetadata(MetaKey.PARAMS, _target, propertyKey)) {
      setMetadata(MetaKey.PARAMS, [], _target, propertyKey)
    }

    const params = getMetadata(MetaKey.PARAMS, _target, propertyKey) as string[]

    params[parameterIndex] = RouterParams.RESPONSE

    setMetadata(MetaKey.PARAMS, params, _target, propertyKey)
  }
}
