import { useContext } from 'react'
import {
  ETaskFilterGroupByType,
  ITaskFilterFields,
  TaskFilterContext
} from './context'
import { getLastDateOfMonth } from '@shared/libs'

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
  assigneeIds: ['ME'],
  statusIds: ['ALL'],
  status: 'ALL'
}

export default function useTaskFilterContext() {
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

  const updateGroupByFilter = (val: ETaskFilterGroupByType) => {
    if (val === filter.groupBy) return
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
