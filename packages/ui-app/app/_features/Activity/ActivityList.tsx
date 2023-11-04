import { Activity, ActivityType } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'
import { activityGetAllByTask } from '@/services/activity'
import { messageError, messageWarning } from '@shared/ui'
import ActivityCardAttach from './ActivityCardAttach'
import ActivityCardComment from './ActivityCardComment'

interface IActivityList {
  taskId: string
}

const ATTACHMENT_CATEGORY = [
  ActivityType.TASK_ATTACHMENT_ADDED,
  ActivityType.TASK_ATTACHMENT_CHANGED,
  ActivityType.TASK_ATTACHMENT_REMOVED
]
const COMMENT_CATEGORY = [
  ActivityType.TASK_COMMENT_CREATED,
  ActivityType.TASK_COMMENT_CHANGED,
  ActivityType.TASK_COMMENT_REMOVED
]

const fakeData: Activity[] = [{}]
const ActivityList = ({ taskId }: IActivityList) => {
  const [activities, setActivities] = useState<Activity[]>([])

  const loadActivities = useCallback(() => {
    activityGetAllByTask(taskId).then(res => {
      const { status, error, data } = res.data
      if (status !== 200) {
        messageError(error)
        return false
      }
      setActivities(data)
      return true
    })
  }, [taskId])

  useEffect(() => {
    loadActivities()
  }, [loadActivities])
  return (
    <div>
      {activities.map(activity => {
        const { type } = activity
        return (
          <>
            {ATTACHMENT_CATEGORY.includes(type) ? (
              <ActivityCardAttach activity={activity} />
            ) : null}
            {COMMENT_CATEGORY.includes(type) ? (
              <ActivityCardComment activity={activity} />
            ) : null}
          </>
        )
      })}
    </div>
  )
}
export default ActivityList
