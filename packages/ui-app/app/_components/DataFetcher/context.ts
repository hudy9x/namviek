import { createContext } from 'react'
import { ExtendedTask } from '@/store/task'

export interface DataFetcherContextType {
  data: ExtendedTask[]
  isLoading: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
}

export const DataFetcherContext = createContext<DataFetcherContextType | null>(null) 