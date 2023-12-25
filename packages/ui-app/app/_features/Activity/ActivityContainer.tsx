import { HiOutlineFingerPrint, HiOutlineMap } from 'react-icons/hi2'
import ActivityCommentEditor from './ActivityCommentEditor'
import ActivityList from './ActivityList'
import { useActivityContext } from './context'
import { useEffect } from 'react'

export default function ActivityContainer({ taskId }: { taskId: string }) {
  const { setTaskId } = useActivityContext()
  useEffect(() => setTaskId(taskId), [taskId, setTaskId])
  return (
    <div>
      <ActivityList />
    </div>
  )
}
