'use client'

import { PinnedProjectSetting, useProjectStore } from '@/store/project'
import { useEffect } from 'react'
import { projectGet, projectPinGetList } from '@/services/project'
import { useParams } from 'next/navigation'
import { Project } from '@prisma/client'
import ProjectNavItem from './ProjectNavItem'
import { useProjectPinUnpin } from '@/hooks/useProjectPinUnPin'

export default function ProjectList() {
  const { extractPinNUnpinProjects } = useProjectPinUnpin()
  const {
    projects,
    addAllProject,
    selectProject,
    pinnedProjects,
    addPinnedProjects
  } = useProjectStore(state => state)
  const params = useParams()

  const onSelectProject = (id: string) => {
    selectProject(id)
  }

  useEffect(() => {
    projectPinGetList().then(result => {
      const { data } = result.data
      const pinnedProjects = data as PinnedProjectSetting[]

      addPinnedProjects(pinnedProjects)
    })
    projectGet().then(result => {
      const { data, status } = result.data
      const projects = data as Project[]

      if (status !== 200) return

      addAllProject(data)
      // active project item
      projects.some(p => {
        if (p.id === params.projectId) {
          onSelectProject(p.id)
          return true
        }
      })
    })
  }, [])

  const { pin, unpin } = extractPinNUnpinProjects(projects, pinnedProjects)

  return (
    <nav className="nav">
      {pin.length ? <h2 className="section">Pinned</h2> : null}
      {pin.map(project => {
        const { id, name, icon } = project

        return (
          <ProjectNavItem
            pinned={true}
            key={id}
            id={id}
            name={name || ''}
            icon={icon || ''}
          />
        )
      })}
      {pin.length ? <h2 className="section">All project</h2> : null}
      {unpin.map(project => {
        const { id, name, icon } = project

        return (
          <ProjectNavItem
            key={id}
            id={id}
            name={name || ''}
            icon={icon || ''}
          />
        )
      })}
    </nav>
  )
}
