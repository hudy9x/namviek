'use client'

import { useParams, usePathname } from 'next/navigation'
import UserSection from '../../layouts/UserSection'
import RootSidebar from '../../layouts/RootSidebar'
import ProjectAdd from './ProjectAdd'
import ProjectList from './ProjectList'
import Link from 'next/link'
import {
  HiOutlineBriefcase,
  HiOutlineChartPie,
  HiOutlineServerStack,
  HiOutlineCog6Tooth,
  HiOutlineStar
} from 'react-icons/hi2'

export default function ProjectSidebar() {
  const { orgID } = useParams()
  const pathname = usePathname()

  if (pathname.includes('/sign-in') || pathname.includes('/sign-up')) {
    return null
  }

  const menus = [
    {
      title: 'My works',
      href: `/${orgID}/my-works`,
      icon: HiOutlineBriefcase,
      active: pathname.includes('/my-works')
    },
    {
      title: 'Favorites',
      href: `/${orgID}/favorites`,
      icon: HiOutlineStar,
      active: pathname.includes('/favorites')
    },
    {
      title: 'Projects',
      href: `/${orgID}`,
      icon: HiOutlineServerStack,
      active: pathname.includes('/project/'),
      children: ProjectList
    },
    {
      title: 'Reports',
      href: `/${orgID}/report`,
      icon: HiOutlineChartPie,
      active: false
    },
    {
      title: 'Settings',
      href: `/${orgID}/setting`,
      icon: HiOutlineCog6Tooth,
      active: false
    }
  ]

  return (
    <aside className="root-sidebar">
      <RootSidebar />
      <nav className="secondary-sidebar">
        <UserSection />
        <section className="side-nav">
          {menus.map((menu, mindex) => {
            const Icon = menu.icon
            const Child = menu.children
            const active = menu.active
            return (
              <div key={mindex}>
                <Link href={menu.href}>
                  <div className={`side-title ${active ? 'active' : ''}`}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <span>{menu.title}</span>
                    </div>
                  </div>
                </Link>
                {Child && <Child />}
              </div>
            )
          })}
        </section>
      </nav>
    </aside>
  )
}
