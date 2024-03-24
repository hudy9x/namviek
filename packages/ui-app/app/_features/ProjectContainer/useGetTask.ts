import { useEffect, useState } from 'react'
import { useTaskFilter } from '../TaskFilter/context'
import { extractDueDate } from '@shared/libs'
import { ExtendedTask, useTaskStore } from '@/store/task'
import { taskGetByCond } from '@/services/task'
import { useParams } from 'next/navigation'
import { messageError } from '@shared/ui'
import localforage from 'localforage'

export default function useGetTask() {
  const { projectId } = useParams()
  const { addAllTasks, setTaskLoading } = useTaskStore()
  const { filter } = useTaskFilter()

  const { groupBy, status, ...filterWithoutGroupBy } = filter
  const key = `TASKLIST_${projectId}`

  const getAssigneeIds = (assigneeIds: string[]) => {
    if (assigneeIds.includes('ALL')) return undefined
    if (!assigneeIds.length) return ['null']

    return assigneeIds.filter(a => a !== 'ALL')
  }

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
      .finally(() => {
        console.log('finnally')
      })
  }, [projectId])

  useEffect(() => {
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
    console.log('before getting task =======================', point)
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
    )
      .then(res => {
        const { data, status, error } = res.data
        console.log('fetch task data', data)
        if (status !== 200) {
          addAllTasks([])
          localforage.removeItem(key)
          messageError(error)
          return
        }

        localforage.setItem(key, data)
        setTimeout(() => {
          console.log('update all task', data)
          addAllTasks(data)
        }, 300)
      })
      .finally(() => {
        setTaskLoading(false)
      })

    return () => {
      controller.abort()
    }

    // only re-fetching data when filter changes
    // excpet groupBy filter
  }, [JSON.stringify(filterWithoutGroupBy)])
}
