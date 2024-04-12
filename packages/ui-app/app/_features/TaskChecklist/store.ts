
import { create } from 'zustand'
import { produce } from 'immer'
import { TaskChecklist } from '@prisma/client'

interface TaskChecklistState {
  loading: boolean
  checklists: {
    [key: string]: TaskChecklist[]
  }
  setCheclistLoading: (stt: boolean) => void
  updateChecklistId: (taskId: string, oldId: string, newId: string) => void
  addTaskChecklist: (taskId: string, data: TaskChecklist[]) => void
  addOneChecklist: (data: TaskChecklist) => void
  toggleChecklistStatus: (taskId: string, idx: number) => void
  deleteChecklist: (taskId: string, id: string) => void
  updateChecklist: (taskId: string, data: Partial<TaskChecklist>) => void

}

export const useChecklistStore = create<TaskChecklistState>(set => ({
  loading: true,
  checklists: {},
  setCheclistLoading: (stt: boolean) =>
    set(
      produce((state: TaskChecklistState) => {
        state.loading = stt
      })
    ),
  addTaskChecklist: (taskId: string, data: TaskChecklist[]) =>
    set(
      produce((state: TaskChecklistState) => {
        state.checklists[taskId] = data
      })
    ),
  updateChecklist: (taskId: string, data: Partial<TaskChecklist>) =>
    set(
      produce((state: TaskChecklistState) => {
        const checklists = state.checklists
        if (!taskId) return
        if (!(taskId in checklists)) return

        const taskChecklist = checklists[taskId]
        const { id, title } = data

        if (!id) return

        checklists[taskId] = taskChecklist.map(c => {
          if (c.id !== id) {
            return c
          }

          if (c.title !== title && title) {
            c.title = title
          }

          return c
        })

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
    ),

  toggleChecklistStatus: (taskId: string, idx: number) =>
    set(
      produce((state: TaskChecklistState) => {
        const checklists = state.checklists
        if (!taskId) return

        if (!checklists[taskId])
          return

        const stt = checklists[taskId][idx].done
        checklists[taskId][idx].done = !stt

      })
    ),

  deleteChecklist: (taskId: string, id: string) =>
    set(
      produce((state: TaskChecklistState) => {
        const checklists = state.checklists
        if (!taskId) return

        if (!checklists[taskId])
          return

        const taskChecklist = checklists[taskId]

        checklists[taskId] = taskChecklist.filter(c => c.id !== id)
      })
    ),


  updateChecklistId: (taskId: string, oldId: string, newId: string) =>
    set(
      produce((state: TaskChecklistState) => {
        const checklists = state.checklists
        if (!taskId) return

        if (!checklists[taskId])
          return

        const taskChecklist = checklists[taskId]

        checklists[taskId] = taskChecklist.map(c => {
          if (c.id === oldId) {
            c.id = newId
          }
          return c
        })
      })
    ),

}))
