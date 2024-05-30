'use client'

import { useSearchParams, useRouter, useParams } from 'next/navigation'
import './style.css'
import { useProjectViewList } from './useProjectViewList'
import ProjectViewIcon from './ProjectViewIcon'
import ProjectViewItemDropdown from './ProjectViewItemDropdown'
import DynamicIcon from '@/components/DynamicIcon'
import { Loading } from '@shared/ui'

export default function ProjectViewList({ onUpdate }: { onUpdate: (id: string) => void }) {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const params = useParams()
  const mode = searchParams.get('mode')
  const { views } = useProjectViewList()

  const clickOnView = (name: string) => {
    push(`${params.orgID}/project/${params.projectId}?mode=${name}`)
  }

  return (
    <>
      {!views.length ? (
        <div className="px-3 pt-2 pb-2.5 flex items-center justify-center">
          <Loading enabled={true} title='Loading views ...' />
        </div>
      ) : null}
      {views.map((view, index) => {
        const active = mode === view.id
        const { icon } = view

        return (
          <div
            onClick={() => clickOnView(view.id)}
            className={`project-view-item group relative ${active ? 'active' : ''}`}
            key={index}>
            {icon ? (
              <DynamicIcon name={icon} />
            ) : (
              <ProjectViewIcon type={view.type} />
            )}
            <span>{view.name} {view.order}</span>
            <ProjectViewItemDropdown
              id={view.id}
              name={view.name || ''}
              type={view.type}
              onUpdate={id => {
                onUpdate(id)
              }}
            />
          </div>
        )
      })}
    </>
  )
}
