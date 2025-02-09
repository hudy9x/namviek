import { Dispatch, SetStateAction, createContext } from 'react'
import { Grid } from '@prisma/client'

export interface DataFetcherContextType {
  data: Grid[]
  cursor: string
  totalRecords: number
  restRecords: number
  isLoading: boolean
  hasNextPage: boolean
  deleteRow: (ids: string | string[]) => void
  setData: Dispatch<SetStateAction<Grid[]>>
  fetchNextPage: () => void
  updateCustomFields: (taskIds: string[], customFields: Record<string, any>) => void
}

export const DataFetcherContext = createContext<DataFetcherContextType>({
  cursor: '',
  data: [],
  totalRecords: 0,
  restRecords: 0,
  isLoading: false,
  hasNextPage: false,
  deleteRow: () => console.log(1),
  setData: () => console.log(1),
  fetchNextPage: () => console.log(1),
  updateCustomFields: () => console.log(1)
})
