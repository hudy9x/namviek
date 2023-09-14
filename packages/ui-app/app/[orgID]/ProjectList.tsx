'use client'

import { useProjectStore } from '../../store/project'
import { useEffect } from 'react'
import { projectGet } from '../../services/project'
import { useParams, useRouter } from 'next/navigation'
import { Project } from '@prisma/client'
import FavoriteAdd from '@/features/Favorites/FavoriteAdd'
import { HiChevronRight } from 'react-icons/hi2'
import { useFavStore } from '@/store/favorite'

export default function ProjectList() {
  const { favorites } = useFavStore()
  const { projects, addAllProject, selectProject } = useProjectStore(
    state => state
  )
  const params = useParams()
  const { push } = useRouter()

  const favProjects = favorites.filter(f => f.type === 'PROJECT')

  const onSelectProject = (id: string) => {
    selectProject(id)
  }

  useEffect(() => {
    projectGet().then(result => {
      const { data, status } = result.data
      const projects = data as Project[]

      if (status !== 200) return

      addAllProject(data)
      projects.some(p => {
        if (p.id === params.projectId) {
          onSelectProject(p.id)
          return true
        }
      })
    })
  }, [])

  return (
    <nav className="nav">
      {projects.map(project => {
        const { id, name, icon } = project
        const active = params.projectId === id
        const href = `${params.orgID}/project/${id}?mode=task`
        if (favProjects.find(f => f.name === name)) {
          return null
        }

        return (
          <div
            key={project.id}
            className={`${active ? 'active' : ''} nav-item group`}
            onClick={() => {
              onSelectProject(project.id)
              push(href)
            }}>
            <div className="left">
              <HiChevronRight className="text-gray-400" />
              <img className="w-5 h-5" src={icon || ''} />
              <span className="whitespace-nowrap">{name}</span>
            </div>
            <FavoriteAdd
              className="opacity-0 group-hover:opacity-100"
              name={name}
              icon={icon || ''}
              link={href}
              type="PROJECT"
            />
          </div>
        )
      })}
    </nav>
  )
}
