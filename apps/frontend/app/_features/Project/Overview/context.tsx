import { DashboardComponent, Task } from '@prisma/client'
import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { DateRange } from 'react-day-picker'

interface IOverviewContext {
  loading: boolean
  dboardId: string
  components: DashboardComponent[]

  setLoading: Dispatch<SetStateAction<boolean>>
  setDboardId: Dispatch<SetStateAction<string>>
  setComponents: Dispatch<SetStateAction<DashboardComponent[]>>
  delComponent: (id: string) => void
}

const OverviewContext = createContext<IOverviewContext>({
  loading: false,
  dboardId: '',
  components: [],
  setDboardId: () => {
    console.log('1')
  },
  setComponents: () => {
    console.log('1')
  },
  setLoading: () => {
    console.log('1')
  },
  delComponent: () => {
    console.log('1')
  }
})

export const OverviewProvider = OverviewContext.Provider

export const useOverviewContext = () => {
  const context = useContext(OverviewContext)
  return context
}
