import { useCallback, useEffect } from 'react'
import { extractDueDate } from '@shared/libs'
import { ExtendedTask, useTaskStore } from '@/store/task'
import { taskGetByCond } from '@/services/task'
import { useParams } from 'next/navigation'
import { messageError } from '@shared/ui'
import localforage from 'localforage'
import useTaskFilterContext from '../TaskFilter/useTaskFilterContext'

const getAssigneeIds = (assigneeIds: string[]) => {
  if (assigneeIds.includes('ALL')) return undefined
  if (!assigneeIds.length) return ['null']

  return assigneeIds.filter(a => a !== 'ALL')
}

export const useGetTaskHandler = () => {
  const { projectId } = useParams()
  const { addAllTasks, setTaskLoading } = useTaskStore()
  const { filter } = useTaskFilterContext()
  const { groupBy, status, statusIds, ...filterWithoutGroupBy } = filter

  const key = `TASKLIST_${projectId}`

  const fetchNCache = useCallback(() => {
    const controller = new AbortController()
    const {
      term,
      date,
      startDate: start,
      endDate: end,
      dateOperator,
      done,
      assigneeIds,
      priority,
      point
    } = filter

    const { startDate, endDate } = extractDueDate({
      dateOperator,
      date,
      start,
      end
    })

    setTaskLoading(true)

    taskGetByCond(
      {
        title: term || undefined,
        taskPoint: +point === -1 ? undefined : +point,
        priority: priority === 'ALL' ? undefined : priority,
        assigneeIds: getAssigneeIds(assigneeIds),
        done,
        projectId,
        dueDate: [startDate || 'null', endDate || 'null']
      },
      controller.signal
    ).then(res => {
      const { data, status, error } = res.data

      if (status !== 200) {
        addAllTasks([])
        localforage.removeItem(key)
        setTaskLoading(false)
        messageError(error)
        return
      }

      localforage.setItem(key, data)
      setTimeout(() => {
        addAllTasks(data)
        setTaskLoading(false)
      }, 300)
    })

    return () => {
      controller.abort()
    }

    // only re-fetching data when filter changes
    // excpet groupBy filter
  }, [projectId, filter, key, addAllTasks, setTaskLoading])

  return {
    fetchNCache,
    filterWithoutGroupBy
  }
}

function useFillTaskFromCache() {
  const { projectId } = useParams()
  const { addAllTasks } = useTaskStore()
  const key = `TASKLIST_${projectId}`

  useEffect(() => {
    localforage
      .getItem(key)
      .then(val => {
        if (val) {
          addAllTasks(val as ExtendedTask[])
        }
      })
      .catch(err => {
        console.log('errpr loading cached task', err)
      })
  }, [projectId])
}

export default function useGetTask() {
  const { fetchNCache, filterWithoutGroupBy } = useGetTaskHandler()
  useFillTaskFromCache()

  useEffect(() => {
    fetchNCache()
    // only re-fetch data as filter changed
  }, [JSON.stringify(filterWithoutGroupBy)])

}
