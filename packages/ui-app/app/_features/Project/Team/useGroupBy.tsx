import { useTaskFilter } from '@/features/TaskFilter/context'
import { useMemberStore } from '@/store/member'
import { useProjectStatusStore } from '@/store/status'
import { useTaskStore } from '@/store/task'
import { Task, User } from '@prisma/client'
import { randomId } from '@shared/ui'
import { useMemo } from 'react'

export interface Group {
  header: {
    title: string
    id: string | string[]
    color?: string | null
    user: User[]
  }
  tasks: Task[]
}

export const useGroupBy = () => {
  const { statuses } = useProjectStatusStore()
  const { tasks } = useTaskStore()
  const { members } = useMemberStore(state => state)

  const { filter } = useTaskFilter()

  const groupByStatus = useMemo(() => {
    const raw: Group[] = statuses.map(item => {
      return {
        header: {
          id: item.id,
          color: item.color || 'black',
          title: item.name,
          user: []
        },
        tasks: []
      }
    })

    const unStatusTask: Task[] = []

    tasks.forEach(task => {
      const index = raw.findIndex(item => item.header.id === task.taskStatusId)
      if (index !== -1) {
        raw[index].tasks.push(task)
      } else {
        unStatusTask.push(task)
      }
    })

    if (unStatusTask.length) {
      raw.push({
        header: {
          title: 'OTHER',
          color: 'black',
          user: [],
          id: randomId(10)
        },
        tasks: unStatusTask
      })
    }
    return raw
  }, [tasks, statuses])

  const groupByMember = useMemo(() => {
    let raw: Group[] = members.map(member => {
      return {
        header: {
          id: [member.id],
          user: [member],
          title: member.name ? member.name : member.email
        },
        tasks: []
      }
    })

    if (filter.assigneeIds && !filter.assigneeIds.includes('ALL')) {
      raw = raw.filter(item => {
        if (Array.isArray(item.header.id)) {
          return filter.assigneeIds.includes(item.header.id[0])
        }

        return filter.assigneeIds.includes(item.header.id)
      })
    }

    const unAssignees: Task[] = []
    const assigneesMultiple: Group[] = []

    tasks.forEach(task => {
      switch (task.assigneeIds.length) {
        // task not assigned
        case 0:
          unAssignees.push(task)
          break

        //   task assigned for one member
        case 1:
          const assigneeId = task.assigneeIds[0]
          const index = raw.findIndex(item => {
            if (Array.isArray(item.header.id)) {
              return item.header.id[0] === assigneeId
            }

            return item.header.id === assigneeId
          })

          if (index !== -1) {
            raw[index].tasks.push(task)
          } else {
            unAssignees.push(task)
          }
          break

        //   multiple assignee, todo: confirm for one or multiple
        default:
          return
      }
    })

    if (unAssignees.length) {
      raw.push({
        header: {
          title: 'unAssignees',
          color: 'black',
          user: [],
          id: randomId(10)
        },
        tasks: unAssignees
      })
    }
    return raw
  }, [tasks, members, filter])

  return { groupByStatus, groupByMember }
}
