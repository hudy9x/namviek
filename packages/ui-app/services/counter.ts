import { Counter } from '@prisma/client'
import { httpGet, httpPost, httpPut } from './_req'

export interface ICounterQuery {
  id: string
}

export const counterAdd = (id: string) => {
  console.log('id:', id)
  return httpPost(`/api/counter`, {
    customId: id
  })
}

export const counterGet = (query: string) => {
  return httpGet(`/api/counter`, {
    params: { query }
  })
}

export const counterUpdate = (data: Counter) => {
  return httpPut(`/api/counter`, data)
}
