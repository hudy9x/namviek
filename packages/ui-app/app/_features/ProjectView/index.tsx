'use client'

import { useSearchParams, useRouter, useParams } from 'next/navigation'
import ProjectViewCreate from './ProjectViewCreate'
import './style.css'
import { useProjectViewList } from './useProjectViewList'
import ProjectViewIcon from './ProjectViewIcon'
import { Loading } from '@shared/ui'
import ProjectViewItemDropdown from './ProjectViewItemDropdown'
import { useTaskFilter } from '../TaskFilter/context'
import { IBoardFilter } from './context'
import { useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import DynamicIcon from '@/components/DynamicIcon'

export default function ProjectView() {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const params = useParams()
  const mode = searchParams.get('mode')
  const { views, loading } = useProjectViewList()
  const { setFilter, setDefaultFilter } = useTaskFilter()

  const clickOnView = (name: string) => {
    push(`${params.orgID}/project/${params.projectId}?mode=${name}`)
  }

  useDebounce(() => {
    const viewId = mode
    const view = views.find(v => v.id === viewId)



    if (view && !Object.keys(view.data as { [key: string]: unknown }).length) {
      console.log('set default filter')
      setDefaultFilter()
    }

    if (view && Object.keys(view.data as { [key: string]: unknown }).length) {
      console.log('set custom filter', view.data)

      const data = view.data as unknown as IBoardFilter
      setFilter(filter => ({
        ...filter,
        ...{
          date: data.date,
          groupBy: data.groupBy,
          priority: data.priority,
          point: data.point
        }
      }))
      console.log(view?.data)
    }
  }, [mode, views.toString()])

  return (
    <div className="project-view pl-1 relative">

      <Loading.Absolute title='' enabled={loading} />
      {views.map((view, index) => {
        const active = mode === view.id
        const { icon } = view
        console.log(icon)

        return (
          <div
            onClick={() => clickOnView(view.id)}
            className={`project-view-item group relative ${active ? 'active' : ''}`}
            key={index}>
            {icon ? <DynamicIcon name={icon} /> :
              <ProjectViewIcon type={view.type} />}
            <span>{view.name}</span>
            <ProjectViewItemDropdown id={view.id} name={view.name || ''} type={view.type} />
          </div>
        )
      })}

      {views.length ?
        <div className="w-[1px] h-[20px] bg-gray-300 dark:bg-gray-700 mx-2 my-2"></div> : null}
      <ProjectViewCreate />
    </div>
  )
}
