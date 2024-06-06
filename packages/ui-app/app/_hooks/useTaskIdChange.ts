import { onPushStateRun } from "packages/ui-app/libs/pushState"
import { useEffect, useState } from "react"

export const useTaskIdChange = () => {
  const [taskId, setTaskId] = useState('')
  useEffect(() => {
    const destroy = onPushStateRun((url: string) => {

      const newUrl = new URL(url)
      const taskId = newUrl.searchParams.get('taskId')
      if (taskId) {
        setTaskId(taskId)
      }
      // fn(taskId || '')
    })

    return () => {
      destroy()
    }
  }, [])

  useEffect(() => {
    const newUrl = new URL(window.location.toString())
    const taskId = newUrl.searchParams.get('taskId')
    if (taskId) {
      setTaskId(taskId)
      // fn(taskId)
    }

  }, [])

  return {
    taskId
  }

}
