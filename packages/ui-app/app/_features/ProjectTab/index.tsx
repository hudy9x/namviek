'use client'

import {
  HiOutlineUserCircle,
  HiOutlineViewColumns,
  HiOutlineCalendar,
  HiOutlineSquares2X2,
  HiOutlineViewfinderCircle
} from 'react-icons/hi2'

import { useSearchParams, useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
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

  return (
    <div className="project-tab pl-1">
      {views.map((view, index) => {
        const active = false

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

      <ProjectViewCreate />
    </div>
  )
}
