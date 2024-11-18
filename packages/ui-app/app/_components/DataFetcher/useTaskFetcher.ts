import { useCallback, useState } from 'react'
import { taskGetCustomQuery } from '@/services/task'
import { IFilterAdvancedData } from '@/features/FilterAdvanced/type'
import { ExtendedTask } from '@/store/task'

interface UseTaskFetcherProps {
  projectId: string
  filter: IFilterAdvancedData
  limit: number
  groupBy: string
  orderBy: { [key: string]: 'asc' | 'desc' }
  initialCursor?: string
}

export function useTaskFetcher({
  projectId,
  filter,
  limit,
  orderBy,
  initialCursor
}: UseTaskFetcherProps) {
  console.log('update cursor', initialCursor || 'EMPTY')
  const [data, setData] = useState<ExtendedTask[]>([])
  const [cursor, setCursor] = useState<string>(initialCursor || '')
  const [hasNextPage, setHasNextPage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [totalRecords, setTotalRecords] = useState(0)

  // const fetchData = useCallback((nextCursor?: string) => {
  const fetchData = (nextCursor?: string) => {
    const controller = new AbortController()
    setIsLoading(true)

    taskGetCustomQuery(
      projectId,
      filter,
      controller.signal,
      {
        cursor: nextCursor,
        limit,
        orderBy
      }
    ).then(res => {
      const { data: resData } = res.data
      const { data: items, pageInfo, status } = resData

      console.log('pageInfo', pageInfo)

      if (status === 200) {
        if (nextCursor) {
          setData(prev => [...prev, ...items])
        } else {
          console.log('reset data')
          setData(items)
        }

        console.log('update nextpage, cursor')
        setHasNextPage(pageInfo.hasNextPage)
        setCursor(pageInfo.nextCursor)
        setTotalRecords(pageInfo.totalRecords)

      } else {
        setData([])
      }
    }).catch(err => {
      console.error('Failed to fetch data:', err)
    }).finally(() => {
      setIsLoading(false)
    })

    return controller
  }
  // }, [filter, projectId, limit, orderBy])

  const fetchNextPage = useCallback(() => {
    if (hasNextPage && cursor && !isLoading) {
      fetchData(cursor)
    }
  }, [hasNextPage, cursor, isLoading, fetchData])

  console.log('totalRecords', totalRecords, data.length)
  return {
    data,
    cursor,
    restRecords: Math.max(0, totalRecords - data.length),
    totalRecords,
    isLoading,
    hasNextPage,
    fetchNextPage,
    fetchData
  }
} 
