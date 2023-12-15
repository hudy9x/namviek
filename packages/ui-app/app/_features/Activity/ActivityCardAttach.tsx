import { Activity, ActivityType } from '@prisma/client'
import { ActivityAttachData } from '@shared/models'
import ActivityCardAttachContent from './ActivityCardAttachContent'
import ActivityMemberAvatar from './ActivityMemberAvatar'
import ActivityCard from './ActivityCard'
import { ActivityMemberRepresent } from './ActivityMemberRepresent'
import { ActivityTimeLog } from './ActivityTimeLog'
import MemberAvatar from '@/components/MemberAvatar'
import Time from '@/components/Time'

interface IActivityCardAttachProps {
  activity: Activity
}

export default function ActivityCardAttach({
  activity
}: IActivityCardAttachProps) {
  const {
    createdBy,
    data,
    createdAt,
    type,
    id: activityId
  } = activity as Activity & {
    data: ActivityAttachData
  }
  const { attachedFile } = data
  const { url, name } = attachedFile || {}

  const label = (() => {
    switch (type) {
      case ActivityType.TASK_ATTACHMENT_ADDED:
        return
    }
  })()

  const { title } = data

  console.log('attach card', data)
  return (
    <div className="activity-item">
      <div className="flex items-start gap-2">
        <MemberAvatar uid={createdBy} />
        <div className="mt-0.5">
          <p className="text-sm text-gray-600">
            attached files -
            <Time date={new Date(createdAt)} />
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <ActivityCard
      activityId={activityId}
      creator={<ActivityMemberAvatar createdBy={createdBy} />}
      title={
        <div>
          <ActivityMemberRepresent createdBy={createdBy} />
          <span>
            attached{' '}
            <a
              className="text-blue-500 hover:underline"
              key={url}
              target="_blank"
              href={url || '#'}>
              {name}
            </a>{' '}
            at {/* TODO: focus on clicked! */}
            {createdAt && (
              <ActivityTimeLog
                time={new Date(createdAt)}
                activityId={activityId}
              />
            )}
          </span>
        </div>
      }
      content={<ActivityCardAttachContent url={url} />}
    />
  )
}
