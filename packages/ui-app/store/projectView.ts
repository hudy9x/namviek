import { create } from 'zustand'
import { ProjectView } from '@prisma/client'
import { produce } from 'immer'

interface ProjectViewState {
  views: ProjectView[]
  addAllView: (data: ProjectView[]) => void
  addView: (data: ProjectView) => void
  updateView: (id: string, data: Partial<ProjectView>) => void
}

export const useProjectViewStore = create<ProjectViewState>(set => ({
  views: [],

  updateView: (id: string, data: Partial<ProjectView>) =>
    set(
      produce((state: ProjectViewState) => {
        if (!id) return

        const foundIndex = state.views.findIndex(v => v.id === id)
        if (foundIndex === -1) return

        // state.views[foundIndex] = data
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
