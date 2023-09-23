import { create } from 'zustand'
import { produce } from 'immer'
import { TaskAutomation } from '@prisma/client'

export interface IAutomateWhenProps {
  happens: string
  is: string
  valueFrom?: string
  valueTo?: string
  equal?: string
}

export interface IAutomateThenProps {
  change: string
  value: string
}

export type IAutomationItem = Omit<
  TaskAutomation,
  'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt' | 'when' | 'then'
> & {
  when: IAutomateWhenProps
  then: IAutomateThenProps
}

interface AutomationState {
  automations: IAutomationItem[]
  addNewAutomation: (data: IAutomationItem) => void
  updateAutomation: (id: string, data: IAutomationItem) => void
  deleteAutomation: (id: string) => void
  addAllAutomation: (data: IAutomationItem[]) => void
}

export const useAutomationStore = create<AutomationState>(set => ({
  automations: [],
  addNewAutomation: (data: IAutomationItem) =>
    set(
      produce((state: AutomationState) => {
        state.automations.unshift(data)
      })
    ),
  deleteAutomation: (id: string) =>
    set(
      produce((state: AutomationState) => {
        state.automations = state.automations.filter(auto => auto.id !== id)
      })
    ),
  updateAutomation: (id: string, data: IAutomationItem) =>
    set(
      produce((state: AutomationState) => {
        const automationIndex = state.automations.findIndex(
          auto => auto.id === id
        )

        if (automationIndex === -1) return

        state.automations[automationIndex] = data
      })
    ),
  addAllAutomation: (data: IAutomationItem[]) =>
    set(
      produce((state: AutomationState) => {
        state.automations = data
      })
    )
}))
