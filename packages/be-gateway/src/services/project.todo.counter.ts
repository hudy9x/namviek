import { CKEY, decrbyCache, incrByCache } from "../lib/redis"

interface TodoCounterKey {
  uid: string, projectId: string

}

// export const decrTodoTaskByUser = async ({ uid, projectId, priority, isDone }: CounterParams) => {
//
//   if (isDone || priority === TaskPriority.URGENT) {
//     return
//   }
//
//   await incrByCache([CKEY.USER_TODOS, uid, projectId])
// }
//
//
// export const incrTodoTaskByUser = async ({ uid, projectId, priority, isDone }: CounterParams) => {
//
//   if (isDone || priority === TaskPriority.URGENT) {
//     return
//   }
//
//   await incrByCache([CKEY.USER_TODOS, uid, projectId])
// }

export const updateTodoCounter = async (incrOrDecr: 1 | -1, key: TodoCounterKey) => {
  const { uid, projectId } = key
  const processes = []
  if (incrOrDecr === 1) {
    processes.push(incrByCache([CKEY.USER_TODOS, uid, projectId]))
    processes.push(incrByCache([CKEY.PROJECT_TODOS, projectId]))
  } else {
    processes.push(decrbyCache([CKEY.USER_TODOS, uid, projectId]))
    processes.push(decrbyCache([CKEY.PROJECT_TODOS, projectId]))
  }

  await Promise.all(processes)
}


