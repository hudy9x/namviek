import { THEN, useAutomateContext } from './context'
import StatusSelect from '@/components/StatusSelect'
import MemberPicker from '@/components/MemberPicker'
import PrioritySelect from '@/components/PrioritySelect'

export default function AutomateThenValues() {
  const { then, setThenField } = useAutomateContext()
  const isChangeStatus = then.change === THEN.CHANGE_STATUS
  const isChangeAssignee = then.change === THEN.CHANGE_ASSIGNEE
  const isChangePriority = then.change === THEN.CHANGE_PRIORITY

  return (
    <div className="mt-2">
      {isChangeStatus ? (
        <StatusSelect
          title="To new status"
          onChange={val => {
            setThenField('value', val)
          }}
        />
      ) : null}

      {isChangeAssignee ? (
        <MemberPicker
          title="To another people"
          onChange={val => {
            setThenField('value', val)
          }}
        />
      ) : null}

      {isChangePriority ? (
        <PrioritySelect
          title="To another priority"
          onChange={val => {
            setThenField('value', val)
          }}
        />
      ) : null}
    </div>
  )
}
