import { create } from 'zustand'
import { StatusType, TaskStatus } from '@prisma/client'
import { produce } from 'immer'

interface ProjectStatusState {
  statusDoneId: string
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
  statusDoneId: '',
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

        // update status that marks as DONE
        const doneStt = data.find(dt => dt.type === StatusType.DONE)
        if (doneStt) {
          state.statusDoneId = doneStt.id
        }
      })
    ),

  addStatus: data =>
    set(
      produce((state: ProjectStatusState) => {
        state.statuses.push(data)

        // update status that marks as DONE
        const doneStt = state.statuses.find(dt => dt.type === StatusType.DONE)
        if (doneStt) {
          state.statusDoneId = doneStt.id
        }
      })
    ),

  updateStatus: (id, newData) =>
    set(
      produce((state: ProjectStatusState) => {
        state.statuses.forEach((status, index) => {
          if (id === status.id) {
            state.statuses[index] = { ...status, ...newData }
          }

          // update status that marks as DONE
          if (status.type === StatusType.DONE) {
            state.statusDoneId = status.id
          }
        })
      })
    ),

  delStatus: id =>
    set(
      produce((state: ProjectStatusState) => {
        state.statuses = state.statuses.filter(status => status.id !== id)
        // update status that marks as DONE
        const doneStt = state.statuses.find(dt => dt.type === StatusType.DONE)
        if (doneStt) {
          state.statusDoneId = doneStt.id
        }
      })
    )
}))
