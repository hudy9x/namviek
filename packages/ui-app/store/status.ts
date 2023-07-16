import { create } from 'zustand';
import { TaskStatus } from '@prisma/client';
import { produce } from 'immer';

interface ProjectStatusState {
  statuses: TaskStatus[];
  addAllStatuses: (data: TaskStatus[]) => void;
  addStatus: (data: TaskStatus) => void
  updateStatus: (id: string, newData: Partial<TaskStatus>) => void
  delStatus: (id: string) => void
}

export const useProjectStatusStore = create<ProjectStatusState>(set => ({
  statuses: [],
  addAllStatuses: (data: TaskStatus[]) =>
    set(
      produce((state: ProjectStatusState) => {
        state.statuses = data;
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
