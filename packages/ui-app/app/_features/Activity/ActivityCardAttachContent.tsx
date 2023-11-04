import { CommentActivity } from '@shared/models'

interface ActivityCardCommentContentProps {
  data: CommentActivity
}
//
// TODO: tiptap render content
const ActivityCardAttachComment = ({
  data
}: ActivityCardCommentContentProps) => {
  return <div>{JSON.stringify(data)}</div>
}

export default ActivityCardAttachComment
