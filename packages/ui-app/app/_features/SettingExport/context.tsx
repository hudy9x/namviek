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
  projectIds?: string[]
}
interface IExportFilterContextProps {
  filter: ITaskFilterFields
  setFilter: Dispatch<SetStateAction<ITaskFilterFields>>
}

const ExportFilterContext = createContext<IExportFilterContextProps>({
  filter: {
    dateOperator: '=',
    date: 'this-month',
    startDate: new Date(),
    endDate: new Date(),
    projectIds: ['ALL']
  },
  setFilter: () => {
    console.log('1')
  }
})

export const SettingFilterProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const d = new Date()
  const firstDate = new Date(d.getFullYear(), d.getMonth(), 1)
  const lastDate = getLastDateOfMonth(new Date())
  console.log('firstDate', firstDate)
  const [filter, setFilter] = useState<ITaskFilterFields>({
    term: '',
    dateOperator: '=',
    date: 'this-month',
    startDate: firstDate,
    endDate: lastDate,
    projectIds: ['ALL']
  })

  return (
    <ExportFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </ExportFilterContext.Provider>
  )
}

export const useExportFilter = () => {
  const { filter, setFilter } = useContext(ExportFilterContext)
  const setFilterValue = (
    name: keyof ITaskFilterFields,
    val: string | string[] | Date
  ) => {
    setFilter(filter => ({ ...filter, [name]: val }))
  }

  return {
    filter,
    setFilter,
    setFilterValue
  }
}
