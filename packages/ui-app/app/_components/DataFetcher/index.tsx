import { useCallback, useEffect, useState, createContext, useContext, useMemo, useRef } from 'react'
import { useParams } from 'next/navigation'
import { EFilterCondition, IFilterAdvancedData } from '@/features/FilterAdvanced/type'
import { ExtendedTask } from '@/store/task'
import { useTaskFetcher } from './hooks/useTaskFetcher'

interface DataFetcherContextType {
  data: ExtendedTask[]
  isLoading: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
}

const DataFetcherContext = createContext<DataFetcherContextType | null>(null)

interface DataFetcherProps {
  children: React.ReactNode
  filter?: IFilterAdvancedData
  initialCursor?: string
  limit?: number
  orderBy?: { [key: string]: 'asc' | 'desc' }

}
export default function DataFetcher({
  children,
  filter = { condition: EFilterCondition.AND, list: [] },
  initialCursor,
  limit = 50,
  orderBy = { id: 'asc' }
}: DataFetcherProps) {
  const { projectId } = useParams()

  const { data, isLoading, hasNextPage, fetchNextPage, fetchData } = useTaskFetcher({
    projectId,
    filter,
    limit,
    orderBy,
    initialCursor
  })

  useEffect(() => {
    const controller = fetchData()
    return () => controller.abort()
  }, [JSON.stringify(filter), projectId, limit, JSON.stringify(orderBy)])

  const contextValue: DataFetcherContextType = {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage
  }

  return (
    <DataFetcherContext.Provider value={contextValue}>
      {children}
    </DataFetcherContext.Provider>
  )
}
