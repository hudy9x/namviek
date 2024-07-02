'use client'

import { useSearchParams, useRouter, useParams } from 'next/navigation'
import './style.css'
import { useProjectViewList } from './useProjectViewList'
import ProjectViewIcon from './ProjectViewIcon'
import ProjectViewItemDropdown from './ProjectViewItemDropdown'
import DynamicIcon from '@/components/DynamicIcon'
import { Loading } from '@shared/ui'
import { HiOutlineEye } from 'react-icons/hi2'

function OnlyMeIcon({ enabled }: { enabled: boolean }) {
  if (!enabled) return null
  return <HiOutlineEye className='absolute transition-all p-0.5 shadow-md border dark:border-gray-700 rounded-sm bg-white dark:bg-gray-800  group-hover:opacity-100 opacity-0 top-1 left-1' style={{ height: 14, width: 14 }} />
}

export default function ProjectViewList({ onUpdate }: { onUpdate: (id: string) => void }) {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const params = useParams()
  const mode = searchParams.get('mode')
  const { views } = useProjectViewList()

  const clickOnView = (name: string) => {
    push(`${params.orgName}/project/${params.projectId}?mode=${name}`)
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
        const { icon, onlyMe } = view

        return (
          <div
            title={onlyMe ? "Only you can see this view" : ''}
            onClick={() => clickOnView(view.id)}
            className={`project-view-item group relative ${active ? 'active' : ''}`}
            key={index}>
            {icon ? (
              <DynamicIcon name={icon} />
            ) : (
              <ProjectViewIcon type={view.type} />
            )}
            <OnlyMeIcon enabled={!!onlyMe} />
            <span>{view.name}</span>
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
