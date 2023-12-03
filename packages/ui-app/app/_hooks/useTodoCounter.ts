import { useState } from "react"
import { useDebounce } from "./useDebounce"
import { useProjectStore } from "@/store/project"
import { taskCounterByUser } from "@/services/task"

interface ITodoCounter {
  [key: string]: number
}

export const useTodoCounter = () => {
  const [todoCounter, setTodoCounter] = useState<ITodoCounter>({})
  const { projects } = useProjectStore()

  useDebounce(() => {
    const abortController = new AbortController()
    if (projects.length) {
      const projectIds = projects.map(p => p.id)
      taskCounterByUser(projectIds, abortController.signal).then(res => {
        console.log(res)
        const { data } = res.data

        if (!data || !data.length) return

        const dataCounters = data as { total: number, projectId: string }[]

        const newCounter: ITodoCounter = {}
        dataCounters.forEach(dt => {
          newCounter[dt.projectId] = dt.total
        })

        setTodoCounter(newCounter)

      })
    }

    return () => {

      abortController.abort()
    }
  }, [projects])


  return {
    todoCounter
  }
}
