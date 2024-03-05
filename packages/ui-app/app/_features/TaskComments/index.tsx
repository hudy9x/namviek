import { CommentContextProvider } from './context'
import TaskCommentContainer from './TaskCommentContainer'

export default function TaskComments() {
  return (
    <CommentContextProvider>
      <TaskCommentContainer />
    </CommentContextProvider>
  )
}
