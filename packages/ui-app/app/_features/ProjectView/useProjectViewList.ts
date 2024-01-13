import { useDebounce } from '@/hooks/useDebounce'
import { useUrl } from '@/hooks/useUrl'
import { projectView } from '@/services/projectView'
import { useProjectViewStore } from '@/store/projectView'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export const useProjectViewList = () => {

  const { getSp } = useUrl()
  const { projectId } = useParams()
  const { views, addAllView, loading, setLoading } = useProjectViewStore()

  const mode = getSp('mode')
  const currentViewType = useMemo(() => {

    if (views.length) {
      const view = views.find(v => v.id === mode)
      if (view) {
        return view.type
      }
    }

    return ''

  }, [JSON.stringify(views), mode])


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
  return { views, loading, setLoading, currentViewType }
}
