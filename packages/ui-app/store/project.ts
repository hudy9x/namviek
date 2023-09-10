import { create } from 'zustand'
import { Project, TaskPriority } from '@prisma/client'
import { produce } from 'immer'

interface ProjectState {
  selectedProject: Project | null
  priorities: TaskPriority[]
  loading: boolean
  projects: Project[]
  addProject: (data: Project) => void
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

  setLoading: (status: boolean) =>
    set(
      produce((state: ProjectState) => {
        state.loading = status
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

        project.icon = rest.icon || ''
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
