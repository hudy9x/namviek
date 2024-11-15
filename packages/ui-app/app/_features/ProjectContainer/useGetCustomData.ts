import { useCallback, useEffect } from 'react'
import { taskGetCustomQuery } from '@/services/task'
import { useParams } from 'next/navigation'
import { useFilterAdvancedStore } from '../FilterAdvanced/store'
import { IFilterAdvancedData } from '../FilterAdvanced/type'
import { useTaskStore } from '@/store/task'
import localforage from 'localforage'

export default function useGetCustomData() {
  const { projectId } = useParams()
  const filter = useFilterAdvancedStore((state): IFilterAdvancedData => state.filter)
  const { addAllTasks, setTaskLoading } = useTaskStore()

  const key = `TASKLIST_${projectId}`

  const fetchCustomData = useCallback(() => {
    const controller = new AbortController()
    setTaskLoading(true)

    // console.log('Filter being sent to API:', {
    //   condition: filter.condition,
    //   list: filter.list.map(item => ({
    //     id: item.id,
    //     type: item.type,
    //     operator: item.operator,
    //     value: item.value
    //   }))
    // })

    console.log('call taskGetCustomData query')
    taskGetCustomQuery(projectId, filter, controller.signal)
      .then(res => {
        const { data: resData } = res.data
        const { data, status } = resData
        // const { data, status } = data
        if (status === 200) {
          // console.log('Custom query results:', data)
          localforage.setItem(key, data)
          setTimeout(() => {
            addAllTasks(data)
            setTaskLoading(false)
          }, 300)
        } else {
          addAllTasks([])
          localforage.removeItem(key)
          setTaskLoading(false)
          // messageError(error)
        }
      })
      .catch(err => {
        console.error('Failed to fetch custom data:', err)
        setTaskLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [filter, projectId, addAllTasks, setTaskLoading])

  useEffect(() => {
    const cleanup = fetchCustomData()
    return cleanup
  }, [JSON.stringify(filter), projectId])

  return null
} 
