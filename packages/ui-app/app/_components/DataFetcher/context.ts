import { createContext } from 'react'
import { ExtendedTask } from '@/store/task'

export interface DataFetcherContextType {
  data: ExtendedTask[]
  cursor: string
  isLoading: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
}

// export const DataFetcherContext = createContext<DataFetcherContextType | null>(null) 
export const DataFetcherContext = createContext<DataFetcherContextType>({
  cursor: '',
  data: [],
  isLoading: false,
  hasNextPage: false,
  fetchNextPage: () => console.log(1)
})
