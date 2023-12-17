import { Activity } from '@prisma/client'
import { ActivityCommentData } from '@shared/models'
import MemberAvatar from '@/components/MemberAvatar'
import Time from '@/components/Time'
import MemberName from '@/components/MemberName'

interface IActivityCardCommentProps {
  activity: Activity
}

export default function ActivityCardComment({
  activity
}: IActivityCardCommentProps) {
  const {
    createdBy,
    data,
    createdAt,
  } = activity as Activity & {
    data: ActivityCommentData
  }
  const { content } = data
  // const sourceContent = content || ''
  // const [isEditing, setIsEditing] = useState(false)
  // const { updateActivity, deleteActivity } = useActivityContext()
  // const { editingActivityId, setEditingActivityId } = useActivityContext()

  // const isEditing = editingActivityId === activity.id
  // const handleEditContent = () => {
  //   setEditingActivityId(activity.id)
  // }

  // const handleDiscardContentChange = () => {
  //   setEditingActivityId('')
  // }

  // const handleUpdateContent = (newContent: string) => {
  //   const newActivity: typeof activity = {
  //     ...activity,
  //     data: {
  //       ...data,
  //       content: newContent
  //     }
  //   }
  //   // console.log({ newActivity })
  //   updateActivity(newActivity)
  // }

  // const handleDeleteComment = () => {
  //   const { id } = activity
  //   deleteActivity(id)
  // }

  return (
    <div className="activity-item none">
      <div className="flex items-start gap-2">
        <MemberAvatar uid={createdBy} noName={true} />
        <div className="mt-0.5">
          <p className="text-sm text-gray-400">
            <MemberName uid={createdBy} />
            wrote a comment 👄 -
            <Time date={new Date(createdAt)} />
          </p>
        </div>
      </div>
      <p
        className="activity-comment"
        dangerouslySetInnerHTML={{ __html: content || '' }}></p>
    </div>
  )

}
