
const mapper = new Map()

export const setMetadata = (key: string, value: unknown, classObject: any) => {
  mapper.set(`${key}]${classObject.name}`, value)
}

export const getMetadata = (key: string, classObject: any) => {
  return mapper.get(`${key}]${classObject.name}`)
}


