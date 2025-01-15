import { ExtendedTask, useTaskStore } from "@/store/task"
import { useDebounce } from "./useDebounce"

export const taskIdMap = new Map<string, ExtendedTask>()
export const taskIndexMap = new Map<string, number>()

export const updateTaskOrderInMap = (taskOrders: [string, number][]) => {
  for (let i = 0; i < taskOrders.length; i++) {
    const [id, order] = taskOrders[i];
    if (taskIdMap.has(id)) {
      const data = taskIdMap.get(id)
      data && taskIdMap.set(id, { ...data, order })
    }
  }
}

export const useGenTaskMappingObject = () => {
  const { tasks } = useTaskStore()

  useDebounce(() => {
    tasks.length && tasks.forEach((t, index) => {
      taskIdMap.set(t.id, t)
      taskIndexMap.set(t.id, index)
    })

  }, [JSON.stringify(tasks)])

}
