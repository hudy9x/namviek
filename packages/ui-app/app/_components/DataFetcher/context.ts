import { createContext } from 'react'
import { ExtendedTask } from '@/store/task'

export interface DataFetcherContextType {
  data: ExtendedTask[]
  cursor: string
  totalRecords: number
  restRecords: number
  isLoading: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
}

export const DataFetcherContext = createContext<DataFetcherContextType>({
  cursor: '',
  data: [],
  totalRecords: 0,
  restRecords: 0,
  isLoading: false,
  hasNextPage: false,
  fetchNextPage: () => console.log(1)
})
