'use client'
import { useMemberStore } from '@/store/member'
import { useProjectStatusStore } from '@/store/status'
import { TaskPriority } from '@prisma/client'
import { getLastDateOfMonth } from '@shared/libs'
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  useEffect
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

export const TaskFilterProvider = ({ children }: { children: ReactNode }) => {
  const d = new Date()
  const firstDate = new Date(d.getFullYear(), d.getMonth(), 1)
  const lastDate = getLastDateOfMonth(new Date())
  const [groupByItems, setGroupbyItems] = useState<ITaskFilterGroupbyItem[]>([])
  const [groupByLoading, setGroupbyLoading] = useState(false)
  const [filter, setFilter] = useState<ITaskFilterFields>({
    term: '',
    groupBy: ETaskFilterGroupByType.STATUS,
    dateOperator: '=',
    date: 'this-month',
    startDate: firstDate,
    endDate: lastDate,
    point: '-1',
    priority: 'ALL',
    assigneeIds: ['ALL']
  })

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

  const _groupByStatus = (): ITaskFilterGroupbyItem[] => {
    return statuses.map(stt => {
      const { id, name, color } = stt
      return {
        id,
        color,
        name
      }
    })
  }

  const _groupByPriority = (): ITaskFilterGroupbyItem[] => {
    const priorities = [
      [TaskPriority.URGENT, '#ff1345'],
      [TaskPriority.HIGH, '#ffce37'],
      [TaskPriority.NORMAL, '#13cfff'],
      [TaskPriority.LOW, '#ababab']
    ]

    return priorities.map(p => ({
      id: p[0],
      name: p[0],
      color: p[1]
    }))
  }

  const _groupByAssignee = (): ITaskFilterGroupbyItem[] => {
    const newMembers = members.map(mem => ({
      id: mem.id,
      name: mem.name || '',
      icon: mem.photo || ''
    }))

    newMembers.push({
      id: 'NONE',
      name: 'Not assigned',
      icon: ''
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

  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      updateGroupbyItems()
    }, 350) as unknown as number
  }, [filter.groupBy, JSON.stringify(members), JSON.stringify(statuses)])

  const isGroupbyStatus = filter.groupBy === ETaskFilterGroupByType.STATUS
  const isGroupbyAssignee = filter.groupBy === ETaskFilterGroupByType.ASSIGNEE
  const isGroupbyPriority = filter.groupBy === ETaskFilterGroupByType.PRIORITY

  return {
    groupBy: filter.groupBy,
    groupByLoading,
    groupByItems,
    filter,
    setFilter,
    setFilterValue,
    isGroupbyStatus,
    updateGroupByFilter,
    setDateRangeByMonth,
    isGroupbyAssignee,
    isGroupbyPriority
  }
}
