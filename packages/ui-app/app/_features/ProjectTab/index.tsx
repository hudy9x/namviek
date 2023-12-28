'use client'

import {
  HiOutlineUserCircle,
  HiOutlineViewColumns,
  HiOutlineCalendar,
  HiOutlineSquares2X2,
  HiOutlineViewfinderCircle
} from 'react-icons/hi2'

import { useSearchParams, useRouter, useParams } from 'next/navigation'
import { useState } from 'react'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import ProjectViewCreate from './ProjectViewCreate'
import './style.css'

export default function ProjectTab() {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const params = useParams()
  const mode = searchParams.get('mode')

  const [tabs] = useState([
    {
      title: 'Overview',
      name: 'overview',
      href: '#',
      icon: HiOutlineUserCircle,
      current: false
    },
    {
      title: 'List',
      name: 'task',
      href: '#',
      icon: HiOutlineMenuAlt1,
      current: false
    },
    {
      title: 'Board',
      name: 'board',
      href: '#',
      icon: HiOutlineViewColumns,
      current: false
    },
    {
      title: 'Calendar',
      name: 'calendar',
      href: '#',
      icon: HiOutlineCalendar,
      current: false
    },
    {
      title: 'Team',
      name: 'team',
      href: '#',
      icon: HiOutlineSquares2X2,
      current: false
    },
    {
      title: 'Vision',
      name: 'vision',
      href: '#',
      icon: HiOutlineViewfinderCircle,
      current: false
    }
  ])

  const onMoveTab = (name: string) => {
    push(`${params.orgID}/project/${params.projectId}?mode=${name}`)
  }

  return (
    <div className="project-tab pl-1">
      {tabs.map((tab, index) => {
        const Icon = tab.icon
        const active = tab.name.toLowerCase() === mode
        return (
          <div
            onClick={() => onMoveTab(tab.name)}
            className={`project-tab-item ${active ? 'active' : ''}`}
            key={index}>
            <Icon />
            <span>{tab.title}</span>
          </div>
        )
      })}

      <ProjectViewCreate />
    </div>
  )
}
