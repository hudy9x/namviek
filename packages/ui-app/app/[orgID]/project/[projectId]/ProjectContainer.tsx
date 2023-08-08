'use client'

import { useEffect } from 'react'
import ProjectNav from './ProjectNav'
import { getProjectMember } from '../../../../services/member'
import { useParams } from 'next/navigation'
import { useMemberStore } from '../../../../store/member'
import { projectStatusGet } from '../../../../services/status'
import { projectPointGet } from '../../../../services/point'
import { useProjectStatusStore } from '../../../../store/status'
import { useProjectPointStore } from '../../../../store/point'
import { TaskStatus } from '@prisma/client'
import { taskGetAll } from '../../../../services/task'
import { useTaskStore } from '../../../../store/task'
import { messageError } from '@shared/ui'

export default function ProjectContainer() {
  const { projectId } = useParams()
  const { addAllMember } = useMemberStore()
  const { addAllStatuses, setStatusLoading } = useProjectStatusStore()
  const { addAllPoints } = useProjectPointStore()
  const { addAllTasks, setTaskLoading } = useTaskStore()

  useEffect(() => {
    const controller = new AbortController()
    setTaskLoading(true)
    taskGetAll(projectId, controller.signal)
      .then(res => {
        const { data, status, error } = res.data
        if (status !== 200) {
          addAllTasks([])
          messageError(error)
          return
        }

        addAllTasks(data)
      })
      .catch(() => {
        console.log('aborted')
      })
      .finally(() => {
        setTaskLoading(false)
      })

    return () => {
      console.log('unmount')
      controller.abort()
    }
  }, [])

  useEffect(() => {
    getProjectMember(projectId)
      .then(res => {
        const { data, status } = res.data
        if (status !== 200) {
          addAllMember([])
          return
        }

        addAllMember(data)
      })
      .catch(err => {
        console.log(err)
      })

    setStatusLoading(true)
    projectStatusGet(projectId)
      .then(res => {
        const { data, status } = res.data

        if (status !== 200) {
          addAllStatuses([])
          return
        }

        const statuses = data as TaskStatus[]

        addAllStatuses(statuses.sort((a, b) => a.order - b.order))
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setStatusLoading(false)
      })

    projectPointGet(projectId)
      .then(res => {
        const { data, status } = res.data
        if (status !== 200) {
          addAllPoints([])
          return
        }

        addAllPoints(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [projectId])
  return <ProjectNav />
}
