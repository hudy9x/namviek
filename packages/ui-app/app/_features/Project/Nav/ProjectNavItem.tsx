import { useProjectStore } from '@/store/project'
import { useParams, useRouter } from 'next/navigation'
import { HiChevronRight } from 'react-icons/hi2'
import ProjectPin from '../Pin'
import { useEffect, useState } from 'react'

export default function ProjectNavItem({
  pinned = false,
  id,
  name,
  icon
}: {
  pinned?: boolean
  id: string
  name: string
  icon: string
}) {
  const [visible, setVisible] = useState(false)
  const params = useParams()
  const { push } = useRouter()
  const active = params.projectId === id
  const href = `${params.orgID}/project/${id}?mode=task`
  const { selectProject } = useProjectStore(state => state)
  const onSelectProject = (id: string) => {
    selectProject(id)
  }

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 100)
  }, [])

  return (
    <div
      className={`${active ? 'active' : ''} nav-item group ${
        visible ? 'opacity-100' : 'opacity-0'
      } transition-all duration-300`}
      onClick={() => {
        onSelectProject(id)
        push(href)
      }}>
      <div className="left">
        <HiChevronRight className="text-gray-400" />
        <img className="w-5 h-5" src={icon || ''} />
        <span className="whitespace-nowrap">{name}</span>
      </div>
      <div className="right relative group-hover:opacity-100 opacity-0 transition-all">
        <ProjectPin projectId={id} pinned={pinned} />
      </div>
    </div>
  )
}
