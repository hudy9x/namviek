import { ActivityCommentData } from '@shared/models'

interface ActivityCardCommentContentProps {
  data: ActivityCommentData
}
//
// TODO: tiptap render content
const ActivityCardCommentContent = ({
  data
}: ActivityCardCommentContentProps) => {
  return <div>{JSON.stringify(data)}</div>
}

export default ActivityCardCommentContent
