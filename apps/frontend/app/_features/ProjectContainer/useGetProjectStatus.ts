import { projectStatusGet } from '@/services/status'
import { useProjectStatusStore } from '@/store/status'
import { TaskStatus } from '@prisma/client'
import localforage from 'localforage'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export const useGetStatusHandler = (projectId: string, cb?: () => void) => {
  const { addAllStatuses, setStatusLoading } = useProjectStatusStore()
  const key = `PROJECT_STATUS_${projectId}`
  const setCache = (data: TaskStatus[]) => {
    localforage.setItem(key, data)
  }
  const fetchNCache = () => {
    const statusController = new AbortController()

    setStatusLoading(true)
    projectStatusGet(projectId, statusController.signal)
      .then(res => {
        const { data, status } = res.data

        if (status !== 200) {
          addAllStatuses([])
          return
        }

        const statuses = data as TaskStatus[]

        // order must be ascending
        // unless re-ordering feature in setting/status and view/board will be error
        const sortedStatus = statuses.sort((a, b) => a.order - b.order)
        addAllStatuses(sortedStatus)
        setCache(sortedStatus)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setStatusLoading(false)
      })

    return {
      controller: statusController
    }
  }

  return {
    fetchNCache
  }
}

export default function useGetProjectStatus() {
  const { projectId } = useParams()
  const { addAllStatuses } = useProjectStatusStore()
  const { fetchNCache } = useGetStatusHandler(projectId)

  const key = `PROJECT_STATUS_${projectId}`

  useEffect(() => {
    localforage.getItem(key).then(val => {
      if (val) {
        addAllStatuses(val as TaskStatus[])
      }
    })
  }, [])

  useEffect(() => {
    const { controller } = fetchNCache()
    return () => {
      controller.abort()
    }
  }, [projectId])
}
