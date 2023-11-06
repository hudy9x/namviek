import { TextEditor } from 'packages/shared-ui/src/components/Controls'
import ActivityMemberAvatar from './ActivityMemberAvatar'
import ActivityCard from './ActivityCard'
import { Button } from '@shared/ui'
interface IActivityCommentEditorProps {
  uid: string
}
export default function ActivityCommentEditor({
  uid
}: IActivityCommentEditorProps) {
  return (
    <ActivityCard
      creator={<ActivityMemberAvatar uid={uid} />}
      title={
        <div>
          <TextEditor />
          <Button
            title="Save"
            type="button"
            onClick={() => console.log({ saveClicked: true })}
          />
        </div>
      }
    />
  )
}
