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
  HiOutlineStar,
  HiOutlineVideoCamera
} from 'react-icons/hi2'
import { Button, Scrollbar } from '@shared/ui'
import { AiOutlinePlus } from 'react-icons/ai'
import ProjectAddModal from '@/features/Project/Add/ProjectAddModal'
import Favorites from '@/features/Favorites'
import { useState } from 'react'
import { useMenuStore } from '@/store/menu'

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
  const { setVisible: setMenuVisible } = useMenuStore()
  const pathname = usePathname()
  const { push } = useRouter()
  const [open, setOpen] = useState(false)

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
      title: 'Meeting',
      href: `/${orgID}/meeting`,
      icon: HiOutlineVideoCamera,
      active: pathname.includes('/meeting')
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
      active: pathname.includes(`${orgID}/report`)
    },
    {
      title: 'Settings',
      href: `/${orgID}/setting/people`,
      icon: HiOutlineCog6Tooth,
      active: pathname.includes(`${orgID}/setting`)
    }
  ]

  return (
    <>
      <aside className={`root-sidebar`}>
        <RootSidebar />
        <nav className="secondary-sidebar">
          <UserSection />
          <Scrollbar style={{ height: `calc(100vh - 79px)` }}>
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
                        setMenuVisible(false)
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
    </>
  )
}
