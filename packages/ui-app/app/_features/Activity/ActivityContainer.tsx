import { useTaskStore } from '@/store/task'
import ActivityCommentEditor from './ActivityCommentEditor'
import ActivityList from './ActivityList'
import { useActivityContext } from './context'

export default function ActivityContainer({ taskId }: { taskId: string }) {
  const { setTaskId } = useActivityContext()
  setTaskId(taskId)
  return (
    <>
      <ActivityCommentEditor />
      <ActivityList />
    </>
  )
}
