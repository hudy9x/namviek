import { Task } from '@prisma/client'
import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { DateRange } from 'react-day-picker'

interface IOverviewContext {
  tasks: Task[]
  range: DateRange | undefined
  setRange: Dispatch<SetStateAction<DateRange | undefined>>
}

const OverviewContext = createContext<IOverviewContext>({
  tasks: [],
  range: undefined,
  setRange: () => {
    console.log(1)
  }
})

export const OverviewProvider = OverviewContext.Provider

export const useOverviewContext = () => {
  const context = useContext(OverviewContext)
  return context
}
