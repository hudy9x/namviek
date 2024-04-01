import { useDebounce } from '@/hooks/useDebounce'
import { useUrl } from '@/hooks/useUrl'
import { projectView } from '@/services/projectView'
import { useProjectViewStore } from '@/store/projectView'
import { ProjectView, ProjectViewType } from '@prisma/client'
import { getLocalCache, setLocalCache } from '@shared/libs'
import localforage from 'localforage'
import { useParams } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'

type TCurrentViewType = ProjectViewType | ''

export const projectViewMap = new Map<string, TCurrentViewType>()

export const useProjectViewListHandler = (
  projectId: string,
  cb?: () => void
) => {
  const { addAllView } = useProjectViewStore()
  const key = `PROJECT_VIEW_${projectId}`
  const fetchNCache = () => {
    const controller = new AbortController()

    projectView
      .get(projectId, controller.signal)
      .then(res => {
        const { data } = res.data
        const views = data as ProjectView[]

        let sortedViews
        if (views && views.length) {
          sortedViews = views.sort((a, b) => {
            const a1 = a.order || 1
            const b1 = b.order || 1
            return a1 - b1
          })
          addAllView(sortedViews)
        } else {
          addAllView(views)
        }

        localforage.setItem(key, views)
        views.forEach(v => projectViewMap.set(v.id, v.type))
      })
      .finally(() => {
        cb && cb()
      })
    return { abortController: controller }
  }

  return {
    fetchNCache
  }
}

export const useProjectViewList = () => {
  const { getSp } = useUrl()
  const { projectId } = useParams()
  const { views } = useProjectViewStore()
  const [loading, setLoading] = useState(true)
  // const { fetchNCache } = useProjectViewListHandler(projectId, () => {
  //   setLoading(false)
  // })
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
  //
  // useDebounce(() => {
  //
  //   const { abortController } = fetchNCache()
  //
  //   return () => {
  //     abortController.abort()
  //   }
  // }, [projectId])

  return {
    views,
    loading,
    setLoading,
    currentViewType,
    setCurrentViewType,
    setCachedViewType
  }
}
