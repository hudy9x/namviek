import { CKEY, getCache, incrCache, setCache } from "../lib/redis"

export const updateTodoCounter = (key: string[], counter: number) => {
  setCache([CKEY.TODO_COUNTER, ...key], counter)
}

export const getTodoCounter = async (key: string[]) => {
  return await getCache([CKEY.TODO_COUNTER, ...key])
}

export const increaseTodoCounter = (key: string[]) => {
  incrCache([CKEY.TODO_COUNTER, ...key])
}
