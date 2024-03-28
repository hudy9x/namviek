import { useDebounce } from '@/hooks/useDebounce'
import { useSearchParams } from 'next/navigation'
import { useProjectViewList } from './useProjectViewList'
import { IBoardFilter } from './context'
import useTaskFilterContext from '../TaskFilter/useTaskFilterContext'

export default function useSetViewFilter() {
  const searchParams = useSearchParams()
  const { views } = useProjectViewList()
  const { setFilter, setDefaultFilter } = useTaskFilterContext()
  const mode = searchParams.get('mode')

  // update task filter once user change to another view
  useDebounce(() => {
    const viewId = mode
    const view = views.find(v => v.id === viewId)

    if (
      view &&
      view.data &&
      !Object.keys(view.data as { [key: string]: unknown }).length
    ) {
      setDefaultFilter()
    }

    if (
      view &&
      view.data &&
      Object.keys(view.data as { [key: string]: unknown }).length
    ) {
      const data = view.data as unknown as IBoardFilter
      console.log('set view data fileter', data)

      setFilter(filter => ({
        ...filter,
        ...{
          date: data.date,
          groupBy: data.groupBy,
          priority: data.priority,
          statusIds: data.statusIds,
          point: data.point
        }
      }))
    }
  }, [mode, views.toString()])
}
