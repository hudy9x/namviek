'use client'

import { PinnedProjectSetting, useProjectStore } from '@/store/project'
import { useEffect } from 'react'
import { projectGet, projectPinGetList } from '@/services/project'
import { useParams } from 'next/navigation'
import { Project } from '@prisma/client'
import ProjectNavItem from './ProjectNavItem'
import { useProjectPinUnpin } from '@/hooks/useProjectPinUnPin'
import { useTodoCounter } from '@/hooks/useTodoCounter'
import { Loading } from '@shared/ui'

export default function ProjectList() {
  const { todoCounter } = useTodoCounter()
  const { extractPinNUnpinProjects } = useProjectPinUnpin()
  const {
    loading,
    setLoading,
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
    setLoading(true)
    projectPinGetList().then(result => {
      const { data } = result.data
      const pinnedProjects = data as PinnedProjectSetting[]

      addPinnedProjects(pinnedProjects)
    })
    projectGet({
      orgId: params.orgID,
      isArchive: false
    }).then(result => {
      const { data, status } = result.data
      const projects = data as Project[]

      if (status !== 200) return

      setLoading(false)
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
      <Loading enabled={loading} className="px-5" title="Loading ..." />
      {pin.length ? <h2 className="section">Pinned</h2> : null}
      {!loading &&
        pin.map(project => {
          const { id, name, icon, projectViewId } = project
          const counter = todoCounter[id]

          return (
            <ProjectNavItem
              pinned={true}
              badge={counter}
              view={projectViewId || ''}
              key={id}
              id={id}
              name={name || ''}
              icon={icon || ''}
            />
          )
        })}
      {pin.length ? <h2 className="section">All project</h2> : null}
      {!loading &&
        unpin.map(project => {
          const { id, name, icon, projectViewId } = project
          const counter = todoCounter[id]

          return (
            <ProjectNavItem
              badge={counter}
              key={id}
              view={projectViewId || ''}
              id={id}
              name={name || ''}
              icon={icon || ''}
            />
          )
        })}
    </nav>
  )
}
