import { Comment } from '@prisma/client'
import TaskComment from './TaskComment'
import { useCommentContext } from './context'

interface ITaskCommentListItemProps extends Comment {}

export default function TaskCommentListItem({
  taskId,
  createdBy,
  content
}: ITaskCommentListItemProps) {
  // const { addComment } = useCommentContext()
  const handleValueSubmit = (s: string) => {
    console.log({ s })
  }
  return (
    <div>
      <TaskComment
        userId={createdBy}
        initValue={content}
        readOnly
        onValueSubmit={handleValueSubmit}
      />
    </div>
  )
}
