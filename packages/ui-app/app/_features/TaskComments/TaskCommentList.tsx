import { useEffect } from 'react'
import TaskCommentListItem from './TaskCommentListItem'
import { useCommentContext } from './context'

interface TaskCommentListProps {
  taskId: string
}

export default function TaskCommentList({ taskId }: TaskCommentListProps) {
  const { loadComments, comments, setTaskId } = useCommentContext()

  useEffect(() => {
    setTaskId(taskId)
    loadComments()
  }, [loadComments, taskId, setTaskId])

  return (
    <div className="flex flex-col">
      {comments?.length
        ? comments.map((comment, index) => (
            <TaskCommentListItem
              key={comment.id + index.toString()}
              {...comment}
            />
          ))
        : null}
    </div>
  )
}
