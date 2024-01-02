import { create } from 'zustand'
import { Project, TaskPriority } from '@prisma/client'
import { produce } from 'immer'

export type PinnedProjectSetting = {
  id: string
  createdAt: Date
}

interface ProjectState {
  selectedProject: Project | null
  priorities: TaskPriority[]
  loading: boolean
  projects: Project[]
  pinnedProjects: PinnedProjectSetting[]
  pin: (id: string) => void
  unpin: (id: string) => void
  addPinnedProjects: (data: PinnedProjectSetting[]) => void
  addProject: (data: Project) => void
  removeProject: (id: string) => void
  updateProject: (data: Partial<Project>) => void
  addAllProject: (datas: Project[]) => void
  selectProject: (id: string) => void
  setLoading: (stt: boolean) => void
}

export const useProjectStore = create<ProjectState>(set => ({
  loading: false,
  priorities: [
    TaskPriority.LOW,
    TaskPriority.HIGH,
    TaskPriority.NORMAL,
    TaskPriority.URGENT
  ],
  selectedProject: null,
  projects: [],
  pinnedProjects: [],
  addPinnedProjects: (data: PinnedProjectSetting[]) =>
    set(
      produce((state: ProjectState) => {
        state.pinnedProjects = data
      })
    ),
  pin: (id: string) =>
    set(
      produce((state: ProjectState) => {
        state.pinnedProjects.push({
          id,
          createdAt: new Date()
        })
      })
    ),
  unpin: (id: string) =>
    set(
      produce((state: ProjectState) => {
        state.pinnedProjects = state.pinnedProjects.filter(p => p.id !== id)
      })
    ),

  setLoading: (status: boolean) =>
    set(
      produce((state: ProjectState) => {
        state.loading = status
      })
    ),

  removeProject: (id: string) =>
    set(
      produce((state: ProjectState) => {
        state.projects = state.projects.filter(p => p.id !== id)
      })
    ),

  addProject: (data: Project) =>
    set(
      produce((state: ProjectState) => {
        state.projects.push(data)
      })
    ),

  updateProject: (data: Partial<Project>) =>
    set(
      produce((state: ProjectState) => {
        const { id, ...rest } = data
        const project = state.projects.find(p => p.id === id)

        if (!project) {
          return
        }

        const { icon, projectViewId } = rest

        if (icon) {
          project.icon = icon
        }

        if (projectViewId) {
          project.projectViewId = projectViewId
        }

      })
    ),

  addAllProject: (datas: Project[]) =>
    set(
      produce((state: ProjectState) => {
        state.projects = datas
      })
    ),

  selectProject: (id: string) =>
    set(
      produce((state: ProjectState) => {
        const project = state.projects.find(p => p.id === id)

        if (project) {
          state.selectedProject = project
        }
      })
    )
}))
