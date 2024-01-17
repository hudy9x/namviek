import { useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'
import { useProjectStore } from '@/store/project'
import { taskCounterByUser } from '@/services/task'
import localforage from 'localforage'
import { useParams } from 'next/navigation'

interface ITodoCounter {
  [key: string]: number
}

interface ITodoCounterResult {
  total: number
  projectId: string
}

export const useTodoCounter = () => {
  const [todoCounter, setTodoCounter] = useState<ITodoCounter>({})
  const { projects } = useProjectStore()
  const { orgID } = useParams()

  const key = `TODO_COUNTER_${orgID}`
  const getCacheTodoCounter = () => {
    localforage.getItem(key).then(val => {
      updateTodoCounter(val as ITodoCounterResult[])
    })
  }

  const cacheTodoCounter = (data: ITodoCounterResult[]) => {
    localforage.setItem(key, data)
  }

  const updateTodoCounter = (dataCounters: ITodoCounterResult[]) => {
    const newCounter: ITodoCounter = {}
    dataCounters &&
      dataCounters.forEach(dt => {
        newCounter[dt.projectId] = dt.total
      })

    setTodoCounter(newCounter)
  }

  useEffect(() => {
    getCacheTodoCounter()
  }, [])

  useDebounce(() => {
    const abortController = new AbortController()

    if (projects && projects.length) {
      const projectIds = projects.map(p => p.id)
      taskCounterByUser(projectIds, abortController.signal).then(res => {
        const { data } = res.data

        if (!data || !data.length) return

        const dataCounters = data as ITodoCounterResult[]

        cacheTodoCounter(dataCounters)
        updateTodoCounter(dataCounters)
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
