import { useCallback, useState } from 'react'
import { taskGetCustomQuery } from '@/services/task'
import { IFilterAdvancedData } from '@/features/FilterAdvanced/type'
import { ExtendedTask } from '@/store/task'

interface UseTaskFetcherProps {
  projectId: string
  filter: IFilterAdvancedData
  limit: number
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
  const [data, setData] = useState<ExtendedTask[]>([])
  const [cursor, setCursor] = useState<string | null>(initialCursor || null)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = useCallback((nextCursor?: string) => {
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

      if (status === 200) {
        if (nextCursor) {
          setData(prev => [...prev, ...items])
        } else {
          setData(items)
        }

        setHasNextPage(pageInfo.hasNextPage)
        setCursor(pageInfo.nextCursor)
      } else {
        setData([])
      }
    }).catch(err => {
      console.error('Failed to fetch data:', err)
    }).finally(() => {
      setIsLoading(false)
    })

    return controller
  }, [filter, projectId, limit, orderBy])

  const fetchNextPage = useCallback(() => {
    if (hasNextPage && cursor && !isLoading) {
      fetchData(cursor)
    }
  }, [hasNextPage, cursor, isLoading, fetchData])

  return {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    fetchData
  }
} 