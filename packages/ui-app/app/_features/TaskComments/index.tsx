import { useTaskStore } from '@/store/task'
import './style.css'
import TaskComment from './TaskComment'
import TaskCommentList from './TaskCommentList'
import { useSearchParams } from 'next/navigation'
import { CommentContextProvider } from './context'
import { useUser } from '@goalie/nextjs'
import TaskCommentInput from './TaskCommentInput'

export default function TaskComments() {
  const sp = useSearchParams()
  const taskId = sp.get('taskId')

  return (
    <CommentContextProvider>
      <div className="task-comments">
        <TaskCommentInput />
        {taskId && <TaskCommentList taskId={taskId} />}
      </div>
    </CommentContextProvider>
  )
}
