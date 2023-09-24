import { Counter } from '@prisma/client'
import { counterModel } from './_prisma'

export const mdCounterAdd = async (data: Omit<Counter, 'value'>) => {
  return counterModel.create({
    data
  })
}

export const mdCounterGetOne = async (counterId: string) => {
  return counterModel.findFirst({
    where: {
      id: counterId
    }
  })
}

export const mdCounterUpdate = async (data: Counter) => {
  const { id, value } = data
  console.log('data from upadte', data)
  return counterModel.update({
    where: {
      id
    },
    data: { value: value }
  })
}
