import { create } from 'zustand'
import { TaskStatus } from '@prisma/client'
import { produce } from 'immer'

interface ProjectStatusState {
  statusLoading: boolean
  setStatusLoading: (stt: boolean) => void
  statuses: TaskStatus[]
  addAllStatuses: (data: TaskStatus[]) => void
  addStatus: (data: TaskStatus) => void
  updateStatus: (id: string, newData: Partial<TaskStatus>) => void
  delStatus: (id: string) => void
  swapOrder: (oldIndex: number, newIndex: number) => void
}

export const useProjectStatusStore = create<ProjectStatusState>(set => ({
  statuses: [],
  statusLoading: false,
  setStatusLoading: (stt: boolean) =>
    set(
      produce((state: ProjectStatusState) => {
        state.statusLoading = stt
      })
    ),
  swapOrder: (oldIndex: number, newIndex: number) =>
    set(
      produce((state: ProjectStatusState) => {
        const statuses = state.statuses

        const updateStatus = [...statuses]
        const draggedItem = updateStatus[oldIndex]
        updateStatus.splice(oldIndex, 1)
        updateStatus.splice(newIndex, 0, draggedItem)

        updateStatus[oldIndex].order = oldIndex
        updateStatus[newIndex].order = newIndex

        state.statuses = updateStatus
      })
    ),
  addAllStatuses: (data: TaskStatus[]) =>
    set(
      produce((state: ProjectStatusState) => {
        state.statuses = data
      })
    ),

  addStatus: data =>
    set(
      produce((state: ProjectStatusState) => {
        state.statuses.push(data)
      })
    ),

  updateStatus: (id, newData) =>
    set(
      produce((state: ProjectStatusState) => {
        state.statuses.forEach((status, index) => {
          if (id === status.id) {
            state.statuses[index] = { ...status, ...newData }
          }
        })
      })
    ),

  delStatus: id =>
    set(
      produce((state: ProjectStatusState) => {
        state.statuses = state.statuses.filter(status => status.id !== id)
      })
    )
}))
