import dynamic from 'next/dynamic'
import { THEN, useAutomateContext } from './context'
import StatusSelect from '@/components/StatusSelect'
import MemberPicker from '@/components/MemberPicker'
import PrioritySelect from '@/components/PrioritySelect'
// import TaskForm from '../../[orgID]/project/[projectId]/TaskForm'

const DynamicTaskForm = dynamic(
  () => import('../../[orgID]/project/[projectId]/TaskForm'),
  {
    loading: () => <p>Loading ...</p>
  }
)

export default function AutomateThenValues() {
  const { then, setThenField } = useAutomateContext()
  const isChangeStatus = then.change === THEN.CHANGE_STATUS
  const isChangeAssignee = then.change === THEN.CHANGE_ASSIGNEE
  const isChangePriority = then.change === THEN.CHANGE_PRIORITY
  const isCreateSubtask = then.change === THEN.CREATE_SUB_TASK

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

      {/* {isCreateSubtask ? ( */}
      {/*   <DynamicTaskForm */}
      {/*     onSubmit={ev => { */}
      {/*       console.log(ev) */}
      {/*     }} */}
      {/*   /> */}
      {/* ) : null} */}
    </div>
  )
}
