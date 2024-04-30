'use client'

import { useSearchParams, useRouter, useParams } from 'next/navigation'
import ProjectViewCreate from './ProjectViewCreate'
import './style.css'
import { useProjectViewList } from './useProjectViewList'
import ProjectViewIcon from './ProjectViewIcon'
import { Button, Dialog, Loading } from '@shared/ui'
import ProjectViewItemDropdown from './ProjectViewItemDropdown'
import DynamicIcon from '@/components/DynamicIcon'
import HasRole from '../UserPermission/HasRole'
import useSetViewFilter from './useSetViewFilter'
import { useState } from 'react'

export default function ProjectView() {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const params = useParams()
  const mode = searchParams.get('mode')
  const { views } = useProjectViewList()

  useSetViewFilter()

  const clickOnView = (name: string) => {
    push(`${params.orgID}/project/${params.projectId}?mode=${name}`)
  }


  return (
    <div className="project-view pl-1 relative">
      {/* <Loading.Absolute title="" enabled={loading} /> */}
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
            className={`project-view-item group relative ${active ? 'active' : ''
              }`}
            key={index}>
            {icon ? (
              <DynamicIcon name={icon} />
            ) : (
              <ProjectViewIcon type={view.type} />
            )}
            <span>{view.name}</span>
            <ProjectViewItemDropdown
              id={view.id}
              name={view.name || ''}
              type={view.type}
            />
          </div>
        )
      })}

      <HasRole projectRoles={['MANAGER', 'LEADER']}>
        {views.length ? (
          <div className="w-[1px] h-[20px] bg-gray-300 dark:bg-gray-700 mx-2 my-2"></div>
        ) : null}
        <ProjectViewCreate />
      </HasRole>
    </div>
  )
}
