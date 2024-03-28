import { TaskPriority } from '@prisma/client'
import {
  ETaskFilterGroupByType,
  ITaskFilterGroupbyItem,
  TaskFilterContext
} from './context'
import { useProjectStatusStore } from '@/store/status'
import { useMemberStore } from '@/store/member'
import { useTaskStore } from '@/store/task'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useRef } from 'react'

let timeout = 0
export default function useUpdateGroupbyItem() {
  const { statuses } = useProjectStatusStore()
  const { members } = useMemberStore()
  const { tasks } = useTaskStore()
  const { projectId } = useParams()

  const oldGroupByType = useRef('')
  const oldStatusList = useRef(statuses)
  const oldTaskList = useRef(tasks)

  const { filter, setGroupbyItems, setGroupbyLoading } =
    useContext(TaskFilterContext)

  const _groupByStatus = (): ITaskFilterGroupbyItem[] => {
    const ignored: string[] = []
    const statusIds = statuses.map(s => s.id)
    const noneItems: string[] = []

    const groupStatuses = statuses.map(stt => {
      const { id, name, color } = stt
      const items: string[] = []

      tasks.forEach(t => {
        if (ignored.includes(t.id)) return

        const { taskStatusId } = t

        if (taskStatusId === id) {
          items.push(t.id)
          ignored.push(t.id)
          return
        }

        if (!statusIds.includes(taskStatusId || '')) {
          noneItems.push(t.id)
          ignored.push(t.id)
          return
        }

        if (!taskStatusId || !statusIds.includes(taskStatusId)) {
          noneItems.push(t.id)

          ignored.push(t.id)
        }
      })

      return {
        id,
        color,
        name,
        items
      }
    })

    if (noneItems.length) {
      groupStatuses.push({
        id: 'NONE',
        color: '#cecece',
        name: 'None',
        items: noneItems
      })
    }

    return groupStatuses
  }

  const _groupByPriority = (): ITaskFilterGroupbyItem[] => {
    const priorities = [
      [TaskPriority.LOW, '#ababab'],
      [TaskPriority.NORMAL, '#13cfff'],
      [TaskPriority.HIGH, '#ffce37'],
      [TaskPriority.URGENT, '#ff1345']
    ]

    const filteredStatusIds = filter.statusIds

    const ignored: string[] = []
    return priorities.map(p => {
      const items: string[] = []

      tasks.forEach(t => {
        if (ignored.includes(t.id)) return

        if (
          filteredStatusIds.length &&
          t.taskStatusId &&
          !filteredStatusIds.includes('ALL')
        ) {
          if (!filteredStatusIds.includes(t.taskStatusId)) {
            return
          }
        }

        if (t.priority === p[0]) {
          items.push(t.id)
          ignored.push(t.id)
        }
      })

      return {
        id: p[0],
        name: p[0],
        color: p[1],
        items
      }
    })
  }

  const _groupByAssignee = (): ITaskFilterGroupbyItem[] => {
    const ignored: string[] = []
    const taskWithoutAssignee: string[] = []
    const filteredStatusIds = filter.statusIds

    const newMembers = members.map(mem => {
      const items: string[] = []

      tasks.forEach(t => {
        if (ignored.includes(t.id)) return

        if (
          t.taskStatusId &&
          filteredStatusIds.length &&
          !filteredStatusIds.includes('ALL')
        ) {
          if (!filteredStatusIds.includes(t.taskStatusId)) {
            return
          }
        }

        if (!t.assigneeIds.length && !taskWithoutAssignee.includes(t.id)) {
          taskWithoutAssignee.push(t.id)
          return
        }

        if (t.assigneeIds.includes(mem.id)) {
          items.push(t.id)
          ignored.push(t.id)
        }
      })
      return {
        id: mem.id,
        name: mem.name || '',
        icon: mem.photo || '',
        items
      }
    })

    newMembers.push({
      id: 'NONE',
      name: 'Not assigned',
      icon: '',
      items: taskWithoutAssignee
    })

    return newMembers
  }

  const updateGroupbyItems = () => {
    let groupItems: ITaskFilterGroupbyItem[] = []

    switch (filter.groupBy) {
      case ETaskFilterGroupByType.STATUS:
        groupItems = _groupByStatus()
        break

      case ETaskFilterGroupByType.PRIORITY:
        groupItems = _groupByPriority()
        break

      case ETaskFilterGroupByType.ASSIGNEE:
        groupItems = _groupByAssignee()
        break
    }

    setGroupbyLoading(false)
    setGroupbyItems(groupItems)
  }

  // Only update groupByItems as groupBy option changed
  // keep logic simple
  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      if (oldGroupByType.current !== filter.groupBy) {
        updateGroupbyItems()
        oldGroupByType.current = filter.groupBy
      }
    }, 350) as unknown as number
  }, [
    filter.groupBy,
    JSON.stringify(members),
    JSON.stringify(statuses),
    JSON.stringify(tasks)
  ])

  useEffect(() => {
    updateGroupbyItems()
  }, [filter.statusIds.toString()])

  useEffect(() => {
    if (oldStatusList.current) {
      const oldStatusArr = oldStatusList.current

      // When page reload, the status list is empty
      // after a few seconds it will be fetched from servers
      // so we need to update the groupByItems
      if (!oldStatusArr.length && statuses.length) {
        updateGroupbyItems()
      }
    }
  }, [statuses])

  useEffect(() => {
    if (oldTaskList.current) {
      const oldTaskArr = oldTaskList.current

      // When page reload, the task list is empty
      // after a few seconds it will be fetched from servers
      // so we need to update the groupByItems
      if (!oldTaskArr.length && tasks.length) {
        updateGroupbyItems()
      }
    }
  }, [tasks])

  useEffect(() => {
    updateGroupbyItems()
  }, [projectId, tasks])
}
