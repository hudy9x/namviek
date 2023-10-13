import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { Task } from '@prisma/client'

interface IReportContextProps {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  tasks: Task[]
}
const ReportContext = createContext<IReportContextProps>({
  tasks: [],
  loading: true,
  setLoading: () => console.log(1)
})

export const ReportProvider = ReportContext.Provider
export const useReportContext = () => {
  const context = useContext(ReportContext)
  return context
}
