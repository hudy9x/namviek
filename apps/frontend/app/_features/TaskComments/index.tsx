import { CommentContextProvider } from './context'
import TaskCommentContainer from './TaskCommentContainer'

export default function TaskComments({ taskId }: { taskId: string }) {
  return (
    <CommentContextProvider taskId={taskId}>
      <TaskCommentContainer />
    </CommentContextProvider>
  )
}
