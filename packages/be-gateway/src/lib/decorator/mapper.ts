const mapper = new Map()

class NameContrller {
  getName() {
    console.log('123')
  }
}

export const setMetadata = (key: string, value: any, classObject: any) => {
  mapper.set(`${key}]${classObject.name}`, value)
}

export const getMetadata = (key: string, classObject: any) => {
  return mapper.get(`${key}]${classObject.name}`)
}

setMetadata('prefix', '/meeting', NameContrller)
const prefix = getMetadata('prefix', NameContrller)



console.log(prefix)
