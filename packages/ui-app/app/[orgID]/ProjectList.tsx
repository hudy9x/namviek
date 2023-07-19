'use client'

import Link from 'next/link'
import { useProjectStore } from '../../store/project'
import { useEffect } from 'react'
import { projectGet } from '../../services/project'
import { useParams } from 'next/navigation'
import { Project } from '@prisma/client'
import { useTaskStore } from '../../store/task'
import { useProjectStatusStore } from '../../store/status'

export default function ProjectList() {
  const { projects, addAllProject, selectProject } = useProjectStore(
    state => state
  )
  const { setTaskLoading } = useTaskStore()
  const { setStatusLoading } = useProjectStatusStore()
  const params = useParams()

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
        const active = params.projectId === project.id
        return (
          <Link
            key={project.id}
            className={`${active ? 'active' : ''} nav-item`}
            onClick={() => {
              onSelectProject(project.id)
              setTaskLoading(true)
              setStatusLoading(true)
            }}
            href={`${params.orgID}/project/${project.id}?mode=task`}>
            <span className="nav-icon">👕</span>
            <span>{project.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
