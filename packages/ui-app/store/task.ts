import { create } from 'zustand'
import { Task } from '@prisma/client'
import { produce } from 'immer'

interface TaskState {
  taskLoading: boolean
  setTaskLoading: (status: boolean) => void
  tasks: Task[]
  addAllTasks: (data: Task[]) => void
}

export const useTaskStore = create<TaskState>(set => ({
  tasks: [],
  taskLoading: false,
  setTaskLoading: (status: boolean) =>
    set(
      produce((state: TaskState) => {
        state.taskLoading = status
      })
    ),
  addAllTasks: (data: Task[]) =>
    set(
      produce((state: TaskState) => {
        state.tasks = data
      })
    )
}))
