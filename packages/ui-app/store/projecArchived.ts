import { create } from 'zustand'
import { Project } from '@prisma/client'
import { produce } from 'immer'

interface ProjectArchiveState {
  projects: Project[]
  moveManyToArchive: (projects: Project[]) => void
  moveToArchive: (project: Project) => void
  removeFromArchive: (id: string) => void
}

export const useProjectArchiveStore = create<ProjectArchiveState>(set => ({
  projects: [],

  moveManyToArchive: (projects: Project[]) =>
    set(
      produce((state: ProjectArchiveState) => {
        state.projects = projects
      })
    ),
  removeFromArchive: (id: string) =>
    set(
      produce((state: ProjectArchiveState) => {
        state.projects = state.projects.filter(p => p.id !== id)
      })
    ),
  moveToArchive: (project: Project) =>
    set(
      produce((state: ProjectArchiveState) => {
        state.projects.push(project)
      })
    )
}))
