import { useProjectStore } from '@/store/project'
import { useParams, usePathname, useRouter } from 'next/navigation'

import ProjectPin from '../Pin'
import { useEffect, useState } from 'react'
import { useMenuStore } from '@/store/menu'
import { useProjectViewStore } from '@/store/projectView'
import { GoDot } from 'react-icons/go'
import GridCollectionList from '@/features/Grid/GridCollectionList'

export default function ProjectNavItem({
  pinned = false,
  id,
  view,
  name,
  icon
}: {
  pinned?: boolean
  id: string
  view: string
  name: string
  icon: string
}) {
  const [visible, setVisible] = useState(false)
  const { setVisible: setMenuVisible } = useMenuStore()
  const params = useParams()
  const pathName = usePathname()
  const { push } = useRouter()
  const active = params.projectId === id
  const href = `${params.orgName}/project/${id}?mode=${view}`
  const { selectProject } = useProjectStore(state => state)

  const onSelectProject = (id: string) => {
    selectProject(id)
  }

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 100)
  }, [])

  const onSelectItem = (link: string) => {
    const p = `${params.orgName}/project/${id}`

    if (!pathName.includes(p)) {
      // setProjectViewLoading(true)
    }

    onSelectProject(id)
    setMenuVisible(false)
    push(link)
  }

  return (
    <>
      <div
        className={`nav-item group ${visible ? 'opacity-100' : 'opacity-0'
          } transition-all duration-300`}
        onClick={() => {
          onSelectItem(href)
        }}
        title={name}>
        <div className="left">
          {/* <GoDot className="ml-0.5 text-gray-400 dark:text-gray-500 shrink-0" /> */}
          <img className="w-5 h-5 mr-2" src={icon || ''} />
          <span className="whitespace-nowrap truncate">{name}</span>
        </div>
        <div className="right relative group-hover:opacity-100 opacity-0 transition-all">
          <ProjectPin projectId={id} pinned={pinned} />
        </div>
      </div>
      {active && (
        <GridCollectionList projectId={id} />
      )}
    </>
  )
}
