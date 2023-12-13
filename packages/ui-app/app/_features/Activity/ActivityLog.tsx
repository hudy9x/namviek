import { Activity, ActivityObjectType, ActivityType } from '@prisma/client'
import ActivityCard from './ActivityCard'
import { ActivityLogData } from '@shared/models'
import ActivityMemberAvatar from './ActivityMemberAvatar'
import { ActivityMemberRepresent } from './ActivityMemberRepresent'
import { ActivityTimeLog } from './ActivityTimeLog'
import { useProjectStatusStore } from '@/store/status'
import { useMemberStore } from '@/store/member'

interface IActivityLog {
  activity: Activity
}

export default function ActivityLog({ activity }: IActivityLog) {
  const {
    createdBy,
    data,
    createdAt,
    type,
    id: activityId
  } = activity as Activity

  let changeFrom, changeTo
  if (data) {
    const logData = JSON.parse((data as ActivityLogData)?.toString())
    if (logData) {
      changeFrom = logData.changeFrom
      changeTo = logData.changeTo
    }
  }

  const { statuses } = useProjectStatusStore()
  const { members } = useMemberStore()

  let content
  switch (type) {
    case ActivityType.TASK_CREATED:
      break
    case ActivityType.TASK_TITLE_CHANGED:
      content = `change title ${changeFrom ? changeFrom : ''} to ${changeTo}`
      break
    case ActivityType.TASK_DESC_CHANGED:
      content = `change description ${
        changeFrom ? changeFrom : ''
      } to ${changeTo}`
      break
    case ActivityType.TASK_DUEDATE_CHANGED:
      content = `change duedate ${changeFrom ? changeFrom : ''} to ${changeTo}`
      try {
        const changeFromDate = changeFrom ? new Date(changeFrom) : null
        const changeToDate = changeTo ? new Date(changeTo) : null
        content = `change duedate ${
          changeFromDate
            ? changeToDate?.toLocaleString('en-US', {
                dateStyle: 'short',
                timeStyle: 'short'
              })
            : ''
        } to ${changeToDate?.toLocaleString('en-US', {
          dateStyle: 'short',
          timeStyle: 'short'
        })}`
      } catch (error) {
        console.log({ ActivityLog: error })
      }
      break
    case ActivityType.TASK_ASSIGNEE_ADDED: {
      try {
        const addedAssignees = members
          .filter(({ id }) => (data as string[])?.includes(id))
          .map(({ name }) => name)
          .join(', ')
        content = `added assignees ${addedAssignees}`
      } catch (error) {
        console.log({ activityAssigneeError: error })
      }
      break
    }
    case ActivityType.TASK_ASSIGNEE_REMOVED:
      content = `removed assignees `
      break
    // case ActivityType.TASK_STATUS_CREATED:
    //   content = `created status ${data}`
    //   break
    case ActivityType.TASK_STATUS_CHANGED:
      {
        const oldStatus = statuses.find(({ id }) => id === changeFrom)?.name
        const newStatus = statuses.find(({ id }) => id === changeTo)?.name

        content = `changed status ${oldStatus ? oldStatus : ''} to ${newStatus}`
      }
      break
    case ActivityType.TASK_PROGRESS_CHANGED:
      content = `changed progress ${
        changeFrom ? changeFrom : ''
      } to ${changeTo}`
      break
    case ActivityType.TASK_PRIORITY_CHANGED:
      content = `changed priority ${
        changeFrom ? changeFrom : ''
      } to ${changeTo}`
      break
    case ActivityType.TASK_POINT_CHANGED:
      content = `changed point ${changeFrom ? changeFrom : ''} to ${changeTo}`
      break
    case ActivityType.TASK_VISION_CHANGED:
      content = `changed vision ${changeFrom ? changeFrom : ''} to ${changeTo}`
      break
  }

  return (
    <ActivityCard
      activityId={activityId}
      creator={<ActivityMemberAvatar createdBy={createdBy} />}
      title={
        <div>
          <ActivityMemberRepresent createdBy={createdBy} />
          <span>{content} </span>
          <div>
            {createdAt && (
              <ActivityTimeLog
                time={new Date(createdAt)}
                activityId={activityId}
              />
            )}
          </div>
        </div>
      }
    />
  )
}
