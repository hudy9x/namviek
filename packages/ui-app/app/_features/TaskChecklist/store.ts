
import { create } from 'zustand'
import { produce } from 'immer'
import { TaskChecklist } from '@prisma/client'

interface TaskChecklistState {
  loading: boolean
  checklists: {
    [key: string]: TaskChecklist[]
  }
  addTaskChecklist: (taskId: string, data: TaskChecklist[]) => void
  addOneChecklist: (data: TaskChecklist) => void

}

export const useChecklistStore = create<TaskChecklistState>(set => ({
  loading: true,
  checklists: {},
  addTaskChecklist: (taskId: string, data: TaskChecklist[]) =>
    set(
      produce((state: TaskChecklistState) => {
        state.checklists[taskId] = data
      })
    ),

  addOneChecklist: (data: TaskChecklist) =>
    set(
      produce((state: TaskChecklistState) => {
        const { taskId } = data
        const checklists = state.checklists
        if (!taskId) return

        if (!checklists[taskId])
          checklists[taskId] = []

        checklists[taskId].push(data)
      })
    )
}))
