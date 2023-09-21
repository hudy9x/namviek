import { useAutomationStore } from '@/store/automation'
import { ITaskDefaultValues } from '../[orgID]/project/[projectId]/TaskForm'
import { THEN, WHEN } from '@/features/Automation/context'
import { fromDateStringToDate } from '@shared/libs'

export const useTaskAutomation = () => {
  const { automations } = useAutomationStore()

  const refactorTaskFieldByAutomationConfig = (
    type: string,
    data: ITaskDefaultValues
  ) => {
    automations.forEach(auto => {
      const { when, then } = auto
      const { happens, valueTo, valueFrom, equal, is } = when
      const { value, change } = then

      if (happens !== type && happens !== 'both') {
        return
      }

      // start automate works
      if (is === WHEN.PROGRESS_CHANGED && data.progress === +(valueTo || '0')) {
        if (change === THEN.CHANGE_STATUS && data.taskStatusId !== value) {
          data.taskStatusId = value
        }
      }

      if (is === WHEN.STATUS_CHANGED && data.taskStatusId === valueTo) {
        if (change === THEN.CHANGE_DUEDATE) {
          const toDueDate = fromDateStringToDate(value)
          data.dueDate = toDueDate
        }
      }

      // end automate works
    })
    return data
  }

  return {
    refactorTaskFieldByAutomationConfig
  }
}
