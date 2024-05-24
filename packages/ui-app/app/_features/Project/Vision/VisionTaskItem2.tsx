import TaskStatus from 'packages/ui-app/app/[orgID]/project/[projectId]/views/TaskStatus'

export default function VisionTaskItem2({
  id,
  title,
  statusId,
}: {
  id: string
  statusId: string
  title: string
}) {
  return (
    <div className="py-2.5">
      <div
        className="line-clamp-2 w-full px-3"
        title={title}>
        {title}
      </div>
      <div className='px-3 pt-1'>
        <TaskStatus withName={true} taskId={id} value={statusId} />
      </div>
    </div>
  )
}
