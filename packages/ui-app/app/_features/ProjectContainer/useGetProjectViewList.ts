
import { useDebounce } from '@/hooks/useDebounce'
import { useParams } from 'next/navigation'
import { useProjectViewList, useProjectViewListHandler } from '../ProjectView/useProjectViewList'
import { useUrl } from '@/hooks/useUrl'

export const useGetProjectViewList = () => {
  const { getSp } = useUrl()
  const mode = getSp('mode')
  const { projectId } = useParams()
  const { setLoading, views, setCurrentViewType, setCachedViewType } = useProjectViewList()
  const { fetchNCache } = useProjectViewListHandler(projectId, () => {
    setLoading(false)
  })

  // get type of current view
  useDebounce(() => {
    if (views.length) {
      const view = views.find(v => v.id === mode)
      if (view) {
        setCurrentViewType(view.type)
        setCachedViewType(view.type)
      }
    }
  }, [views, mode])

  // fetch project's views everytime the project id changed
  useDebounce(() => {

    const { abortController } = fetchNCache()

    return () => {
      abortController.abort()
    }
  }, [projectId])


}
