'use client'

import Link from 'next/link'
import { useProjectStore } from '../../store/project'
import { useEffect } from 'react'
import { projectGet } from '../../services/project'
import { useParams, useRouter } from 'next/navigation'
import { Project } from '@prisma/client'
import FavoriteAdd from '@/features/Favorites/FavoriteAdd'

export default function ProjectList() {
  const { projects, addAllProject, selectProject } = useProjectStore(
    state => state
  )
  const params = useParams()
  const { push } = useRouter()

  const onSelectProject = (id: string) => {
    selectProject(id)
  }

  useEffect(() => {
    console.log('get all projects')
    projectGet().then(result => {
      const { data, status } = result.data
      const projects = data as Project[]

      console.log('return data', projects)

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
        return (
          <div
            key={project.id}
            className={`${active ? 'active' : ''} nav-item`}
            onClick={() => {
              onSelectProject(project.id)
              push(href)
            }}>
            <img className="w-5 h-5" src={icon || ''} />
            <span>{name}</span>
            <FavoriteAdd name={name} icon={icon || ''} link={href} />
          </div>
        )
      })}
    </nav>
  )
}
