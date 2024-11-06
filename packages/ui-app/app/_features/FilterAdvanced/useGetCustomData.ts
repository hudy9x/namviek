import { useCallback, useEffect } from 'react'
import { useFilterAdvancedStore } from './store'
import { taskGetCustomQuery } from '@/services/task'
import { useParams } from 'next/navigation'
import { IFilterAdvancedData } from './type'

export default function useGetCustomData() {
  const { projectId } = useParams()
  const filter = useFilterAdvancedStore((state): IFilterAdvancedData => state.filter)

  const fetchCustomData = useCallback(() => {
    const controller = new AbortController()

    console.log('Filter being sent to API:', {
      condition: filter.condition,
      list: filter.list.map(item => ({
        id: item.id,
        type: item.type,
        operator: item.operator,
        value: item.value
      }))
    })

    taskGetCustomQuery(filter, controller.signal)
      .then(res => {
        const { data, status, error } = res.data
        if (status === 200) {
          console.log('Custom query results:', data)
        } else {
          console.error('Custom query error:', error)
        }
      })
      .catch(err => {
        console.error('Failed to fetch custom data:', err)
      })

    return () => {
      controller.abort()
    }
  }, [filter])

  useEffect(() => {
    const cleanup = fetchCustomData()
    return cleanup
  }, [JSON.stringify(filter), projectId])

  return null
} 