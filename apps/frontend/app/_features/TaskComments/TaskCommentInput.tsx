import { useUser } from '@goalie/nextjs'
import TaskComment from './TaskComment'
import { useCommentContext } from './context'
import { useCallback } from 'react'

export default function TaskCommentInput() {
  const { user } = useUser()
  const { addComment } = useCommentContext()
  const userId = user?.id as string

  const handleCommentSubmit = useCallback(
    (content: string) => {
      addComment(content)
    },
    [addComment]
  )

  return (
    <TaskComment
      userId={userId}
      initValue=""
      readOnly={false}
      onValueSubmit={handleCommentSubmit}
      eraseAfterSubmit
    />
  )
}
