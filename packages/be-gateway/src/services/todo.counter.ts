import { CKEY, delCache, getCache, setCache } from '../lib/redis'

export const updateTodoCounter = (key: string[], counter: number) => {
  setCache([CKEY.TODO_COUNTER, ...key], counter)
}

export const getTodoCounter = async (key: string[]) => {
  return await getCache([CKEY.TODO_COUNTER, ...key])
}

export const deleteTodoCounter = async (key: string[]) => {
  await delCache([CKEY.TODO_COUNTER, ...key])
}
