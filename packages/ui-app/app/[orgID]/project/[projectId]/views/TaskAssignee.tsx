import MemberPicker from '../../../../_components/MemberPicker'

export default function TaskAssignee({
  taskId,
  uids
}: {
  taskId: string
  uids: string[]
}) {
  return <MemberPicker className="task-assignee" value={uids[0]} />
}
