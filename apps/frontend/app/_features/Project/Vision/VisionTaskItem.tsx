import TaskStatus from 'apps/frontend/app/[orgName]/project/[projectId]/views/TaskStatus'
import RemoveTaskFromGoal from './RemoveTaskFromGoal'

export default function VisionTaskItem2({
  id,
  title,
  visionId,
  statusId,
}: {
  id: string
  visionId?: string
  statusId: string
  title: string
}) {
  return (
    <div className="py-2.5 group">
      <div
        className="line-clamp-2 w-full px-3"
        title={title}>
        {title}
      </div>
      <div className='px-3 pt-1 flex items-center justify-between'>
        <TaskStatus withName={true} taskId={id} value={statusId} />
        {visionId ?
          <RemoveTaskFromGoal className=" opacity-0 group-hover:opacity-100 transition-all" taskId={id} />
          : null}
      </div>
    </div>
  )
}
