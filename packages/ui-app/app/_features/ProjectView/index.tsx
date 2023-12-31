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

export default function ProjectView() {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const params = useParams()
  const mode = searchParams.get('mode')
  const { views, loading } = useProjectViewList()
  const { setFilter, setDefaultFilter } = useTaskFilter()

  const onMoveTab = (name: string) => {
    const view = views.find(v => v.id === name)

    if (view && !view.data) {
      setDefaultFilter()
    }

    if (view && view.data) {

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

    push(`${params.orgID}/project/${params.projectId}?mode=${name}`)
  }

  return (
    <div className="project-view pl-1 relative">

      <Loading.Absolute title='' enabled={loading} />
      {views.map((view, index) => {
        const active = mode === view.id

        return (
          <div
            onClick={() => onMoveTab(view.id)}
            className={`project-view-item group relative ${active ? 'active' : ''}`}
            key={index}>
            <ProjectViewIcon type={view.type} />
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
