import {
  useEventDeleteTaskComment,
  useEventSendTaskComment,
  useEventUpdateTaskComment
} from '@/events/useEventTaskComment'
import { useCommentContext } from './context'

import TaskCommentList from './TaskCommentList'
import TaskCommentInput from './TaskCommentInput'

import './style.css'

export default function TaskCommentContainer() {
  const { setComments } = useCommentContext()

  useEventSendTaskComment(comment => {
    const newComment = comment
    setComments(prev =>
      (prev?.length ? [newComment, ...prev] : [newComment]).filter(({ id }) =>
        Boolean(id)
      )
    )
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
    <div className="task-comments">
      <TaskCommentInput />
      <TaskCommentList />
    </div>
  )
}
