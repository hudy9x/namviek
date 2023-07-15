import { create } from 'zustand'
import { TaskStatus } from '@prisma/client'
import { produce } from 'immer'

interface TaskStatusState {
  taskStatus: TaskStatus[]
  addTaskStatus: (data: TaskStatus) => void
  updateTaskStatus: (id: string, newData: Partial<TaskStatus>) => void
  delTaskStatus: (id: string) => void
  updateAllTaskStatus: (data: TaskStatus[]) => void
}

export const useTaskStatusStore = create<TaskStatusState>(set => ({
  taskStatus: [],

  updateAllTaskStatus: data =>
    set(
      produce((state: TaskStatusState) => {
        state.taskStatus = data
      })
    ),

  addTaskStatus: data =>
    set(
      produce((state: TaskStatusState) => {
        state.taskStatus.push(data)
      })
    ),

  updateTaskStatus: (id, newData) =>
    set(
      produce((state: TaskStatusState) => {
        state.taskStatus.forEach((status, index) => {
          if (id === status.id) {
            state.taskStatus[index] = { ...status, ...newData }
          }
        })
      })
    ),

  delTaskStatus: id =>
    set(
      produce((state: TaskStatusState) => {
        state.taskStatus = state.taskStatus.filter(status => status.id !== id)
      })
    )
}))
