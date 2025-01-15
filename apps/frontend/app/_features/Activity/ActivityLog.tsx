import { Activity, ActivityType } from '@prisma/client'
import { ActivityLogData } from '@shared/models'
import { useProjectStatusStore } from '@/store/status'
import { useMemberStore } from '@/store/member'
import MemberAvatar from '@/components/MemberAvatar'
import Time from '@/components/Time'
import { dateFormat } from '@shared/libs'
import MemberName from '@/components/MemberName'

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

  const { statuses } = useProjectStatusStore()
  const { members } = useMemberStore()

  let changeFrom = ''
  let changeTo = ''

  if (data) {
    // cast Prisma.Json to ActivityLogData
    const cloneData = structuredClone(data as unknown) as ActivityLogData
    changeFrom = cloneData.changeFrom
    changeTo = cloneData.changeTo
  }

  let content
  switch (type) {
    case ActivityType.TASK_CREATED:
      content = 'created this task 📢'
      break

    case ActivityType.TASK_DUEDATE_CHANGED:
      try {
        console.log(data, changeFrom, changeTo)
        const d1 = changeFrom
          ? `📆 ${dateFormat(new Date(changeFrom), 'P')}`
          : ''
        const d2 = dateFormat(new Date(changeTo), 'P')
        content = `set due date ${d1} to 📆 ${d2}`
      } catch (error) {
        console.log(error)
      }
      break
    case ActivityType.TASK_ASSIGNEE_ADDED: {
      try {
        const addedAssignees = members
          .filter(({ id }) => (data as string[])?.includes(id))
          .map(({ name }) => name)
          .join(', ')
        content = `added assignees 👦 ${addedAssignees}`
      } catch (error) {
        console.log({ activityAssigneeError: error })
      }
      break
    }

    case ActivityType.TASK_ASSIGNEE_REMOVED:
      content = `removed assignees 👦`
      break
    // case ActivityType.TASK_STATUS_CREATED:
    //   content = `created status ${data}`
    //   break
    case ActivityType.TASK_STATUS_CHANGED:
      {
        const oldStatus = statuses.find(({ id }) => id === changeFrom)?.name
        const newStatus = statuses.find(({ id }) => id === changeTo)?.name

        content = `changed status ${
          oldStatus ? '🚦 ' + oldStatus : ''
        } to 🚦 ${newStatus}`
      }
      break
    case ActivityType.TASK_PROGRESS_CHANGED:
      content = `updated progress ${
        changeFrom ? '⏳️ ' + changeFrom : ''
      } to ⏳️ ${changeTo}`
      break
    case ActivityType.TASK_PRIORITY_CHANGED:
      content = `changed priority 🚩 ${
        changeFrom ? changeFrom : ''
      } to ${changeTo}`
      break
    case ActivityType.TASK_POINT_CHANGED:
      content = `changed point ${
        changeFrom ? '⭐️ ' + changeFrom : ''
      } to ⭐️ ${changeTo}`
      break
    case ActivityType.TASK_VISION_CHANGED:
      content = `changed vision ${changeFrom ? changeFrom : ''} to ${changeTo}`
      break
  }

  return (
    <div className="activity-item">
      <MemberAvatar uid={createdBy} noName={true} />
      <div className="text-xs text-gray-400 flex items-center justify-between">
        <span>
          <MemberName uid={createdBy} />
          {content}
        </span>
        <Time date={new Date(createdAt)} />
      </div>
    </div>
  )
}
