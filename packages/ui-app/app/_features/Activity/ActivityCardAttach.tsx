import { Activity, ActivityType } from '@prisma/client'
import { ActivityAttachData } from '@shared/models'
import ActivityCardAttachContent from './ActivityCardAttachContent'
import ActivityMemberAvatar from './ActivityMemberAvatar'
import ActivityCard from './ActivityCard'
import { ActivityMemberRepresent } from './ActivityMemberRepresent'
import { ActivityTimeLog } from './ActivityTimeLog'
import MemberAvatar from '@/components/MemberAvatar'
import Time from '@/components/Time'
import { MdOutlineAttachFile } from 'react-icons/md'

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

  const files = data as { name: string, url: string, type: string }[]
  // const { attachedFile } = data
  // const { url, name } = attachedFile || {}
  //
  // const label = (() => {
  //   switch (type) {
  //     case ActivityType.TASK_ATTACHMENT_ADDED:
  //       return
  //   }
  // })()
  //
  // const { title } = data
  if (!files || !files.length) return null

  const len = files.length

  console.log('attach card', data)
  return (
    <div className="activity-item none">
      <div className="flex items-start gap-2">
        <MemberAvatar uid={createdBy} />
        <div className="mt-0.5">
          <p className="text-sm text-gray-400">
            attached {len} file{len > 1 ? 's' : ''} -
            <Time date={new Date(createdAt)} />
          </p>
        </div>
      </div>
      <p className="activity-info space-y-1">
        {files.map((file, fid) => {
          return (
            <div key={fid} className='flex items-center gap-2'>
              <MdOutlineAttachFile className='p-1 w-6 h-6 rounded-md bg-gray-100' />
              <span className='italic'>{file.name}</span>
            </div>
          )
        })}
      </p>
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
