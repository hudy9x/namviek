'use client'
import { useMemberStore } from '@/store/member'
import { useProjectStatusStore } from '@/store/status'
import { useTaskStore } from '@/store/task'
import { TaskPriority } from '@prisma/client'
import { getLastDateOfMonth } from '@shared/libs'

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  useEffect,
  useRef
} from 'react'

export enum ETaskFilterGroupByType {
  ASSIGNEE = 'ASSIGNEE',
  STATUS = 'STATUS',
  PRIORITY = 'PRIORITY'
  // WEEK = 'WEEK'
}

interface ITaskFilterFields {
  groupBy: ETaskFilterGroupByType
  term?: string
  dateOperator: string
  date: string
  startDate?: Date
  done?: 'yes' | 'no'
  endDate?: Date
  point: string
  priority: TaskPriority | 'ALL'
  assigneeIds: string[]
}

export interface ITaskFilterGroupbyItem {
  id: string
  name: string
  icon?: string
  color?: string
  items: string[]
}

interface ITaskFilterContextProps {
  groupByLoading: boolean
  setGroupbyLoading: Dispatch<SetStateAction<boolean>>
  groupByItems: ITaskFilterGroupbyItem[]
  setGroupbyItems: Dispatch<SetStateAction<ITaskFilterGroupbyItem[]>>
  filter: ITaskFilterFields
  setFilter: Dispatch<SetStateAction<ITaskFilterFields>>
}

const TaskFilterContext = createContext<ITaskFilterContextProps>({
  groupByItems: [],
  groupByLoading: false,
  setGroupbyItems: () => {
    console.log(2)
  },
  setGroupbyLoading: () => {
    console.log(3)
  },
  filter: {
    groupBy: ETaskFilterGroupByType.STATUS,
    term: '',
    dateOperator: '=',
    date: 'this-month',
    startDate: new Date(),
    endDate: new Date(),
    point: 'INFINITE',
    priority: 'ALL',
    assigneeIds: []
  },
  setFilter: () => {
    console.log('1')
  }
})

const d = new Date()
const firstDate = new Date(d.getFullYear(), d.getMonth(), 1)
const lastDate = getLastDateOfMonth(new Date())
const defaultFilter: ITaskFilterFields = {
  term: '',
  groupBy: ETaskFilterGroupByType.STATUS,
  dateOperator: '=',
  date: 'this-month',
  startDate: firstDate,
  endDate: lastDate,
  point: '-1',
  priority: 'ALL',
  assigneeIds: ['ALL']
}

export const TaskFilterProvider = ({ children }: { children: ReactNode }) => {
  // const d = new Date()
  // const firstDate = new Date(d.getFullYear(), d.getMonth(), 1)
  // const lastDate = getLastDateOfMonth(new Date())
  const [groupByItems, setGroupbyItems] = useState<ITaskFilterGroupbyItem[]>([])
  const [groupByLoading, setGroupbyLoading] = useState(false)
  const [filter, setFilter] = useState<ITaskFilterFields>(defaultFilter)

  return (
    <TaskFilterContext.Provider
      value={{
        filter,
        setFilter,
        groupByItems,
        setGroupbyItems,
        groupByLoading,
        setGroupbyLoading
      }}>
      {children}
    </TaskFilterContext.Provider>
  )
}

let timeout = 0

export const useTaskFilter = () => {
  const { statuses } = useProjectStatusStore()
  const { members } = useMemberStore()
  const { tasks } = useTaskStore()

  const oldGroupByType = useRef('')
  const oldStatusList = useRef(statuses)
  const oldTaskList = useRef(tasks)

  const {
    filter,
    setFilter,
    groupByItems,
    setGroupbyItems,
    groupByLoading,
    setGroupbyLoading
  } = useContext(TaskFilterContext)

  const setFilterValue = (
    name: keyof ITaskFilterFields,
    val: string | string[] | Date | ETaskFilterGroupByType
  ) => {
    setFilter(filter => ({ ...filter, [name]: val }))
  }

  const setDefaultFilter = () => {
    setFilter(defaultFilter)
  }

  const _groupByStatus = (): ITaskFilterGroupbyItem[] => {
    const ignored: string[] = []

    return statuses.map(stt => {
      const { id, name, color } = stt
      const items: string[] = []

      tasks.forEach(t => {
        if (ignored.includes(t.id)) return

        if (t.taskStatusId === id) {
          items.push(t.id)
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
  }

  const _groupByPriority = (): ITaskFilterGroupbyItem[] => {
    const priorities = [
      [TaskPriority.LOW, '#ababab'],
      [TaskPriority.NORMAL, '#13cfff'],
      [TaskPriority.HIGH, '#ffce37'],
      [TaskPriority.URGENT, '#ff1345']
    ]

    const ignored: string[] = []
    return priorities.map(p => {
      const items: string[] = []

      tasks.forEach(t => {
        if (ignored.includes(t.id)) return

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
    const newMembers = members.map(mem => {
      const items: string[] = []

      tasks.forEach(t => {
        if (ignored.includes(t.id)) return

        if (!t.assigneeIds.length) {
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

  const updateGroupByFilter = (val: ETaskFilterGroupByType) => {
    setGroupbyLoading(true)
    setFilterValue('groupBy', val)
  }

  const setDateRangeByMonth = (month: string) => {
    const today = new Date()
    const lastDayOfMonth = new Date(today.getFullYear(), +month + 1, 0)
    const startDayOfMonth = new Date(today.getFullYear(), +month, 1)

    setFilter(prev => ({
      ...prev,
      date: 'date-range',
      startDate: startDayOfMonth,
      endDate: lastDayOfMonth
    }))
  }

  const swapGroupItemOrder = (sourceId: number, destId: number) => {
    const cloned = structuredClone(groupByItems)

    const destItem = cloned[sourceId]
    cloned.splice(sourceId, 1)
    cloned.splice(destId, 0, destItem)

    setGroupbyItems(cloned)
  }

  const swapTaskOrder = (
    dropId: string,
    sourceIndex: number,
    destIndex: number
  ) => {
    const cloned = structuredClone(groupByItems)
    const groupItem = cloned.find(c => c.id === dropId)

    if (!groupItem) return

    const items = groupItem.items

    // const destItem = items[sourceIndex]
    // items.splice(sourceIndex, 1)
    // items.splice(destIndex, 0, destItem)

    const [removed] = items.splice(sourceIndex, 1)
    items.splice(destIndex, 0, removed)

    setGroupbyItems(cloned)
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

  const isGroupbyStatus = filter.groupBy === ETaskFilterGroupByType.STATUS
  const isGroupbyAssignee = filter.groupBy === ETaskFilterGroupByType.ASSIGNEE
  const isGroupbyPriority = filter.groupBy === ETaskFilterGroupByType.PRIORITY

  return {
    groupBy: filter.groupBy,
    groupByLoading,
    groupByItems,
    setGroupbyItems,
    swapTaskOrder,
    swapGroupItemOrder,
    filter,
    setFilter,
    setDefaultFilter,
    setFilterValue,
    isGroupbyStatus,
    updateGroupByFilter,
    setDateRangeByMonth,
    isGroupbyAssignee,
    isGroupbyPriority
  }
}
