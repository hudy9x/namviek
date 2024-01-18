import { Activity, ActivityType } from '@prisma/client'
import { ActivityLogData } from '@shared/models'
import MemberAvatar from '@/components/MemberAvatar'
import Time from '@/components/Time'
import { diffText } from '@shared/libs'
import MemberName from '@/components/MemberName'

interface IActivityLog {
  activity: Activity
}

export default function ActivityLogDesc({ activity }: IActivityLog) {
  const {
    createdBy,
    data,
    createdAt,
    type
    // id: activityId
  } = activity as Activity

  let changeFrom = ''
  let changeTo = ''

  if (data) {
    // cast Prisma.Json to ActivityLogData
    const cloneData = structuredClone(data as unknown) as ActivityLogData
    changeFrom = cloneData.changeFrom
    changeTo = cloneData.changeTo
  }

  const diffDesc = () => {
    const oldText = html2Text(changeFrom || '')
    const newText = html2Text(changeTo || '')

    return diffText(oldText, newText)
  }

  const html2Text = (txt: string): string => {
    const div = document.createElement('div')
    div.innerHTML = txt

    return div.textContent || ''
  }

  const content = changeFrom ? diffDesc() : ''
  let title = ''

  switch (type) {
    case ActivityType.TASK_TITLE_CHANGED:
      title = 'changed title 📋'
      break

    default:
      title = !changeFrom
        ? 'wrote new description 📝'
        : 'changed description 📝'
      break
  }

  return (
    <div className="activity-item none">
      <div className="flex items-start gap-2">
        <MemberAvatar uid={createdBy} noName={true} />
        <div className="mt-0.5">
          <div className="text-xs text-gray-400 w-full">
            <MemberName uid={createdBy} />
            {title} -
            <Time date={new Date(createdAt)} />
          </div>
        </div>
      </div>
      <p
        className="activity-comment diff"
        dangerouslySetInnerHTML={{ __html: content || '' }}></p>
    </div>
  )
}
