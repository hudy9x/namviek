import { Counter } from '@prisma/client'
import { counterModel } from './_prisma'

export const mdCounterAdd = async (data: Omit<Counter, 'value'>) => {
  return counterModel.create({
    data
  })
}

export const mdCounterGetOne = async (counterId: string) => {
  const counter = await counterModel.findFirst({
    where: {
      id: counterId
    },
    select: {
      value: true
    }
  })
  return counter.value
}

export const mdCounterUpdate = async (data: Counter) => {
  const { id, value } = data
  // console.log('value from upadte', value)
  const counter = await counterModel.update({
    where: {
      id
    },
    data: { value: value }
  })

  return counter.value
}
