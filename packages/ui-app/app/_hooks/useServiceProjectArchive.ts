import { projectGet, projectService } from '@/services/project'
import { useProjectArchiveStore } from '@/store/projecArchived'
import { useProjectStore } from '@/store/project'
import { Project } from '@prisma/client'
import { messageError, messageSuccess } from '@shared/ui'
import { useParams } from 'next/navigation'
import { useOrganizationBySlug } from './useOrganizationBySlug'

export default function useServiceProjectArchive() {
  const {
    moveManyToArchive,
    moveToArchive: add,
    removeFromArchive: remove
  } = useProjectArchiveStore()

  const { org } = useOrganizationBySlug()

  const { addProject, removeProject } = useProjectStore()

  const getArchivedProject = () => {
    if (!org) return
    projectGet({ isArchive: true, orgId: org.id }).then(res => {
      const { data } = res.data

      moveManyToArchive(data)
    })
  }

  const moveToArchive = (project: Project) => {
    const clonedProject = structuredClone(project)
    const { id } = clonedProject

    clonedProject.isArchived = true
    add(clonedProject)

    removeProject(id)

    projectService
      .archive(id, true)
      .then(res => {
        messageSuccess('Move to archive')
      })
      .catch(err => {
        messageError('move error')
      })
  }

  const removeFromArchive = (project: Project) => {
    const clonedProject = structuredClone(project)
    const { id } = clonedProject
    remove(id)

    clonedProject.isArchived = false
    addProject(clonedProject)

    projectService
      .archive(id, false)
      .then(res => {
        messageSuccess('Removed from archive')
      })
      .catch(err => {
        messageError('Remove error')
      })
  }

  return {
    getArchivedProject,
    moveToArchive,
    removeFromArchive
  }
}
