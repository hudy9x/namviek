import { useEffect, ReactNode } from 'react'
import { useParams } from 'next/navigation'
import { EFilterCondition, IFilterAdvancedData } from '@/features/FilterAdvanced/type'
import { useTaskFetcher } from './useTaskFetcher'
import { DataFetcherContext, DataFetcherContextType } from './context'

interface DataFetcherProps {
  children: ReactNode
  filter?: IFilterAdvancedData
  initialCursor?: string
  limit?: number
  orderBy?: { [key: string]: 'asc' | 'desc' }

}
export default function DataFetcher({
  children,
  filter = { condition: EFilterCondition.AND, list: [] },
  initialCursor,
  limit = 20,
  orderBy = { id: 'asc' }
}: DataFetcherProps) {
  const { projectId } = useParams()

  const { data, cursor, isLoading, hasNextPage, fetchNextPage, fetchData } = useTaskFetcher({
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
    cursor,
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
