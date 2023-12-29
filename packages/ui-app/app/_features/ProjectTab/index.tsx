'use client'

import { useSearchParams, useRouter, useParams } from 'next/navigation'
import ProjectViewCreate from './ProjectViewCreate'
import './style.css'
import { useProjectViewList } from './useProjectViewList'
import ProjectViewIcon from './ProjectViewIcon'

export default function ProjectTab() {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const params = useParams()
  const mode = searchParams.get('mode')
  const { views } = useProjectViewList()

  const onMoveTab = (name: string) => {
    push(`${params.orgID}/project/${params.projectId}?mode=${name}`)
  }

  console.log('views', views)

  return (
    <div className="project-tab pl-1">
      {views.map((view, index) => {
        const active = mode === view.id

        return (
          <div
            onClick={() => onMoveTab(view.id)}
            className={`project-tab-item ${active ? 'active' : ''}`}
            key={index}>
            <ProjectViewIcon type={view.type} />
            <span>{view.name}</span>
          </div>
        )
      })}

      {views.length ?
        <div className="w-[1px] h-[20px] bg-gray-300 mx-2 my-2"></div> : null}
      <ProjectViewCreate />
    </div>
  )
}
