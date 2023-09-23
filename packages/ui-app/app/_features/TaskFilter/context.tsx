'use client'
import { useMemberStore } from '@/store/member'
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

interface ITaskFilterFields {
  term?: string
  dateOperator: string
  date: string
  startDate?: Date
  endDate?: Date
  point: string
  priority: TaskPriority | 'ALL'
  assigneeIds: string[]
}
interface ITaskFilterContextProps {
  filter: ITaskFilterFields
  setFilter: Dispatch<SetStateAction<ITaskFilterFields>>
}

const TaskFilterContext = createContext<ITaskFilterContextProps>({
  filter: {
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
  const [filter, setFilter] = useState<ITaskFilterFields>({
    term: '',
    dateOperator: '=',
    date: 'this-month',
    startDate: firstDate,
    endDate: lastDate,
    point: '-1',
    priority: 'ALL',
    assigneeIds: ['ALL']
  })

  return (
    <TaskFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </TaskFilterContext.Provider>
  )
}

export const useTaskFilter = () => {
  const { filter, setFilter } = useContext(TaskFilterContext)
  const setFilterValue = (
    name: keyof ITaskFilterFields,
    val: string | string[] | Date
  ) => {
    setFilter(filter => ({ ...filter, [name]: val }))
  }

  const refactorFilter = () => {
    console.log('a')
  }

  return {
    filter,
    setFilter,
    setFilterValue
  }
}
