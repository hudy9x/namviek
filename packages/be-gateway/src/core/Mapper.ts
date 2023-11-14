const mapper = new Map()

const genKey = (...args: string[]) => {
  return args.filter(Boolean).join(']')
}

export const setMetadata = (
  key: string,
  value: unknown,
  classObject: any,
  propertyKey?: string
) => {
  const _key = genKey(key, classObject.name, propertyKey)
  mapper.set(_key, value)
}

export const getMetadata = (
  key: string,
  classObject: any,
  propertyKey?: string
) => {
  const _key = genKey(key, classObject.name, propertyKey)
  return mapper.get(_key)
}

export const hasMetadata = (
  key: string,
  classObject: any,
  propertyKey?: string
) => {
  const _key = genKey(key, classObject.name, propertyKey)
  return mapper.has(_key)
}
