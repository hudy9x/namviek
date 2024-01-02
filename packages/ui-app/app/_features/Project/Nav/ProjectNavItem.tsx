import { useProjectStore } from '@/store/project'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { HiChevronRight } from 'react-icons/hi2'
import ProjectPin from '../Pin'
import { useEffect, useState } from 'react'
import { useMenuStore } from '@/store/menu'
import Badge from '@/components/Badge'
import Tooltip from 'packages/shared-ui/src/components/Tooltip'
import { useProjectViewStore } from '@/store/projectView'

export default function ProjectNavItem({
  pinned = false,
  id,
  view,
  name,
  badge,
  icon
}: {
  pinned?: boolean
  badge?: number
  id: string
  view: string
  name: string
  icon: string
}) {
  const [visible, setVisible] = useState(false)
  const { setVisible: setMenuVisible } = useMenuStore()
  const { setLoading: setProjectViewLoading } = useProjectViewStore()
  const params = useParams()
  const pathName = usePathname()
  const { push } = useRouter()
  const active = params.projectId === id
  const href = `${params.orgID}/project/${id}?mode=${view}`
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
    const p = `${params.orgID}/project/${id}`

    if (!pathName.includes(p)) {
      setProjectViewLoading(true)
    }

    onSelectProject(id)
    setMenuVisible(false)
    push(link)
  }

  const showBadges = () => {
    if (!badge) return null
    return (
      <Tooltip title={`${badge} todos`} wrapDiv={true}>
        <Badge
          onClick={() => {
            onSelectItem(href + '&badgeFilter=todo')
          }}
          title={badge + ''}
        />
      </Tooltip>
    )
  }

  return (
    <div
      className={`${active ? 'active' : ''} nav-item group ${visible ? 'opacity-100' : 'opacity-0'
        } transition-all duration-300`}
      onClick={() => {
        onSelectItem(href)
      }}>
      <div className="left">
        <HiChevronRight className="text-gray-400" />
        <img className="w-5 h-5" src={icon || ''} />
        <span className="whitespace-nowrap">{name}</span>
        {showBadges()}
      </div>
      <div className="right relative group-hover:opacity-100 opacity-0 transition-all">
        <ProjectPin projectId={id} pinned={pinned} />
      </div>
    </div>
  )
}
