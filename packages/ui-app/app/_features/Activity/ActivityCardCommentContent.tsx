import { CommentActivity } from '@shared/models'

interface ActivityCardCommentContentProps {
  data: CommentActivity
}
//
// TODO: tiptap render content
const ActivityCardCommentContent = ({
  data
}: ActivityCardCommentContentProps) => {
  return <div>{JSON.stringify(data)}</div>
}

export default ActivityCardCommentContent
