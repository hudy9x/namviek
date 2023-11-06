import { AttachementActiviity } from '@shared/models'

interface ActivityCardCommentContentProps {
  data: AttachementActiviity
}
//
// TODO: tiptap render content
const ActivityCardAttachContent = ({
  data
}: ActivityCardCommentContentProps) => {
  return <div>{JSON.stringify(data)}</div>
}

export default ActivityCardAttachContent
