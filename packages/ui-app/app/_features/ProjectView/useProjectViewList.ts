import { useDebounce } from '@/hooks/useDebounce'
import { useUrl } from '@/hooks/useUrl'
import { projectView } from '@/services/projectView'
import { useProjectViewStore } from '@/store/projectView'
import { ProjectView, ProjectViewType } from '@prisma/client'
import { getLocalCache, setLocalCache } from '@shared/libs'
import localforage from 'localforage'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

type TCurrentViewType = ProjectViewType | ''

export const useProjectViewList = () => {
  const { getSp } = useUrl()
  const { projectId } = useParams()
  const { views, addAllView } = useProjectViewStore()
  const [loading, setLoading] = useState(true)
  const key = `PROJECT_VIEW_${projectId}`
  const currentViewKey = `CURRENT_VIEW_TYPE_${projectId}`

  const getCachedViewType = useCallback(() => {
    const cached = getLocalCache(currentViewKey) || ''
    return cached as TCurrentViewType
  }, [])

  const setCachedViewType = useCallback((type: TCurrentViewType) => {
    setLocalCache(currentViewKey, type)
  }, [])

  const [currentViewType, setCurrentViewType] = useState<TCurrentViewType>(
    getCachedViewType()
  )

  const mode = getSp('mode')

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

  // set all view to caches
  useEffect(() => {
    localforage.getItem(key).then(val => {
      val && addAllView(val as ProjectView[])
    })
  }, [])

  useDebounce(() => {
    // setLoading(true)
    projectView
      .get(projectId)
      .then(res => {
        const { data } = res.data
        addAllView(data)
        localforage.setItem(key, data)
      })
      .finally(() => {
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
