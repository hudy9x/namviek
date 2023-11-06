import { useTaskStore } from '@/store/task'
import ActivityCommentEditor from './ActivityCommentEditor'
import ActivityList from './ActivityList'
import './style.css'

export default function ActivityContainer({ taskId }: { taskId: string }) {
  const { tasks } = useTaskStore()
  const task = tasks.find(t => t.id === taskId)

  const { createdBy } = task || {}

  return (
    <>
      {createdBy && <ActivityCommentEditor uid={createdBy} />}
      <ActivityList taskId={taskId} />
    </>
  )
}
