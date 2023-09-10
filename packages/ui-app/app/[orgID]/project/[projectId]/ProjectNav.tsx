'use client'

import {
  HiOutlineCog6Tooth,
  HiOutlineUserCircle,
  HiOutlineViewColumns,
  HiOutlineCalendar
} from 'react-icons/hi2'
import { useProjectStore } from '../../../../store/project'
import { useSearchParams, useRouter, useParams } from 'next/navigation'
import { useState } from 'react'
import ProjectTabContent from './ProjectTabContent'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import TaskCreate from './TaskCreate'
import Link from 'next/link'
import { AiOutlineArrowLeft } from 'react-icons/ai'

export default function ProjectNav() {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const params = useParams()
  const { selectedProject } = useProjectStore(state => state)
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
      title: 'Setting',
      name: 'setting',
      href: '#',
      icon: HiOutlineCog6Tooth,
      current: false
    }
  ])

  const onMoveTab = (name: string) => {
    push(`${params.orgID}/project/${params.projectId}?mode=${name}`)
  }

  return (
    <div className="project-nav">
      <div className="bg-white border-b border-gray-200">
        <h2 className="text-xl font-bold px-4 pt-2 flex items-center gap-2">
          <Link
            href={`${params.orgID}/project`}
            className="p-2 border rounded-md bg-white text-sm text-gray-500 hover:bg-gray-50">
            <AiOutlineArrowLeft />
          </Link>
          {selectedProject?.icon ? (
            <img src={selectedProject?.icon || ''} className="w-6 h-6" />
          ) : null}
          {selectedProject?.name || (
            <span className="text-transparent animate-pulse bg-gray-100 rounded-md">
              Project
            </span>
          )}
        </h2>
        <div className="tab pl-1">
          {tabs.map((tab, index) => {
            const Icon = tab.icon
            const active = tab.name.toLowerCase() === mode
            return (
              <div
                onClick={() => onMoveTab(tab.name)}
                className={`tab-item ${active ? 'active' : ''}`}
                key={index}>
                <Icon />
                <span>{tab.title}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="task bg-indigo-50/50 w-full">
        <ProjectTabContent />
      </div>
      <TaskCreate />
    </div>
  )
}
