import { useServiceAutomation } from '@/hooks/useServiceAutomation'
import {
  IAutomateThenProps,
  IAutomateWhenProps,
  IAutomationItem
} from '@/store/automation'
import { confirmWarning } from '@shared/ui'
import { HiOutlineTrash } from 'react-icons/hi2'
import { THEN, WHEN, dueDateOptions, thenOptions, whenOptions } from './context'
import { useProjectStatusStore } from '@/store/status'
import { TaskPriority } from '@prisma/client'
import { RiFlag2Fill } from 'react-icons/ri'
import { priorityColors } from '@/components/PrioritySelect'

const priorityOptions = [
  { id: TaskPriority.URGENT, title: 'Urgent' },
  { id: TaskPriority.HIGH, title: 'High' },
  { id: TaskPriority.NORMAL, title: 'Normal' },
  { id: TaskPriority.LOW, title: 'Low' }
]

export const AutomateWhenPart = ({ when }: { when: IAutomateWhenProps }) => {
  const whenOption = whenOptions.find(opt => opt.id === when.is)
  const isStatusChanged = when.is === WHEN.STATUS_CHANGED
  const isPriorityChanged = when.is === WHEN.PRIORITY_CHANGED
  const isProgressChanged = when.is === WHEN.PROGRESS_CHANGED
  const { statuses } = useProjectStatusStore()

  const getStatusTitle = (sttId: string) => {
    const status = statuses.find(stt => stt.id === sttId)
    return (
      <span
        className="text-xs automation-value"
        style={{ color: status?.color }}>
        {status?.name}
      </span>
    )
  }

  const getPriorityTitle = (priority: string) => {
    const option = priorityOptions.find(p => p.id === priority)
    const color = priorityColors.get(option?.id)
    return (
      <span className="text-xs automation-value inline-flex items-center gap-1">
        <RiFlag2Fill className="text-gray-200 inline-block" style={{ color }} />
        {option?.title}
      </span>
    )
  }

  return (
    <div className="space-x-1">
      <span>
        When{' '}
        <span className="lowercase automation-value">
          {whenOption?.title || ''}
        </span>
      </span>
      <span>
        {isStatusChanged && when.valueTo ? (
          <>to {getStatusTitle(when.valueTo || '')}</>
        ) : null}
        {isPriorityChanged && when.valueTo ? (
          <>to {getPriorityTitle(when.valueTo || '')}</>
        ) : null}
        {isProgressChanged ? <>to {when.valueTo || ''}</> : null}
      </span>
      <span>on {when.happens}</span>
    </div>
  )
}

export const AutomateThenPart = ({ then }: { then: IAutomateThenProps }) => {
  const option = thenOptions.find(opt => opt.id === then.change)
  const isChangeDuedate = then.change === THEN.CHANGE_DUEDATE
  const isChangeStatus = then.change === THEN.CHANGE_STATUS
  const isChangeProgress = then.change === THEN.CHANGE_PROGRESS
  const { statuses } = useProjectStatusStore()

  const getStatusTitle = (sttId: string) => {
    const status = statuses.find(stt => stt.id === sttId)
    return (
      <span
        className="text-xs automation-value"
        style={{ color: status?.color }}>
        {status?.name}
      </span>
    )
  }

  const getDuedateTitle = (id: string) => {
    const dd = dueDateOptions.find(dd => dd.id === id)
    return <span className="lowercase automation-value">📅 {dd?.title}</span>
  }

  return (
    <div className="space-x-1">
      <span>
        then{' '}
        <span className="lowercase automation-value">
          {option?.title || ''}
        </span>
      </span>
      <span>
        {isChangeStatus && then.value ? (
          <>to {getStatusTitle(then.value || '')}</>
        ) : null}
        {isChangeProgress ? then.value : null}
        {isChangeDuedate ? <>to {getDuedateTitle(then.value)}</> : null}
      </span>
    </div>
  )
}

export default function AutomateDesc({ id, when, then }: IAutomationItem) {
  const isUpdating = id.includes('AUTOMATE_RAND_ID') ? 'animate-pulse' : ''
  const { delAutomation } = useServiceAutomation()
  const onDelete = (id: string) => {
    confirmWarning({
      message:
        "This automation item will be delete permantly. But it won't affect to your data. Are you sure you want to do this action ?",
      yes: () => {
        delAutomation(id)
      }
    })
  }
  return (
    <div className={`box ${isUpdating} flex items-center justify-between`}>
      <div className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
        <AutomateWhenPart when={when} /> <AutomateThenPart then={then} />
      </div>
      <HiOutlineTrash
        className="automation-del"
        onClick={() => {
          if (isUpdating) return
          onDelete(id)
        }}
      />
    </div>
  )
}
