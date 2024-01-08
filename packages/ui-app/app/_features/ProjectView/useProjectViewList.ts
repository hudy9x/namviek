import { useDebounce } from '@/hooks/useDebounce'
import { projectView } from '@/services/projectView'
import { useProjectViewStore } from '@/store/projectView'
import { useParams } from 'next/navigation'

export const useProjectViewList = () => {

  const { projectId } = useParams()
  const { views, addAllView, loading, setLoading } = useProjectViewStore()

  useDebounce(() => {
    console.log('get project view')
    setLoading(true)
    projectView.get(projectId).then(res => {
      const { data } = res.data
      addAllView(data)

    }).finally(() => {
      setLoading(false)
    })
  }, [projectId])

  // useEffect(() => {
  //   projectView.get(projectId).then(res => {
  //     const { data } = res.data
  //     console.log('projectview', data)
  //     addAllView(data)
  //   })
  // }, [projectId])
  //
  return { views, loading, setLoading }
}
