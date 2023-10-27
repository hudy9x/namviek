'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import UserSection from '../../layouts/UserSection'
import RootSidebar from '../../layouts/RootSidebar'
import ProjectList from '@/features/Project/Nav/index'
import {
  HiOutlineBriefcase,
  HiOutlineChartPie,
  HiOutlineServerStack,
  HiOutlineCog6Tooth,
  HiOutlineStar
} from 'react-icons/hi2'
import { Button, Scrollbar } from '@shared/ui'
import { AiOutlinePlus } from 'react-icons/ai'
import ProjectAddModal from '@/features/Project/Add/ProjectAddModal'
import Favorites from '@/features/Favorites'

function ViewAllBtn() {
  return (
    <div
      onClick={ev => {
        // ev.preventDefault()
        ev.stopPropagation()
      }}>
      <ProjectAddModal
        triggerComponent={
          <Button
            leadingIcon={<AiOutlinePlus />}
            className="uppercase text-xs"
            size="sm"
          />
        }
      />
    </div>
  )
}

export default function ProjectSidebar() {
  const { orgID } = useParams()
  const pathname = usePathname()
  const { push } = useRouter()

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
      // href: `/${orgID}/favorites`,
      icon: HiOutlineStar,
      active: pathname.includes('/favorites'),
      children: Favorites
    },
    {
      title: 'Projects',
      href: `/${orgID}/project`,
      badge: ViewAllBtn,
      icon: HiOutlineServerStack,
      active: pathname.includes('/project/') || pathname.includes('/project'),
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
      href: `/${orgID}/setting/export-import`,
      icon: HiOutlineCog6Tooth,
      active: pathname.includes(`${orgID}/setting`)
    }
  ]

  return (
    <aside className="root-sidebar">
      <RootSidebar />
      <nav className="secondary-sidebar">
        <UserSection />
        <Scrollbar style={{ height: `calc(100vh - 74px)` }}>
          <section className="side-nav">
            {menus.map((menu, mindex) => {
              const Icon = menu.icon
              const Child = menu.children
              const MenuBadge = menu.badge
              const active = menu.active
              return (
                <div key={mindex} className="cursor-pointer">
                  {/* <Link href={menu.href}> */}
                  <div
                    onClick={() => {
                      menu.href && push(menu.href)
                    }}
                    className={`side-title ${active ? 'active' : ''}`}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <span>{menu.title}</span>
                    </div>
                    {MenuBadge ? <MenuBadge /> : null}
                  </div>
                  {/* </Link> */}
                  {Child && <Child />}
                </div>
              )
            })}
          </section>
        </Scrollbar>
      </nav>
    </aside>
  )
}
