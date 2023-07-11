import MemberPicker from '../../../../_components/MemberPicker';

export default function TaskAssignee({ taskId, uids }: { taskId: string; uids: string[] }) {
  console.log(taskId, uids);
  return <MemberPicker className='task-assignee' />;
}
