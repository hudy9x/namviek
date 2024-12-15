import { useEffect, ReactNode } from 'react'
import { useParams } from 'next/navigation'
import { EFilterCondition, IFilterAdvancedData } from '@/features/FilterAdvanced/type'
import { useTaskFetcher } from './useTaskFetcher'
import { DataFetcherContext, DataFetcherContextType } from './context'

interface DataFetcherProps {
  children: ReactNode
  groupBy?: string
  filter?: IFilterAdvancedData
  initialCursor?: string
  limit?: number
  orderBy?: { [key: string]: 'asc' | 'desc' }

}
export default function DataFetcher({
  children,
  filter = { condition: EFilterCondition.AND, list: [] },
  groupBy = '',
  initialCursor,
  limit = 20,
  orderBy = { id: 'asc' }
}: DataFetcherProps) {
  const { projectId } = useParams()
  const {
    data,
    cursor,
    setData,
    isLoading,
    hasNextPage,
    deleteRow,
    totalRecords,
    restRecords,
    fetchNextPage,
    updateCustomFields,
    fetchData
  } = useTaskFetcher({
    projectId,
    groupBy,
    filter,
    limit,
    orderBy,
    initialCursor
  })

  useEffect(() => {
    const controller = fetchData(initialCursor)
    return () => controller.abort()
  }, [JSON.stringify(filter), initialCursor, projectId, limit, JSON.stringify(orderBy)])

  const contextValue: DataFetcherContextType = {
    cursor,
    setData,
    deleteRow,
    data,
    totalRecords,
    restRecords,
    isLoading,
    hasNextPage,
    fetchNextPage,
    updateCustomFields
  }

  return (
    <DataFetcherContext.Provider value={contextValue}>
      {children}
    </DataFetcherContext.Provider>
  )
}
