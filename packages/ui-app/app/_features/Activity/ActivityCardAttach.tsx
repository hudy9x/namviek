import { Activity, ActivityType } from '@prisma/client'
import { ActivityAttachData } from '@shared/models'
import ActivityCardAttachContent from './ActivityCardAttachContent'
import ActivityMemberAvatar from './ActivityMemberAvatar'
import ActivityCard from './ActivityCard'
import { ActivityMemberRepresent } from './ActivityMemberRepresent'
import { ActivityTimeLog } from './ActivityTimeLog'

interface IActivityCardAttachProps {
  activity: Activity
}

export default function ActivityCardAttach({
  activity
}: IActivityCardAttachProps) {
  const { uid, data, createdAt, type } = activity as Activity & {
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

  return (
    <ActivityCard
      creator={<ActivityMemberAvatar uid={uid} />}
      title={
        <div>
          <ActivityMemberRepresent uid={uid} />
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
            {createdAt && <ActivityTimeLog time={new Date(createdAt)} />}
          </span>
        </div>
      }
      content={<ActivityCardAttachContent url={url} />}
    />
  )
}
