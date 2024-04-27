import { create } from 'zustand'
import { Task } from '@prisma/client'
import { produce } from 'immer'

export type PartialTask = Partial<Task>
export type ExtendedTask = Task & {
  selected: boolean
}

interface TaskViewState {
  taskId: string
  openTaskDetail: (taskId: string) => void
  closeTaskDetail: () => void
}

export const useTaskViewStore = create<TaskViewState>(set => ({
  taskId: '',
  openTaskDetail: (taskId: string) =>
    set(
      produce((state: TaskViewState) => {
        console.log('set taskid', state.taskId, taskId)
        state.taskId = taskId
      })
    ),
  closeTaskDetail: () =>
    set(
      produce((state: TaskViewState) => {
        console.log('close task detail')
        state.taskId = ''
        return state
      })
    ),


}))
