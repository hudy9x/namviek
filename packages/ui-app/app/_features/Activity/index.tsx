import { useTaskStore } from '@/store/task'
import ActivityCommentEditor from './ActivityCommentEditor'
import ActivityList from './ActivityList'
import './style.css'

export default function ActivityContainer({ taskId }: { taskId: string }) {
  return (
    <>
      <ActivityCommentEditor taskId={taskId} />
      <ActivityList taskId={taskId} />
    </>
  )
}
