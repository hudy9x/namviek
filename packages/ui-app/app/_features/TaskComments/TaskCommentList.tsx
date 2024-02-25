import { useEffect } from 'react'
import TaskCommentListItem from './TaskCommentListItem'
import { useCommentContext } from './context'

export default function TaskCommentList() {
  const { loadComments, comments } = useCommentContext()

  useEffect(() => {
    loadComments()
  }, [loadComments])

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
