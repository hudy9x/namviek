import { useAutomationStore } from '@/store/automation'
import { ITaskDefaultValues } from '../[orgName]/project/[projectId]/TaskForm'
import { THEN, WHEN } from '@/features/Automation/context'
import { fromDateStringToDate } from '@shared/libs'

export const useTaskAutomation = () => {
  const { automations } = useAutomationStore()

  const refactorTaskFieldByAutomationConfig = (
    type: string,
    data: ITaskDefaultValues
  ) => {
    console.log('automation - start')
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
          console.log(when, then)
          data.taskStatusId = value
        }
      }

      if (is === WHEN.STATUS_CHANGED && data.taskStatusId === valueTo) {
        if (change === THEN.CHANGE_DUEDATE) {
          console.log(when, then)
          const toDueDate = fromDateStringToDate(value)
          data.dueDate = toDueDate
        }

        if (change === THEN.CHANGE_PROGRESS) {
          console.log(when, then)
          data.progress = parseInt(value, 10)
        }
      }

      // end automate works
    })
    console.log('automation - end')
    return data
  }

  return {
    refactorTaskFieldByAutomationConfig
  }
}
