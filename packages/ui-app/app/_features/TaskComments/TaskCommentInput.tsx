import { useUser } from '@goalie/nextjs'
import TaskComment from './TaskComment'
import { useCommentContext } from './context'

export default function TaskCommentInput() {
  const { user } = useUser()
  const { addComment } = useCommentContext()
  const userId = user?.id as string

  const handleCommentSubmit = (content: string) => {
    addComment(content)
  }

  return userId ? (
    <TaskComment
      userId={userId}
      initValue=""
      readOnly={false}
      onValueSubmit={handleCommentSubmit}
      eraseAfterSubmit
    />
  ) : null
}
