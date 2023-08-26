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
import { taskGetAll, taskGetByCond } from '../../../../services/task'
import { useTaskStore } from '../../../../store/task'
import { messageError } from '@shared/ui'
import { useTaskFilter } from '@/features/TaskFilter/context'
import { fromDateStringToDateObject, to00h00m, to23h59m } from '@shared/libs'

export default function ProjectContainer() {
  const { projectId } = useParams()
  const { addAllMember } = useMemberStore()
  const { addAllStatuses, setStatusLoading } = useProjectStatusStore()
  const { addAllPoints } = useProjectPointStore()
  const { addAllTasks, setTaskLoading } = useTaskStore()
  const { filter } = useTaskFilter()

  const getAssigneeIds = (assigneeIds: string[]) => {
    if (assigneeIds.includes('ALL')) return undefined

    if (!assigneeIds.length) return ['null']

    return assigneeIds.filter(a => a !== 'ALL')
  }

  const getDueDate = ({
    dateOperator,
    date,
    start,
    end
  }: {
    dateOperator: string
    date: string
    start: Date | undefined
    end: Date | undefined
  }) => {
    if (date === 'date-range') {
      start && start.setHours(0)
      end && to23h59m(end)

      return { startDate: start, endDate: end }
    }

    if (date === 'not-set') {
      return { startDate: 'not-set', endDate: 'not-set' }
    }

    const { startDate, endDate } = fromDateStringToDateObject(
      dateOperator,
      date
    )

    return {
      startDate,
      endDate
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    const {
      term,
      date,
      startDate: start,
      endDate: end,
      dateOperator,
      assigneeIds,
      priority,
      point
    } = filter

    const { startDate, endDate } = getDueDate({
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

        addAllTasks(data)
      })
      .finally(() => {
        setTaskLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [JSON.stringify(filter)])

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
        console.log('data statues', data, status)

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
