import Link from 'next/link'
import { ReactNode } from 'react'
import { HiOutlineMenuAlt1, HiOutlineUserCircle } from 'react-icons/hi'
import {
  HiOutlineCalendar,
  HiOutlineCog6Tooth,
  HiOutlineViewColumns
} from 'react-icons/hi2'

export default function SettingLayout({
  params,
  children
}: {
  params: { orgID: string }
  children: ReactNode
}) {
  console.log(params)

  const tabs = [
    {
      title: 'About',
      name: 'about',
      href: '#',
      icon: HiOutlineUserCircle,
      current: false
    },
    {
      title: 'People',
      name: 'people',
      href: '#',
      icon: HiOutlineMenuAlt1,
      current: false
    },
    {
      title: 'Projects',
      name: 'projects',
      href: '#',
      icon: HiOutlineCalendar,
      current: false
    },
    {
      title: 'Apps',
      name: 'apps',
      href: '#',
      icon: HiOutlineCog6Tooth,
      current: false
    },
    {
      title: 'Export/import',
      name: 'export-import',
      href: '#',
      icon: HiOutlineViewColumns,
      current: false
    }
  ]

  return (
    <div className="project-nav">
      <div className="bg-white border-b border-gray-200">
        <h2 className="text-xl font-bold px-4 py-2">Settings</h2>
        <div className="tab pl-1">
          {tabs.map((tab, index) => {
            const Icon = tab.icon
            // const active = tab.name.toLowerCase() === mode
            return (
              <Link
                href={`${params.orgID}/setting/${tab.name}`}
                className={`tab-item`}
                key={index}>
                <Icon />
                <span>{tab.title}</span>
              </Link>
            )
          })}
        </div>
      </div>

      <div
        className="task bg-indigo-50/50 w-full"
        style={{ height: `calc(100vh - 83px)` }}>
        {children}
      </div>
    </div>
  )
}
