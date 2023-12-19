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
import { taskGetByCond } from '../../../../services/task'
import { useTaskStore } from '../../../../store/task'
import { messageError } from '@shared/ui'
import { useTaskFilter } from '@/features/TaskFilter/context'
import { extractDueDate, setRecentVist } from '@shared/libs'
import { useServiceAutomation } from '@/hooks/useServiceAutomation'
import { useTodoFilter } from '@/features/TaskFilter/useTodoFilter'

export default function ProjectContainer() {
  const { projectId, orgID } = useParams()
  const { addAllMember } = useMemberStore()
  const { addAllStatuses, setStatusLoading } = useProjectStatusStore()
  const { addAllPoints } = useProjectPointStore()
  const { addAllTasks, setTaskLoading } = useTaskStore()
  const { getAutomationByProject } = useServiceAutomation()

  useTodoFilter()
  const { filter } = useTaskFilter()

  const getAssigneeIds = (assigneeIds: string[]) => {
    if (assigneeIds.includes('ALL')) return undefined

    if (!assigneeIds.length) return ['null']

    return assigneeIds.filter(a => a !== 'ALL')
  }

  useEffect(() => {
    setRecentVist(`/${orgID}/project/${projectId}?mode=task`)
  }, [])

  const { groupBy, ...filterWithoutGroupBy } = filter
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
        if (status !== 200) {
          addAllTasks([])
          messageError(error)
          return
        }

        console.log(data)

        addAllTasks(data)
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

  useEffect(() => {
    if (projectId) {
      getAutomationByProject(projectId)
    }
  }, [projectId])

  useEffect(() => {
    const memberController = new AbortController()
    getProjectMember(projectId, memberController.signal)
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
        addAllStatuses(statuses.sort((a, b) => a.order - b.order))
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setStatusLoading(false)
      })

    const pointController = new AbortController()
    projectPointGet(projectId, pointController.signal)
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

    return () => {
      memberController.abort()
      statusController.abort()
      pointController.abort()
    }
  }, [projectId])
  return <ProjectNav />
}
