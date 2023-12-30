import { create } from 'zustand'
import { ProjectView } from '@prisma/client'
import { produce } from 'immer'

interface ProjectViewState {
  loading: boolean
  setLoading: (stt: boolean) => void
  views: ProjectView[]
  addAllView: (data: ProjectView[]) => void
  addView: (data: ProjectView) => void
  deleteView: (id: string) => void
  updateView: (id: string, data: Partial<ProjectView>) => void
}

export const useProjectViewStore = create<ProjectViewState>(set => ({
  loading: false,
  views: [],

  setLoading: (stt: boolean) => set(produce((state: ProjectViewState) => {
    state.loading = stt
  })),

  deleteView: (id: string) => set(produce((state: ProjectViewState) => {
    state.views = state.views.filter(v => v.id !== id)
  })),

  updateView: (id: string, data: Partial<ProjectView>) =>
    set(
      produce((state: ProjectViewState) => {
        if (!id) return

        const foundIndex = state.views.findIndex(v => v.id === id)
        if (foundIndex === -1) return

        const view = state.views[foundIndex]
        const { name } = data

        if (name) {
          view.name = name
        }
      })
    ),

  addView: (data: ProjectView) =>
    set(
      produce((state: ProjectViewState) => {
        state.views.push(data)
      })
    ),
  addAllView: (data: ProjectView[]) =>
    set(
      produce((state: ProjectViewState) => {
        state.views = data
      })
    )
}))
