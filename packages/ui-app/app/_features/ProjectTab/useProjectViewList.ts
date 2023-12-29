import { useDebounce } from '@/hooks/useDebounce'
import { projectView } from '@/services/projectView'
import { useProjectViewStore } from '@/store/projectView'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export const useProjectViewList = () => {
  const { projectId } = useParams()
  const { views, addAllView } = useProjectViewStore()

  useDebounce(() => {
    console.log('get project view')
    projectView.get(projectId).then(res => {
      const { data } = res.data

      addAllView(data)
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
  return { views }
}
