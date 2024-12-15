import { useCallback, useState } from 'react'
import { IFilterAdvancedData } from '@/features/FilterAdvanced/type'
import { ExtendedTask } from '@/store/task'
import { FieldType } from '@prisma/client'
import { projectGridSv } from '@/services/project.grid'

interface UseTaskFetcherProps {
  projectId: string
  filter: IFilterAdvancedData
  limit: number
  groupBy: string
  orderBy: { [key: string]: 'asc' | 'desc' }
  initialCursor?: string
}

type FieldValues = {
  [fieldId: string]: { value: string, type: FieldType }
}

export function useTaskFetcher({
  projectId,
  filter,
  limit,
  orderBy,
  initialCursor
}: UseTaskFetcherProps) {
  const [data, setData] = useState<ExtendedTask[]>([])
  const [cursor, setCursor] = useState<string>(initialCursor || '')
  const [hasNextPage, setHasNextPage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [totalRecords, setTotalRecords] = useState(0)

  const fetchData = useCallback((nextCursor?: string) => {
    // const fetchData = (nextCursor?: string) => {
    const controller = new AbortController()
    setIsLoading(true)

    projectGridSv.get(
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
    // }
  }, [filter, projectId, limit, orderBy])

  const fetchNextPage = useCallback(() => {
    if (hasNextPage && cursor && !isLoading) {
      fetchData(cursor)
    }
  }, [hasNextPage, cursor, isLoading, fetchData])

  const updateCustomFields = useCallback((taskIds: string[], customFields: FieldValues) => {

    const newCustomFields = Object.entries(customFields)
      .reduce((acc, [fieldId, { value }]) => ({
        ...acc,
        [fieldId]: value
      }), {})

    setData(prevData => {
      const result = prevData.map(task => {
        if (!taskIds.includes(task.id)) {
          return task
        }

        return {
          ...task,
          updatedAt: new Date(),
          customFields: { ...Object(task.customFields), ...newCustomFields }
        }
      })
      return result
    }

    )
  }, [])

  const deleteRow = (ids: string | string[]) => {
    const deletedIds = Array.isArray(ids) ? ids : [ids]

    setData(prevData => {
      return prevData.filter(dt => {
        return deletedIds.includes(dt.id) ? false : true
      })
    })
  }

  return {
    data,
    setData,
    cursor,
    restRecords: Math.max(0, totalRecords - data.length),
    totalRecords,
    isLoading,
    hasNextPage,
    fetchNextPage,
    fetchData,
    deleteRow,
    updateCustomFields
  }
} 
