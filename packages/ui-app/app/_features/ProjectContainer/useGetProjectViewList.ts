import { useDebounce } from '@/hooks/useDebounce'
import { useParams } from 'next/navigation'
import {
  useProjectViewList,
  useProjectViewListHandler
} from '../ProjectView/useProjectViewList'

export const useGetProjectViewList = () => {
  const { projectId } = useParams()
  const { setLoading } = useProjectViewList()
  const { fetchNCache } = useProjectViewListHandler(projectId, () => {
    setLoading(false)
  })

  // fetch project's views everytime the project id changed
  useDebounce(() => {
    const { abortController } = fetchNCache()

    return () => {
      abortController.abort()
    }
  }, [projectId])
}
