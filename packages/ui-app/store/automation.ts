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

// interface IAutomationItem {
//   when: IAutomateWhenProps
//   then: IAutomateThenProps
//   organizationId: string
//   projectId: string
// }

type IAutomationItem = Omit<
  TaskAutomation,
  'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt' | 'when' | 'then'
> & {
  when: IAutomateWhenProps
  then: IAutomateThenProps
}

interface AutomationState {
  automations: IAutomationItem[]
  addNewAutomation: (data: IAutomationItem) => void
  addAllAutomation: (data: IAutomationItem[]) => void
}

export const useAutomationStore = create<AutomationState>(set => ({
  automations: [],
  addNewAutomation: (data: IAutomationItem) =>
    set(
      produce((state: AutomationState) => {
        state.automations.push(data)
      })
    ),
  addAllAutomation: (data: IAutomationItem[]) =>
    set(
      produce((state: AutomationState) => {
        state.automations = data
      })
    )
}))
