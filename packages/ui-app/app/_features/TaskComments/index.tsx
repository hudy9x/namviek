import './style.css'
import TaskCommentList from './TaskCommentList'
import { useSearchParams } from 'next/navigation'
import { CommentContextProvider, useCommentContext } from './context'
import TaskCommentInput from './TaskCommentInput'
import {
  useEventDeleteTaskComment,
  useEventSendTaskComment,
  useEventUpdateTaskComment
} from '@/events/useEventTaskComment'

export default function TaskComments() {
  const sp = useSearchParams()
  const taskId = sp.get('taskId')

  const { setComments } = useCommentContext()

  useEventSendTaskComment(comment => {
    const newComment = comment
    setComments(prev => (prev?.length ? [newComment, ...prev] : [newComment]))
  })

  useEventUpdateTaskComment(comment => {
    setComments(prev => {
      const idx = prev.findIndex(({ id }) => id === comment.id)
      prev[idx] = comment
      return [...prev]
    })
  })

  useEventDeleteTaskComment(({ id: idx }) => {
    setComments(prev => prev.filter(({ id }) => id !== idx))
  })

  return (
    <CommentContextProvider>
      <div className="task-comments">
        <TaskCommentInput />
        {taskId && <TaskCommentList taskId={taskId} />}
      </div>
    </CommentContextProvider>
  )
}
